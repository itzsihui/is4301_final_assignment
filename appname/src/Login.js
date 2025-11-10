import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Notification from "./components/Notification";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setNotification({ message: "Please enter both email and password.", type: "error" });
      setTimeout(() => setNotification(null), 5000);
      return;
    }
    const result = await logInWithEmailAndPassword(email, password);
    if (!result.success) {
      setNotification({ message: result.error, type: "error" });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      setNotification({ message: result.error, type: "error" });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="login">
      <Notification 
        message={notification?.message} 
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={handleEmailLogin}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={handleGoogleSignIn}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;

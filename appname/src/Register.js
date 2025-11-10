import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import Notification from "./components/Notification";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const register = async () => {
    if (!name) {
      setNotification({ message: "Please enter your name.", type: "error" });
      setTimeout(() => setNotification(null), 5000);
      return;
    }
    if (!email || !password) {
      setNotification({ message: "Please enter both email and password.", type: "error" });
      setTimeout(() => setNotification(null), 5000);
      return;
    }
    const result = await registerWithEmailAndPassword(name, email, password);
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

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="register">
      <Notification 
        message={notification?.message} 
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={handleGoogleSignIn}
        >
          Register with Google
        </button>

        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;

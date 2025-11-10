import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Notification from "./components/Notification";
import "./Login.css";

function Login() {
  const [user, loading, error] = useAuthState(auth);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

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
        <h2>Sign In</h2>
        <button className="login__btn login__google" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;

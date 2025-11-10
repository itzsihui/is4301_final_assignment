import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase';
import Notification from '../components/Notification';
import logo from '../secondlogo.png';
import './Home.css';

function Home() {
  const [user] = useAuthState(auth);
  const [notification, setNotification] = useState(null);

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      setNotification({ message: result.error, type: 'error' });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="home-page">
      <Notification 
        message={notification?.message} 
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className="home-content">
        <img src={logo} className="nus-logo" alt="NUS Logo" />
        <p className="home-text">
          NUS is a leading research university in Asia
        </p>
        {!user && (
          <button className="google-signin-btn" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
        )}
        {user && (
          <p className="welcome-text">Welcome, {user.displayName || user.email}!</p>
        )}
      </div>
    </div>
  );
}

export default Home;

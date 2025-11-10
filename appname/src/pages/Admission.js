import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase';
import Notification from '../components/Notification';
import './Admission.css';

function Admission() {
  const [user, loading] = useAuthState(auth);
  const [notification, setNotification] = useState(null);

  const steps = [
    'Understanding Admission requirements',
    'Submit application online',
    'Upload supporting documents',
    'Make application fee payment',
    'Check application status'
  ];

  useEffect(() => {
    if (!loading && !user) {
      setNotification({ 
        message: 'Please sign in to access the Admission page.', 
        type: 'error' 
      });
    }
  }, [user, loading]);

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      setNotification({ message: result.error, type: 'error' });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="admission-page">
        <div className="admission-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admission-page">
        <Notification 
          message={notification?.message} 
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
        <div className="admission-content">
          <h1>Admission Timeline</h1>
          <div className="login-prompt">
            <p>You need to be signed in to view this page.</p>
            <button className="google-signin-btn" onClick={handleGoogleSignIn}>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admission-page">
      <Notification 
        message={notification?.message} 
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className="admission-content">
        <h1>Admission Timeline</h1>
        <ol className="admission-list">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Admission;

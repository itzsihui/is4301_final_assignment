import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase';
import Notification from '../components/Notification';
import './Academics.css';

function Academics() {
  const [user, loading] = useAuthState(auth);
  const [notification, setNotification] = useState(null);

  const modules = [
    { code: 'BT1101', title: 'Introduction to Business Analytics' },
    { code: 'BT2101', title: 'Econometrics Modelling for Business Analytics' },
    { code: 'BT2102', title: 'Data Management and Visualisation' },
    { code: 'BT2103', title: 'Optimization Methods in Business Analytics' }
  ];

  useEffect(() => {
    if (!loading && !user) {
      setNotification({ 
        message: 'Please sign in to access the Academics page.', 
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
      <div className="academics-page">
        <div className="academics-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="academics-page">
        <Notification 
          message={notification?.message} 
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
        <div className="academics-content">
          <h1>Academics</h1>
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
    <div className="academics-page">
      <Notification 
        message={notification?.message} 
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className="academics-content">
        <h1>Academics</h1>
        <div className="table-container">
          <table className="modules-table">
            <thead>
              <tr>
                <th>Module Code</th>
                <th>Module Title</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, index) => (
                <tr key={index}>
                  <td>{module.code}</td>
                  <td>{module.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Academics;

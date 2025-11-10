import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, signInWithGoogle } from '../firebase';
import './Navigation.css';

function Navigation() {
  const [user] = useAuthState(auth);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/academics" className="nav-link">Academics</Link>
        <Link to="/admission" className="nav-link">Admission</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">{user.displayName || user.email}</span>
            <button className="nav-link nav-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="nav-link nav-button nav-google-btn" onClick={handleGoogleSignIn}>
            Log in with Google
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

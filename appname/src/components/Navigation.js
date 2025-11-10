import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';
import './Navigation.css';

function Navigation() {
  const [user] = useAuthState(auth);

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
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

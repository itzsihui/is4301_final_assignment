import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/academics" className="nav-link">Academics</Link>
      <Link to="/admission" className="nav-link">Admission</Link>
    </nav>
  );
}

export default Navigation;


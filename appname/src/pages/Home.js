import logo from '../secondlogo.png';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <img src={logo} className="nus-logo" alt="NUS Logo" />
        <p className="home-text">
          NUS is a leading research university in Asia
        </p>
      </div>
    </div>
  );
}

export default Home;


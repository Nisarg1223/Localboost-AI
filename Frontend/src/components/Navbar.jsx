import { useNavigate, Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ setTrigger }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigation = (path) => {
    // 🔥 start transition
    setTrigger(true);

    // ⏳ delay navigation to match animation
    setTimeout(() => {
      navigate(path);
    }, 600); // match your GSAP duration
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="dot">•</span>
        <span>INDIA</span>
        <span className="time">LOCALBOOST • ACTIVE</span>
        <span className="coords">GLOBAL NETWORK</span>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="nav-item" onClick={() => handleNavigation("/")}>
          <span className="text top">HOME</span>
          <span className="text bottom">HOME</span>
        </div>

        <div className="nav-item" onClick={() => handleNavigation("/dashboard")}>
          <span className="text top">DASHBOARD</span>
          <span className="text bottom">DASHBOARD</span>
        </div>

        <div className="nav-item" onClick={() => handleNavigation("/about")}>
          <span className="text top">ABOUT</span>
          <span className="text bottom">ABOUT</span>
        </div>

        <a href="#" className="nav-item">
          <span className="text top">WORKS</span>
          <span className="text bottom">WORKS</span>
        </a>

        {!user ? (
          <div className="dropdown">
            <div className="nav-item get-started-nav">
              <span className="text top">GET STARTED</span>
              <span className="text bottom">GET STARTED</span>
            </div>

            <div className="dropdown-menu">
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        ) : (
          <div className="dropdown">
            <div className="nav-item get-started-nav">
              <span className="text top">PROFILE</span>
              <span className="text bottom">PROFILE</span>
            </div>

            <div className="dropdown-menu">
              <Link to="/profile">My Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
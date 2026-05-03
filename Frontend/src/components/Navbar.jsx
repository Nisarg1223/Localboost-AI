import './Navbar.scss'

const Navbar = () => {
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
  <a href="#" className="nav-item">
    <span className="text top">HOME</span>
    <span className="text bottom">HOME</span>
  </a>

  <a href="#" className="nav-item">
    <span className="text top">DASHBOARD</span>
    <span className="text bottom">DASHBOARD</span>
  </a>



  <a href="#" className="nav-item">
    <span className="text top">ABOUT</span>
    <span className="text bottom">ABOUT</span>
  </a>
</div>
    </nav>
  );
};

export default Navbar;
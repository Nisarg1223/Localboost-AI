import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="dot">•</span>
        <span>NEW YORK, US</span>
        <span className="time">10:11 AM GMT-4</span>
        <span className="coords">36.7783° N, 119.4179°</span>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
  <a href="#" className="nav-item">
    <span className="text top">HOME</span>
    <span className="text bottom">HOME</span>
  </a>

  <a href="#" className="nav-item">
    <span className="text top">WORKS</span>
    <span className="text bottom">WORKS</span>
  </a>

  <a href="#" className="nav-item">
    <span className="text top">BREAK</span>
    <span className="text bottom">BREAK</span>
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
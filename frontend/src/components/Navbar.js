
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../media/logo.png';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/">Rec-inov</Link>
      </div>
      <div className="navbar-links">
        <Link to="/kkk">kkk</Link>
        <Link to="/nnn">nnn</Link>
        <Link to="/sss">sss</Link>
      </div>
      <div className="navbar-toggle-button" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>
    </div>
  );
};
export default Navbar;
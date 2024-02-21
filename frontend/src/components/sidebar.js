import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import "./Navbar.css";
import Logo1 from '../media/logo1.png';
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="sidebar-left">
        <div className="sidebar-header">
        <img src={Logo1} alt="Logo1" style={{ width: '50px', height: 'auto' }} />
          <Link to="/">Rec-inov</Link>
        </div>
        <div className="sidebar-links">
          <Link to="/Oo">Oo</Link>
          <Link to="/cc">Cc</Link>
          <Link to="/st">St</Link>
         
        </div>
      </div>
    );
  };
  
 
  export default Sidebar;
  
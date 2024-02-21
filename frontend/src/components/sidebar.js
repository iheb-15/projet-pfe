import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import "./Navbar.css";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="sidebar-left">
        <div className="sidebar-header">
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
  
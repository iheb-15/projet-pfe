import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import "./Navbar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";


const Sidebar = () => {
   
    const [isCollapsed, setIsCollapsed] = useState(false);//

   
    const handleCollapse = () => {
      setIsCollapsed(!isCollapsed);};//
  
    return (   
     <div className={`sidebar-left ${isCollapsed ? 'collapsed' : ''}`}>
       
        <div className="sidebar-links">
          <Link  to="/oo"><FaPerson />Gestion utilisateur</Link>
          
          <Link to="/cc">Cc</Link>
          <Link to="/st">St</Link>
          
      </div>
      <div className="collapse-btn" >
      <button className="btn" onClick={handleCollapse}  >
        {isCollapsed ? <FaChevronRight className="icon" /> : <FaChevronLeft className="icon" />}
      </button>
      </div>
     
        </div>
         
    );
  };
  
 
  export default Sidebar;
  
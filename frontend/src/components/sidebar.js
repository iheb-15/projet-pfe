import React, {  useState } from "react";
import { Link} from "react-router-dom";
import "./Navbar.css";
import { FaPerson } from "react-icons/fa6";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";




const Sidebar = () => {
   
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  
 
  return (
    
    <div className={`sidebar-left ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-links">
      
        <Link to="/gest_utilisateur" >
          <FaPerson /> Gestion utilisateur
        </Link>
        <Link to="/cc">Cc</Link>
        <Link to="/st">St</Link>
        
       
      </div>
      <div className="collapse-btn">
        <button className="btn" onClick={handleCollapse}>
          {isCollapsed ? <LeftOutlined className="icon" /> : <RightOutlined className="icon" />}
        </button>
      </div>
      
    </div>
  );
};

export default Sidebar;
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo1 from '../media/logo1.png';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
         <img src={Logo1} alt="Logo1" style={{ width: '50px', height: 'auto' }} />  
         <Link style={{ color:'white' }} to="/" >Rec-inov</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/kkk">kkk</Link>
        <Link to="/nnn">nnn</Link>
        <Link to="/sss">sss</Link>
      </div>
      
    </div>
  );
};
export default Navbar;
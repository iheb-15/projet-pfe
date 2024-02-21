
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './Authentification.css';
import Logo from './media/logo.png';
import EmailImage from './media/email.jpg';
import PasswordImage from './media/motpass.png';
import MotPasseOublie from './MotPasseOublie';
import 'react-toastify/dist/ReactToastify.css';

function Authentification() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleLogin = () => {
    setIsSuccess(true);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  
  const handleUnusedFunction = () => {
    
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={Logo} alt="logo" className="logo" />
            </div>
          </div>

          <h2>REC-INOV</h2>

          <div>
            <img src={EmailImage} alt="email" className="Email" />
            <input type="text" placeholder="Enter Email" className="email" />
          </div>
          <div className="second-input">
            <img src={PasswordImage} alt="motpass" className="motpass" />
            <input type="password" placeholder="Enter Password" className="pass" />
          </div>
          <div className="boutton">
            <button onClick={handleLogin}>Login</button>
          </div>
          <p className="link">
            <Link to="/motPasseOublie">Mot de Passe oublié ?</Link>
          </p>
        </div>
      </div>

      {showPopup && (
        <div className={`popup ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? 'Connexion réussie!' : 'La connexion a échoué. Veuillez réessayer.'}
        </div>
      )}

      <Routes>
        <Route path="/motPasseOublie" element={<MotPasseOublie />} />
      </Routes>
    </div>
  );
}

export default Authentification;

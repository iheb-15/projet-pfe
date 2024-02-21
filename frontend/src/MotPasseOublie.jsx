import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './media/logo.png';
import EmailImage from './media/email.jpg';

function MotPasseOublie() {
  const navigate = useNavigate();

  const handleEnvoyerClick = () => {
    toast.success('Envoyé avec succès', {
      position: 'top-center', 
    });
  };

  const handleRetourClick = () => {
    navigate('/login');
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
            <img src={EmailImage} alt="email" className="EmailM" />
            <input type="text" placeholder="Enter Email" className="emailm" />
          </div>
          <div className="boutton">
            <button onClick={handleEnvoyerClick}>Envoyer</button>
          </div>
          <div className="second-boutton">
            <button className='second-button' onClick={handleRetourClick}>Retour</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotPasseOublie;


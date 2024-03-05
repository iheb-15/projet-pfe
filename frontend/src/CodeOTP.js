import React from 'react';
import {  BrowserRouter as Router,useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './Authentification.css'; // Import local styles
import Logo from './media/logo.png'; // Import logo image


function CodeOTP(){
    const history = useHistory();

    const handleEnvoyerClick = () => {
      history.push('/nouveauMotPasse'); // Change the route to the path of NouveauxMotPasse component
    };
  

    return (
        // Configurer le routeur et le conteneur pour le composant principal
        <Router>
          <Container fluid className="main">
            <Row className="justify-content-center align-items-center vh-100">
              <Col md={3} className="sub-main">
                {/* Section de logo */}
                <div className="imgs">
                  <div className="container-image">
                    <img src={Logo} alt="logo" className="logo" />
                  </div>
                </div>
    
                {/* Formulaire d'authentification*/}
                <Form>
                  <h4 className="title">REC-INOV</h4>
                  <Form.Group>
                    {/*Saisie par e-mail */}
                    <div className="input-container">
                      <input
                        placeholder="Enter Code "
                        className="input-field"
                        type="text"
                        
                      />
                      <label htmlFor="input-field" className="input-label">
                        Enter Code 
                      </label>
                      <span className="input-highlight"></span>
                    </div>
                  </Form.Group>
    
                  {/* Bouton de connexion */}
                  <div>
                    <button variant="primary" className="login-btn"  onClick={handleEnvoyerClick}>
                      Envoyer
                    </button>
                  </div>
    
                 
                </Form>
              </Col>
            </Row>
    
            {/* Route pour  'MotPasseOublie' component */}
            
          </Container>
        </Router>
      );
    }

export default CodeOTP;
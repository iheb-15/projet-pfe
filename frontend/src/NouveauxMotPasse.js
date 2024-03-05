import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './Authentification.css'; // Import local styles
import Logo from './media/logo.png'; // Import logo image

function NouveauxMotPasse() {
  const history = useHistory();

  const handleConnecterClick = () => {
    history.push('/App'); // Change the route to '/gestion-utilisateur'
  };

  const handleRetourClick = () => {
    history.push('/login'); // Go back to the previous page
  };

  return (
    // Configure the router and container for the main component
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
                {/*  nouveau Password input */}
                <div className="input-container">
                  <input
                    placeholder="Enter Password"
                    className="input-field"
                    type="Nouveau Password"
                  />
                  <label htmlFor="input-field" className="input-label">
                    Enter Nouveau Password
                  </label>
                  <span className="input-highlight"></span>
                </div>
              </Form.Group>

              {/* Bouton de connexion */}
              <div>
                <button variant="primary" className="login-btn" onClick={handleConnecterClick}>
                  Connecter
                </button>
              </div>
              <div>
                <button variant="primary" className="login-btn" onClick={handleRetourClick}>
                  Retour
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default NouveauxMotPasse;

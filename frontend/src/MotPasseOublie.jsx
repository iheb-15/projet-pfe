// MotPasseOublie.js

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './media/logo.png';
import EmailImage from './media/email.jpg';
import './Authentification.css';

function MotPasseOublie() {
  const history = useHistory();

  const handleEnvoyerClick = () => {
    toast.success('Envoyé avec succès', {
      position: 'top-center',
    });
  };

  const handleRetourClick = () => {
    history.push('/login'); // Rediriger vers la page d'authentification
  };

  return (
    <Container fluid className="main">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={3} className="sub-main">
          <div className="imgs">
            <div className="container-image">
              <img src={Logo} alt="logo" className="logo img-fluid" />
            </div>
          </div>
          <h2>REC-INOV</h2>
          <Form>
            <Form.Group>
              <img src={EmailImage} alt="email" className="Email" />
              <Form.Control type="text" placeholder="Enter Email" className="emailM" />
            </Form.Group>
            <div className="boutton mt-3">
              <Button variant="primary" onClick={handleEnvoyerClick}>
                Envoyer
              </Button>
            </div>
            <div className="second-boutton">
              <Button variant="secondary" onClick={handleRetourClick}>
                Retour
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default MotPasseOublie;

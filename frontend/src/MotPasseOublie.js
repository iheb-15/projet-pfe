import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Logo from './media/logo.png';
import './Authentification.css';

function MotPasseOublie() {
  const history = useHistory();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEnvoyerClick = () => {
    setShowSuccessModal(true);

    // Automatically close the success modal after a delay (e.g., 2000 milliseconds or 2 seconds)
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 4000);
  };

  const handleRetourClick = () => {
    history.push('/login');
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
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

          <Form>
            <h4 className='title'>REC-INOV</h4>
            <Form.Group>
              <div className="input-container">
                <input placeholder="Enter Email" className="input-field" type="text" />
                <label htmlFor="input-field" className="input-label">Enter Email</label>
                <span className="input-highlight"></span>
              </div>
            </Form.Group>

            <div className='envoyer-btn'>
              <button variant="primary" className='login-btn' onClick={handleEnvoyerClick}>
                Envoyer
              </button>
            </div>
            <div >
              <button variant="secondary"  className="second-boutton" onClick={handleRetourClick}>
                Retour 
              </button>
            </div>
          </Form>

          <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Envoyé avec succès</Modal.Title>
            </Modal.Header>
       
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default MotPasseOublie;

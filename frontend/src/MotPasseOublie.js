import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Logo from './media/logo.png';
import axios from 'axios'; // Assurez-vous d'avoir installé Axios dans votre projet

function MotPasseOublie() {
  const history = useHistory();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');
 
  const handleEnvoyerClick = async (e) => {
    e.preventDefault();
    try {
      

      // Faites une demande par la POST pour envoyer le code et l'adresse e-mail
      const response = await axios.post('http://localhost:3001/api/forgot-password', {
        email,
      });

      // En supposant que le serveur envoie un message de réussite
      if (response.status === 200) {
        // Afficher le modèle de réussite et rediriger après un délai
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          history.push('/login'); // Redirection vers la page de connexion après la fermeture du modal
        }, 4000);
      } else {
        // Gérer le cas où le serveur envoie un message d'erreur
        console.error('Error sending code:', response.data.error);
      }
    } catch (error) {
      // Gérer le cas où la requête POST échoue
      console.error('Erreur', error);
    }
  };

  const handleRetourClick = () => {
    history.push('/login');
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    history.push('/login');
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
            <h4 className="title">REC-INOV</h4>
            <Form.Group>
              <div className="input-container">
                <input
                  placeholder="Enter Email"
                  className="input-field"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="input-field" className="input-label">
                  Enter Email
                </label>
                <span className="input-highlight"></span>
              </div>
            </Form.Group>

          
              

            <div className="envoyer-btn">
              <button variant="primary" className="login-btn" onClick={handleEnvoyerClick}>
                Envoyer
              </button>
            </div>

            <div>
              <button variant="secondary" className="second-boutton" onClick={handleRetourClick}>
                Retour
              </button>
            </div>
          </Form>

          <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Envoyé avec succès</Modal.Title>
            </Modal.Header>
            <Modal.Body>Le code a été envoyé avec succès à votre email.</Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default MotPasseOublie;

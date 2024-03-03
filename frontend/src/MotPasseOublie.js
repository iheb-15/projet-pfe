//   Import les modules et composants nécessaires
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Logo from './media/logo.png';
import axios from 'axios';

// MotPasseOublie Component
function MotPasseOublie() {
  //Configurer l'objet historique à partir du routeur React
  const history = useHistory();

  // Variables d'état pour gérer le modèle de réussite et l'e-mail de l'utilisateur
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');

  // Handle click on "Envoyer" button
  const handleEnvoyerClick = async () => {
    try {
      // Faites une demande par la POST pour envoyer un code à l'adresse e-mail fournie
      const response = await axios.post('/api/send-code', { email });

      // En supposant que le serveur envoie un message de réussite
      if (response.data.message === 'Code envoyé avec succès.') {
        // Afficher le modèle de réussite et rediriger après un délai
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          history.push('/login');
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

  // Handle click sur le bouton "Retour"
  const handleRetourClick = () => {
    // Rediriger vers la page de connexion
    history.push('/login');
  };

  // Gérer la fermeture du modal de réussite
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    // Configurer le conteneur pour le composant Mot Passe Oublie
    <Container fluid className="main">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={3} className="sub-main">
          {/* Logo section */}
          <div className="imgs">
            <div className="container-image">
              <img src={Logo} alt="logo" className="logo img-fluid" />
            </div>
          </div>

          {/* Form section */}
          <Form>
            <h4 className="title">REC-INOV</h4>
            <Form.Group>
              {/* Email input */}
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

            {/* "Envoyer" button */}
            <div className="envoyer-btn">
              <button variant="primary" className="login-btn" onClick={handleEnvoyerClick}>
                Envoyer
              </button>
            </div>

            {/* "Retour" button */}
            <div>
              <button variant="secondary" className="second-boutton" onClick={handleRetourClick}>
                Retour
              </button>
            </div>
          </Form>

          {/* Succès Modal */}
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

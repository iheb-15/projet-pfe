import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Switch } from 'react-router-dom';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import './Authentification.css'; // Import local styles
import Logo from './media/logo.png'; // Import logo image
import MotPasseOublie from './MotPasseOublie'; // Import le composant Mot Passe Oublie pour le routage

// Main Authentification Component
function Authentification() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleLogin = () => {
    // Your login logic here
    // For now, let's consider it successful if both email and password are non-empty
    if (email && password) {
      setShowSuccessModal(true);
    } else {
      setShowFailureModal(true);
    }
  };

  return (
    <Container fluid className="main">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={3} className="sub-main">
          <div className="imgs">
            <div className="container-image">
              <img src={Logo} alt="logo" className="logo" />
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

              <div className="input-container">
                <input
                  placeholder="Enter Password"
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="input-field" className="input-label">
                  Enter Password
                </label>
                <span className="input-highlight"></span>
              </div>
            </Form.Group>

            <div>
              <button variant="primary" className="login-btn" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="link mt-3">
              <Link to="/motPasseOublie">Mot de Passe oublié ?</Link>
            </p>
          </Form>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your login was successful!</Modal.Body>
      </Modal>

      {/* Failure Modal */}
      <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your login attempt failed. Please check your credentials.</Modal.Body>
      </Modal>

      <Switch>
        <Route path="/motPasseOublie" component={MotPasseOublie} />
      </Switch>
    </Container>
  );
}

export default Authentification;

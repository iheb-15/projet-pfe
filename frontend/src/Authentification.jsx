import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Toast } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './Authentification.css';
import Logo from './media/logo.png';
import EmailImage from './media/email.jpg';
import PasswordImage from './media/motpass.png';
import MotPasseOublie from './MotPasseOublie';

function Authentification() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const history = useHistory();

  const handleLogin = () => {
    setIsSuccess(true);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleMotPasseOublieClick = () => {
    history.push('/motPasseOublie');
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
          <h2 className="mt-4">REC-INOV</h2>
          <Form>
            <Form.Group>
              <img src={EmailImage} alt="email" className="Email" />
              <Form.Control type="text" placeholder="Enter Email" className="email mt-3" />
            </Form.Group>
            <Form.Group className="second-input">
              <img src={PasswordImage} alt="motpass" className="motpass" />
              <Form.Control type="password" placeholder="Enter Password" className="pass mt-3" />
            </Form.Group>
            <div className="boutton mt-3">
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Form>
          <p className="link mt-3">
            <Link to="/motPasseOublie" onClick={handleMotPasseOublieClick}>
              Mot de Passe oublié ?
            </Link>
          </p>
        </Col>
      </Row>

      {showPopup && (
        <div className={`popup ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? 'Connexion réussie!' : 'La connexion a échoué. Veuillez réessayer.'}
        </div>
      )}

      <Switch>
        <Route path="/motPasseOublie" component={MotPasseOublie} />
      </Switch>
    </Container>
  );
}
export default Authentification;
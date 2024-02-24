// Authentification.js

import React  from 'react';
import { Link, Route, BrowserRouter as  Switch, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Authentification.css';
import Logo from './media/logo.png';
import MotPasseOublie from './MotPasseOublie';

function Authentification() {
  const history = useHistory();

  const handleLogin = () => {
    toast.success('Connexion réussie!', {
      position: 'top-center',
      autoClose: 3000,
      onClose: () => {
        history.push('/');
      },
    });
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

          <Form>
            <h4 className="title">REC-INOV</h4>
            <Form.Group>
              <div className="input-container">
                <input placeholder="Enter Email" className="input-field" type="text" />
                <label htmlFor="input-field" className="input-label">
                  Enter Email
                </label>
                <span className="input-highlight"></span>
              </div>
              <div className="input-container">
                <input placeholder="Enter Password" className="input-field" type="password" />
                <label htmlFor="input-field" className="input-label">
                  Enter Password
                </label>
                <span className="input-highlight"></span>
              </div>
            </Form.Group>
            <div>
              <Button variant="primary" className="login-btn" onClick={handleLogin}>
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

      <Switch>
        <Route path="/motPasseOublie" component={MotPasseOublie} />
      </Switch>
    </Container>
  );
}

export default Authentification;

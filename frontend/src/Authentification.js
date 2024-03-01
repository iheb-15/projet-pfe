// Import les dépendances et composants nécessaires
import React, { useState } from 'react';
import axios from 'axios';  // Import Axios pour faire des requêtes HTTP
import { Link, Route, BrowserRouter as Switch, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';  //Import des composants Bootstrap(components)
import { toast } from 'react-toastify';  // Import des notifications Toast
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import './Authentification.css';  // Import local styles
import Logo from './media/logo.png';  // Import logo image
import MotPasseOublie from './MotPasseOublie';  // Import le composant Mot Passe Oublie pour le routage

// Main Authentification Component
function Authentification() {
  // State variables pour contenir  email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Access history object pour la navigation programmatique
  const history = useHistory();

  // Fonction pour gérer le clic sur le bouton de connexion
  const handleLogin = () => {
    // Faire une requête POST au backend pour l'authentification de l'utilisateur
    axios.post('api/signin', { email, password })
      .then(response => {
        // Afficher success toast and navigate to home page on successful login
        toast.success('Connexion réussie!', {
          position: 'top-center',
          autoClose: 3000,
          onClose: () => {
            history.push('/');
          },
        });
      })
      .catch(error => {
        // Afficher le toast d'erreur si la connexion échoue
        toast.error('Erreur de connexion. Veuillez vérifier vos informations.', {
          position: 'top-center',
          autoClose: 3000,
        });
      });
  };

  // Fonction pour gérer " Mot de Passe oublié ?"cliquez sur le lien
  const handleMotPasseOublieClick = () => {
    // Naviguez vers le "MotPasseOublie"
    history.push('/motPasseOublie');
  };

  // Structure JSX pour le composant
  return (
    <Container fluid className="main">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={3} className="sub-main">
          <div className="imgs">
            <div className="container-image">
              <img src={Logo} alt="logo" className="logo img-fluid" />
            </div>
          </div>

         {/*Formulaire d'authentification*/}
          <Form>
            <h4 className="title">REC-INOV</h4>
            <Form.Group>
              {/* Email Input */}
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

              {/* Password Input */}
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

            {/* Login Button */}
            <div>
              <Button variant="primary" className="login-btn" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Form>

          {/* "Mot de Passe oublié ?" Link */}
          <p className="link mt-3">
            <Link to="/motPasseOublie" onClick={handleMotPasseOublieClick}>
              Mot de Passe oublié ?
            </Link>
          </p>
        </Col>
      </Row>

     {/*Route pour le composant "MotPasseOublie"*/}
      <Switch>
        <Route path="/motPasseOublie" component={MotPasseOublie} />
      </Switch>
    </Container>
  );
}

// Exporter le composant d'authentification
export default Authentification;

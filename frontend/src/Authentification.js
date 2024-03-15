import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './Authentification.css'; // Import local styles
import Logo from './media/logo.png'; // Import logo image
import MotPasseOublie from './MotPasseOublie'; // Import le composant Mot Passe Oublie pour le routage
import App from './app';
import Gest from './pages/gest_utilisateur';

// Main Authentification Component
function Authentification() {
  // Configurer l'objet historique à partir du routeur React
  const history = useHistory();

  // Configurer des variables d'état à l'aide du use State hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('1');
  const [userRole, setUserRole] = useState('');

  // Gérer la fonctionnalité de connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Faites une demande POST à votre point de terminaison principal pour l'authentification
      const response = await axios.post('http://localhost:3002/api/signin', {
        email,
        password,
        role
      });
    
      // Vérifier si la connexion a réussi
      if (response.status === 200) {
        const userRole = response.data.role; // Récupérer le rôle de l'utilisateur depuis la réponse
        
        // Stocker le rôle de l'utilisateur dans l'état de l'application
        setUserRole(userRole);

        // Rediriger vers la page principale après une connexion réussie
        history.push('/app');
      } else {
        // Gérer l'échec d'authentification
        toast.error('La connexion a échoué. Veuillez vérifier vos informations.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      // Gérer l'échec d'authentification
      toast.error('La connexion a échoué. Veuillez vérifier vos informations.', {
        position: 'top-center',
      });
    }
  };

  // Handle click on "Mot de Passe Oublié" link
  const handleMotPasseOublieClick = () => {
    // Rediriger vers route 'MotPasseOublie' 
    history.push('/motPasseOublie');
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
                {/* Saisie par e-mail */}
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

                {/* Password input */}
                <div className="input-container">
                  <input
                    placeholder="Enter Password"
                    className="input-field"
                    type="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="input-field" className="input-label">
                    Enter Password
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/* Select role */}
                <div>
                  <Select 
                   placeholder="Select Role "
                    style={{ width: '100%' , marginTop:"20px"}}
                   
                    onChange={(value) => setRole(value)}
                  > 
                    <Select.Option value="0">Super Admin</Select.Option>
                    <Select.Option value="1">Simple Admin</Select.Option>
                  </Select>
                </div>
              </Form.Group>

              {/* Bouton de connexion */}
              <div>
                <button variant="primary" className="login-btn" onClick={handleLogin}>
                  Login
                </button>
              </div>

              {/* "Mot de Passe oublié ?" link */}
              <p className="link mt-3">
                <Link to="/motPasseOublie" onClick={handleMotPasseOublieClick}>
                  Mot de Passe oublié ?
                </Link>
              </p>
            </Form>
          </Col>
        </Row>

        {/* Route pour  'MotPasseOublie' component */}
        <Switch>
          <Route path="/motPasseOublie" component={MotPasseOublie} />
          <Route path="/app" component={App} />
          {/* Route for another page */}
          <Route path="/another_page" render={() => <div>Another Page</div>} />
          {/* Conditionally render the route based on user role */}
          {userRole === '1' && <Route path="/gest_utilisateur" component={Gest} />}
        </Switch>
      </Container>
    </Router>
  );
}

export default Authentification;
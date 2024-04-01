import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Switch, useHistory,Redirect } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios
import { Select} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; // Import des icônes pour afficher/masquer le mot de passe
import 'antd/dist/antd.css';
import './Authentification.css'; // Import local styles
import Logo from './media/logo.png'; // Import logo image
import MotPasseOublie from './MotPasseOublie'; // Import le composant Mot Passe Oublie pour le routage
import Gest from './pages/gest_utilisateur';
import PrivateRoute from './pages/privetroute';
import Dashboard from './pages/Dashboard';

// Main Authentification Component
function Authentification() {
  // Configurer l'objet historique à partir du routeur React
  const history = useHistory();

  // Configurer des variables d'état à l'aide du use State hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('1');
  const [userRole, setUserRole] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe

  // Gérer la fonctionnalité de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3002/api/signin', {
        email,
        password,
        role
      });
      
    
      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        const userId = response.data.user._id;
        const userEmail = response.data.user.email;
        const userRole = response.data.role;
        const user =response.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('userid', userId);
        localStorage.setItem('useremail', userEmail);
        localStorage.setItem('userrole', userRole);
        console.log('user',user);
        history.push('/Dashboard');
      } else {
        // Gérer les différents cas d'échec d'authentification
        if (response.status === 401) {
          if (response.data.message === 'Incorrect email') {
            // L'email est incorrect
            console.error('Erreur de connexion:', response);
            toast.error('L\'email spécifié est incorrect. Veuillez vérifier vos informations.', {
              position: 'top-center',
            });
          } else if (response.data.message === 'Incorrect password') {
            // Le mot de passe est incorrect
            console.error('Erreur de connexion:', response);
            toast.error('Le mot de passe spécifié est incorrect. Veuillez vérifier vos informations.', {
              position: 'top-center',
            });
          }
        } else if (response.status === 404) {
          // L'email n'existe pas
          console.error('Erreur de connexion:', response);
          toast.error('L\'email spécifié n\'existe pas. Veuillez vérifier vos informations.', {
            position: 'top-center',
          });
        } else {
          // Autres erreurs de connexion
          console.error('Erreur de connexion:', response);
          toast.error('La connexion a échoué. Veuillez réessayer.', {
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      // Gérer les erreurs lors de la connexion
      console.error('Erreur lors de la connexion:', error);
      toast.error('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.', {
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
                        type={showPassword ? "text" : "password"} // Utiliser un type dynamique basé sur l'état showPassword
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="input-field" className="input-label">
                        Enter Password
                        
                      </label>
                      {/* Icône pour afficher/masquer le mot de passe */}
                      {showPassword ? (
                        <EyeTwoTone  className="password-toggle" onClick={() => setShowPassword(false)} />
                        ) : (
                        <EyeInvisibleOutlined  className="password-toggle" onClick={() => setShowPassword(true)} />
                      )}
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
          <Route path="/Dashboard" component={Dashboard} />
          {/* Route for another page */}
          <Route path="/another_page" render={() => <div>Another Page</div>} />
          {/* Private route for gest_utilisateur */}
          <PrivateRoute
            path="/gest_utilisateur"
            render={() => {
              // Vérifier si l'utilisateur a un rôle de "Super Admin"
              if (userRole === '0') { // Super Admin
                return <Gest />;
              } else {
                // Rediriger vers une autre page si l'utilisateur n'a pas les autorisations nécessaires
                return <Redirect to="/Dashboard" />;
              }
            }}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default Authentification;
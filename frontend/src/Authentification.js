import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Switch, useHistory,Redirect } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; 
import 'antd/dist/antd.css';
import './Authentification.css'; 
import Logo from './media/logo.png'; 
import MotPasseOublie from './MotPasseOublie'; 
import Gest from './pages/gest_utilisateur';
import PrivateRoute from './pages/privetroute';
import Dashboard from './pages/Dashboard';
import AjoutQuestion from './AjoutQuestion';
import ListeQuest from './ListeQuest';
import CréerTest from './CréerTest';


function Authentification() {
 
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  
 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/signin', {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        const userId = response.data.user._id;
        const userEmail = response.data.user.email;
        const userRole = response.data.role;
        console.log(userRole)
        const user = response.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('userid', userId);
        localStorage.setItem('useremail', userEmail);
        localStorage.setItem('userrole', userRole);

        console.log('user', user);

        if (userRole == 0) {
          history.push('/Dashboard');
        } else if (userRole == 1) {
          history.push('/creer_test');
        } else {
          toast.error('Rôle utilisateur non reconnu.', {
            position: 'top-center',
          });
        }
      } else {
        if (response.status === 401) {
          if (response.data.message === 'Incorrect email') {
            console.error('Erreur de connexion:', response);
            toast.error('L\'email spécifié est incorrect. Veuillez vérifier vos informations.', {
              position: 'top-center',
            });
          } else if (response.data.message === 'Incorrect password') {
            console.error('Erreur de connexion:', response);
            toast.error('Le mot de passe spécifié est incorrect. Veuillez vérifier vos informations.', {
              position: 'top-center',
            });
          }
        } else if (response.status === 404) {
          console.error('Erreur de connexion:', response);
          toast.error('L\'email spécifié n\'existe pas. Veuillez vérifier vos informations.', {
            position: 'top-center',
          });
        } else {
          console.error('Erreur de connexion:', response);
          toast.error('La connexion a échoué. Veuillez réessayer.', {
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      toast.error('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.', {
        position: 'top-center',
      });
    }
  };

  
  const handleMotPasseOublieClick = () => {
    history.push('/motPasseOublie');
  };

  return (
    
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
                    required
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
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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

                
              </Form.Group>

             
              <div>
                <button variant="primary" className="login-btn" onClick={handleLogin}>
                  Login
                </button>
              </div>

              
              <p className="link mt-3">
                <Link to="/motPasseOublie" onClick={handleMotPasseOublieClick}>
                  Mot de Passe oublié ?
                </Link>
              </p>
            </Form>
          </Col>
        </Row>

        
        <Switch>
        <Route path="/creer_test"  style={{ background: '#3987ee' }} component={CréerTest} />
          <Route path="/motPasseOublie" component={MotPasseOublie} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/another_page" render={() => <div>Another Page</div>} />
          <PrivateRoute
            path="/gest_utilisateur"
            render={() => {
              
              if (userRole === '0') { 
                return <Gest />;
              } else {
                
                return <Redirect to="/Dashboard" />;
              }
            }}
          />
          <PrivateRoute
            path="/AjoutQuestion"
            render={() => {
              // Vérifier si l'utilisateur a un rôle de "Super Admin"
              if (userRole === '0') { // Super Admin
                return <AjoutQuestion />;
              } else {
                
                return <Redirect to="/Dashboard" />;
              }
            }}
          />
          <PrivateRoute
            path="/liste_question"
            render={() => {
              
              if (userRole === '0') { 
                return <ListeQuest />;
              } else {
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
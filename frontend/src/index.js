// Import les modules et styles nécessaires
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles
import Authentification from './Authentification';  // Import the Authentification component
import reportWebVitals from './reportWebVitals';
import './index.css';  // Import global styles
import MotPasseOublie from './MotPasseOublie';  // Import the MotPasseOublie component
import App from './app';  // Import the App component
import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap styles
import { ToastContainer } from 'react-toastify';
import AjoutQuestion from './AjoutQuestion';
import Ajout2 from './Ajout2';

import CodeOTP from './CodeOTP';
import NouveauxMotPasse from './NouveauxMotPasse';
import Gest from './pages/gest_utilisateur';



// Composant racine pour l'application
const Root = () => (
  <Router>
    {/* Configurer des routes à l'aide du composant Switch */}
    <Switch>
      {/* Route pour le composant 'App'  */}
      <Route path="/app" component={App} />
      
      {/* Route pour le composant 'Authentification'  */}
      <Route path="/login" component={Authentification} />
      
      {/* Route pour la composante "MotPasseOublie"  */}
      <Route path="/motPasseOublie" component={MotPasseOublie} />

      <Route path="/CodeOTP" component={CodeOTP} />
      <Route path="/nouveauMotPasse" component={NouveauxMotPasse} />
      <Route path="/gest_utilisateur" component={Gest} />
      <Route path="/AjoutQuestion" component={AjoutQuestion} />
        <Route path="/Ajout2" component={Ajout2} />
    </Switch>
    <ToastContainer/>
  </Router>
);

// Rendre le composant racine à l'élément DOM 'root'
ReactDOM.render(<Root />, document.getElementById('root'));


reportWebVitals();


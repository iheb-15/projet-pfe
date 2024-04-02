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
import CodeOTP from './CodeOTP';
import Gest from './pages/gest_utilisateur';
import ListeQuest from './ListeQuest';
import TraduireQuest from './TraduireQuest';
import { StyledEngineProvider } from '@mui/material/styles';
// Composant racine pour l'application
const Root = () => (
  <Router>
    {/* Configurer des routes à l'aide du composant Switch */}
    <Switch>
      {/* Route pour le composant 'Authentification'  */}
      <Route path="/login" component={Authentification} />
       {/* Route pour le composant 'App'  */}
       <Route path="/app" component={App}/>
      
      {/* Route pour la composante "MotPasseOublie"  */}
      <Route path="/motPasseOublie" component={MotPasseOublie} />

      <Route path="/CodeOTP" component={CodeOTP}/>
      <Route path="/gest_utilisateur" component={Gest}/>
      <StyledEngineProvider injectFirst>
      <Route path="/ajouter_question" style={{ background: '#3987ee'}} component={AjoutQuestion} />
      </StyledEngineProvider>
      <Route path="/traduire_quest" component={TraduireQuest} />
      <Route path="/liste_question"  style={{ background: '#3987ee' }} component={ListeQuest} />
        
    </Switch>
    <ToastContainer/>
  </Router>
);

// Rendre le composant racine à l'élément DOM 'root'
ReactDOM.render(<Root />, document.getElementById('root'));


reportWebVitals();


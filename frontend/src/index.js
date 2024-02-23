import React from 'react';
import ReactDOM from 'react-dom';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Authentification from './Authentification';
import reportWebVitals from './reportWebVitals';
import './index.css';
import MotPasseOublie from './MotPasseOublie';
import App from './app';
import'./App.css';
import Gest from './components/gest_utilisateur';





ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
      
         <Route exact path="/app" element={<App />}/>
        <Route path="/login" element={<Authentification />} />
        <Route path="motPasseOublie" element={<MotPasseOublie />} />
        <Route exact path="/gest_utilisateur" element={<Gest />}/>

      </Routes>
     
      <ToastContainer /> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

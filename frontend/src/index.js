import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Authentification from './Authentification';
import reportWebVitals from './reportWebVitals';
import './index.css';
import MotPasseOublie from './MotPasseOublie';
import App from './app';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Root = () => (
  <Router>
    <Switch>
      <Route path="/app" component={App} />
      <Route path="/login" component={Authentification} />
      <Route path="/motPasseOublie" component={MotPasseOublie} />
    </Switch>
    <ToastContainer /> 
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
reportWebVitals();

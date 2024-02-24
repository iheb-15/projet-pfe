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
<<<<<<< HEAD
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
=======
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
>>>>>>> 50c1de7e4fdd640ebfa035c0bd22669649f88326
);

ReactDOM.render(<Root />, document.getElementById('root'));
reportWebVitals();

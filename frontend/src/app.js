import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch ,Redirect} from 'react-router-dom';

import "antd/dist/antd.min.css";

import './App.css';

import Template from './Template';
import Authentification from './Authentification';
import MotPasseOublie from './MotPasseOublie';
import CodeOTP from './CodeOTP';
import NouveauxMotPasse from './NouveauxMotPasse';
import { ToastContainer } from 'react-toastify';
import { message } from 'antd';

const App = () => {
 const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({ name: 'Visiteur' });




//changer par Auth user

  const [connected, setConnected] = useState(localStorage.getItem("userrole")?localStorage.getItem("userrole"):'3')
  useEffect(() => {

    setConnected(localStorage.getItem('userrole'))
    console.log('connected',connected)
  }, [connected]);
  








  return (
  
    <Router>
    {/* Configurer des routes à l'aide du composant Switch */}
    <Switch>
      {/* Route pour le composant 'App'  */}
      <Route exact  path="/" >
       {connected ==='0'
        ?<Redirect to="/gest_utilisateur"/>
        :<Redirect to="/login"  />
      }
      </Route>
      {/* <Route path="/gest_utilisateur" component={Template} /> */}

      <Route path="/login" component={Authentification} />
      {/* Route pour le composant 'Authentification'  */}
      
      {/* Route pour la composante "MotPasseOublie"  */}
      <Route path="/motPasseOublie" component={MotPasseOublie} />

      <Route path="/CodeOTP" component={CodeOTP}/>
      <Route path="/nouveauMotPasse" component={NouveauxMotPasse}/>
      



      {/* //template */}
       <Template />







    </Switch>
    <ToastContainer/>
  </Router>
  );
};

export default App;

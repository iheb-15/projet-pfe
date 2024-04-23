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

const App = () => {
 
//changer par Auth user

  const [connected, setConnected] = useState(localStorage.getItem("userrole")?localStorage.getItem("userrole"):'3')
  useEffect(() => {

    setConnected(localStorage.getItem('userrole'))
    console.log('connected',connected)
  }, [connected]);
  
  return (
  
    <Router>
    <Switch>
      {/* Route pour le composant 'App'  */}
      <Route exact  path="/" >
       {(connected ==='0' || connected==='1')
        ?<Redirect to="/login"/>
        :<Redirect to="/Dashboard"  />
      }
      </Route>
      <Route path="/login" component={Authentification} />
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


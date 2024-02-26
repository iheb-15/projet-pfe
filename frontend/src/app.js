 import Navbar from './components/Navbar';
 import Sidebar from './components/sidebar';
 import React from 'react';
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 import Gest from './pages/gest_utilisateur';

function App() {
  return (
    <Router>
      <div className="app">
      <Navbar />
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path="/gest_utilisateur" component={Gest} />
          
      
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;


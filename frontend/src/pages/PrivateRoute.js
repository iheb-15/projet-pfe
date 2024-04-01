import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';

const PrivateRoute = ({ component: Component, allowedRoles, userRole, ...rest }) => (
  <Route {...rest} render={(props) => (
    allowedRoles.includes(userRole)
      ? <Component {...props} />
      : (() => {
          alert("Vous n'avez pas les autorisations nécessaires pour accéder à cette page.");
          return <Redirect to='/Dashboard' />;
        })()
  )} />
);

export default PrivateRoute;
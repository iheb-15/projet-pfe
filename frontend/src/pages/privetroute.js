import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userRole === '1' && props.location.pathname === '/gest_utilisateur') {
          // Rediriger vers une autre page si l'utilisateur n'a pas le rôle requis
          return <Redirect to="/app" />;
        } else {
          // Rendre le composant de la route
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
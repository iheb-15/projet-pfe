import React from 'react';
import { Route, Redirect } from 'react-router-dom';

  

const ProtectedRoute = ({ component: Component, userRole, allowedRoles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // Vérifie si l'utilisateur est authentifié et a le rôle requis
        if (userRole && allowedRoles.includes(userRole)) {
          return <Component {...props} />;
        } else {
          // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié ou n'a pas le rôle requis
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
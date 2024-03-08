import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, allowedRoles, ...rest }) => {
  // Vérifie si le rôle de l'utilisateur est autorisé à accéder à la route
  const isAuthorized = allowedRoles.includes(parseInt(role));

  return (
    <Route
      {...rest}
      render={(props) =>
        // Si l'utilisateur est autorisé, affiche le composant, sinon redirige vers une autre page
        isAuthorized ? <Component {...props} /> : <Redirect to="/unauthorized" />
      }
    />
  );
};

export default ProtectedRoute;
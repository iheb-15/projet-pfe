import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PrivateRoute = ({ component: Component, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userRole === '1' && (props.location.pathname === '/gest_utilisateur' || props.location.pathname === '/liste_question' 
        || props.location.pathname === '/AjoutQuestion')) {
          toast.error('Vous n\'êtes pas autorisé à accéder à cette page.',{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return <Redirect to="/Dashboard" />;
        } 
        else {
          
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
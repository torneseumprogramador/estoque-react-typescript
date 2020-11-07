import React from 'react';
import {
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps>;
}
const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        !user ? <Redirect to={{ pathname: '/' }} /> : <Component {...props} />}
    />
  );
};
export default AuthRoute

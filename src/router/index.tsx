import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import AuthRoute from './auth.router';
import Form from '../pages/Form';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <AuthRoute path="/dashboard" exact component={Dashboard} />
        <AuthRoute path="/transaction/new" exact component={Form} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

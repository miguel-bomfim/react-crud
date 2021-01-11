import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


import Login from '../pages/Login';
import UserData from '../pages/UserData';
import AddEditUser from '../pages/AddEditUser';
import StoreProvider from '../Store/Provider'
import RoutesPrivate from './Private';

const Routes = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <RoutesPrivate path="/app" component={UserData} />
        <RoutesPrivate path="/new/:id" component={AddEditUser} />
        <RoutesPrivate path="/new" component={AddEditUser} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </StoreProvider>
  </Router>
);
export default Routes;
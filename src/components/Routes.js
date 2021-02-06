import React from 'react';
import { Router, Switch, Route } from 'react-router';

import Login from '../pages/login';
import Cadastrar from '../pages/cadastrar';
import Home from '../pages/home';
import PrivateRoute from '../components/PrivateRoute'
import NotFaund from './NotFaund'
import { history } from '../history';

// import PrivateRoute from './PrivateRoute'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/login" />
            <Route component={Cadastrar} exact path="/cadastro" />
            <PrivateRoute component={Home} exact path="/" />
            <PrivateRoute component={NotFaund} exact />
        </Switch>
    </Router>
)

export default Routes;
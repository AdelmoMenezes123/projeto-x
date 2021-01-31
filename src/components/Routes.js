import React from 'react';
import { Router, Switch, Route } from 'react-router';

import Login from '../pages/login';
import Cadastrar from '../pages/cadastrar';
import Home from '../pages/home';

import NotFaund from './NotFaund'
import { history } from '../history';

// import PrivateRoute from './PrivateRoute'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/usuarios/login" />
            <Route component={Cadastrar} exact path="/usuarios/cadastro" />
            <Route component={Home} exact path="/usuarios/" />
            <Route component={NotFaund} />
        </Switch>
    </Router>
)

export default Routes;
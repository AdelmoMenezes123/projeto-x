import { React } from "react";

import { Route, Redirect } from "react-router";

const PrivateRoute = props => {
    const isLogged = !! localStorage.getItem('Bearer')
    return !! isLogged ? <Route {...props} /> : <Redirect to="/usuarios/login" />
} 

export default PrivateRoute;
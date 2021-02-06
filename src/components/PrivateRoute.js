import { React } from "react";

import { Route, Redirect } from "react-router";

const PrivateRoute = props => {
    const isLogged = !! localStorage.getItem('Bearer')
    return isLogged ? <Route {...props} exact /> : <Redirect to="/login" exact />
} 

export default PrivateRoute;
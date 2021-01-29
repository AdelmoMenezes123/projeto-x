import React from 'react';

import { ErrorMessage, Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {history} from '../../history'

import './Login.css';

const Login = () => {

    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/auth', values)
        .then( resp => {
            const {data} =resp;
            if(data){
                localStorage.setItem('app-token', data);
                history.post('/')
            }
        })
    };


    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    })
    return (
        <>
            <h1>Login</h1>
            <p>Fill the Filds to continue</p>

            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                <Form className="login">
                    <div className="login-group">
                        <Field name="email" className="login-field" />
                        <ErrorMessage component="span" name="email" className="login-error" />
                    </div>

                    <div className="login-group">
                        <Field name="password" className="login-field" />
                        <ErrorMessage component="span" name="password" className="login-error" />
                    </div>

                    <button className="login-btn" type="submit">Login</button>
                </Form>
            </Formik>
        </>
    );
}

export default Login;
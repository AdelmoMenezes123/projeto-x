import React, { Component } from 'react';

import { ErrorMessage, Form, Formik, Field } from 'formik';
import * as yup from 'yup';

import axios from 'axios';
import { history } from '../../history'
import './Login.css';

class Login extends Component {
    config = {
        headers: { Authorization: `Bearer ` }
    };
    
    handleSubmit = async values => {
        axios.post('http://localhost:9000/usuarios/login',

            values,this.config).then(resp => {
                const { data } = resp;
                if (data) {
                    localStorage.setItem('Bearer', data.token);
                    history.push('/usuarios/')
                }
            }).catch(err => console.log("Error: ", err))
    };

    validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    })
    render() {
        return (
            <div className="container col-md-5 col-lg-4">
                <h1>Login</h1>
                <p>Preencha os campos para continuar</p>

                <Formik initialValues={{}} onSubmit={this.handleSubmit} validationSchema={this.validations}>
                    <Form className="login">
                        <div className="login-group">
                            <Field id="email-login" name="email" placeholder="E-MAIL" className="login-field" />
                            <ErrorMessage component="span" name="email" className="login-error" />
                        </div>

                        <div className="login-group">
                            <Field id="password-login" name="password" placeholder="SENHA" className="login-field" />
                            <ErrorMessage component="span" name="password" className="login-error" />
                        </div>

                        <br /><hr />
                        <input id="tkon" type="hidden" name="token" value="" />
                        <button className="login-btn" type="submit">Login</button>
                        <label className='login-cadastrar'><a href="/usuarios/cadastro">Cadastrar</a></label>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default Login;
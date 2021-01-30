import React from 'react';

import { ErrorMessage, Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { history } from '../../history'
import './Login.css';

const Login = () => {

    const handleSubmit = async values => {
        axios.post('http://localhost:9000/usuarios/login',

            values).then(resp => {
                const { data } = resp;
                if (data) {
                    localStorage.setItem('app-token', data);
                    history.push('/login')
                }
            }).catch(err => console.log("Error: ", err))
    };

    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    })

    return (
        <>
            <h1>Login</h1>
            <p>Preencha os campos para continuar</p>

            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                <Form className="login">
                    <div className="login-group">
                        <Field name="email" placeholder="E-MAIL" className="login-field" />
                        <ErrorMessage component="span" name="email" className="login-error" />
                    </div>

                    <div className="login-group">
                        <Field name="password" placeholder="SENHA" className="login-field" />
                        <ErrorMessage component="span" name="password" className="login-error" />
                    </div>

                    <br /><hr />
                    <button className="login-btn" type="submit">Login</button>
                    <label className='login-cadastrar'><a href="/usuarios/cadastro">Cadastrar</a></label>
                </Form>
            </Formik>
        </>
    );
}

export default Login;
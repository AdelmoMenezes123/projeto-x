import React from 'react';

import { ErrorMessage, Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { history } from '../../history'

import '../login/Login.css'

const Cadastro = () => {

    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/auth', values)
            .then(resp => {
                const { data } = resp;
                if (data) {
                    history.post('/login')
                }
            })
    };


    const validations = yup.object().shape({
        // nome: yup.string().nome().required(),
        // cpf: yup.string().cpf().min(14).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    });

    return (
        <>
            <h1>Cadastro</h1>
            <p>Preencha os campos para criar um novo usuario</p>

            <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
                <Form className="cadastrar">

                    <div className="login-group">
                        <Field name="nome" placeholder="NOME" className="login-field" />
                        <ErrorMessage component="span" name="nome" className="login-error" />
                    </div>

                    <div className="login-group">
                        <Field name="cpf" placeholder="CPF" className="login-field" />
                        <ErrorMessage component="span" name="cpf" className="login-error" />
                    </div>

                    <div className="login-group">
                        <Field name="email" placeholder="E-MAIL" className="login-field" />
                        <ErrorMessage component="span" name="email" className="login-error" />
                    </div>

                    <div className="login-group">
                        <Field name="password" placeholder="SENHA" className="login-field" />
                        <ErrorMessage component="span" name="password" className="login-error" />
                    </div>
                    <br />
                    <hr />
                    <button className="login-btn" type="submit">Cadastrar</button>
                </Form>
            </Formik>
        </>
    );
}
export default Cadastro;
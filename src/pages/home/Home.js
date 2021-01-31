import React, { Component } from 'react';
import Header from '../../components/header'
import api from '../../services/api';

class Home extends Component {

    state = {
        usuarios: [],
    }

    async componentDidMount() {
        const response = await api.get('/usuarios/')
        this.setState({ usuarios: response.data })
    }

    render() {

        const { usuarios } = this.state;
        console.log(usuarios)

        return (
            <>
                <Header />

                <div className="container table-responsive col-lg-6 col-md-6">
                    <table id="table" className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Foto</th>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">
                            {
                                usuarios.map(dados => (
                                    <tr>
                                        <td> <img src={dados.avatar}></img></td>
                                        <td>{dados.nome}</td>
                                        <td>{dados.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default Home;
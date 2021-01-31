import React, { Component } from 'react';
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
            <div className="container table-responsive">
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Foto</th>
                            <th scope="col">Nome</th>
                            <th scope="col">cpf</th>
                            <th scope="col">email</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {
                            usuarios.map(dados => (
                                <tr>
                                    <td> <img src={dados.avatar}></img></td>
                                    <td>nome: {dados.nome}</td>
                                    <td>email: {dados.email}</td>
                                    <td>cpf: {dados.cpf}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Home;
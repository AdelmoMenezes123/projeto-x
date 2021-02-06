import React, { Component } from 'react';
import Header from '../../components/header'
// import api from '../../services/api';
import axios from 'axios'
class Home extends Component {
constructor(props){
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
        usuarios: [],
    }
}
    



    async componentDidMount() {

        var token = await localStorage.getItem('Bearer');
  
        axios.get('http://localhost:9000/usuarios/',{
            headers:{
                Authorization: `Bearer ${token}`,
                'X-Request-ID': new Date().getTime().toString(),
            }
        }).then(resp => {
            const { data } = resp;
            const {usuario} = data;
            // console.log(usuario)
            if (data) {
                // localStorage.getItem('Bearer', data);
                this.setState({ usuarios: usuario})
            }
        }).catch(err => console.log("Error: ", err))
    }

    render() {

         const { usuarios } = this.state;

        return (
            <>
                <Header />

                <div className="container table-responsive col-lg-6 col-md-6 tbl">
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
                                    <tr key={dados._id}>
                                        <td> <img src={dados.avatar} alt="foto do perfil"></img></td>
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
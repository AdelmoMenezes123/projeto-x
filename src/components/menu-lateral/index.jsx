import React, { Component } from 'react';
import axios from 'axios';
import './menu.css'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            usuario: [],
        }
    }

    async componentDidMount() {
        var token = await localStorage.getItem('Bearer');
        var id = await localStorage.getItem('id');

        axios.get(`http://localhost:9000/usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Request-ID': new Date().getTime().toString(),
            }
        }).then(resp => {
            const { data } = resp;
            const { usuario } = data;
            if (data) {
                this.setState({ usuario: usuario })
            }
        }).catch(err => console.log("Error: ", err))
    }

    render() {
        const { usuario } = this.state;
        return (
            <aside>
                <section id="perfil" className="container-fluid mb-4">
                    <div className="perfil-section">PERFIL</div>
                    <div className="img"><img src={usuario.avatar} alt="foto"></img></div>
                    <div className="nome">{usuario.nome}</div>
                    <div className="linha"></div>
                </section>
                <div className="bairro-section">BAIRROS</div>
                <section id="links">
                    <div className="links">Centro</div>
                    <div className="links">Paramirin</div>
                    <div className="links">São Bento</div>
                    <div className="links">Dom João</div>
                </section>
            </aside>

        )
    }
}

export default Menu
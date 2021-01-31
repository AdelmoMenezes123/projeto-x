import React from 'react';
import Menu from '../menu-lateral/'
import './header.css'
const Header = () => {

    return (
        <>
            <Menu />
            <header className="header">
                <div className="menu-icon">
                    <i id="abrir" className="fa fa-bars"></i>
                    <i id="fechar" className="fa fa-close"></i>
                </div>
                <div className="logo"><h1>Projeto X</h1></div>
            </header>
        </>
    )
}

export default Header
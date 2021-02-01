import React from 'react';
import './menu.css'

const Menu = () => {
    return (

        <aside className="container">
            <section id="perfil" className="container mb-4">
                <div className="perfil-section">PERFIL</div>
                <div className="img"><img src="https://ui-avatars.com/api/?rounded=true&name=adelmo"></img></div>
                <div className="linha"></div>
                <div className="nome">Adelmo Menezes</div>
                <div className="email">adelmo@gmail.com</div>
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

export default Menu
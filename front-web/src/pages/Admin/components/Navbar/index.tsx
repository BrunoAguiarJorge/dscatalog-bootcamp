import React from 'react';
import './styles.scss';

const NavBar = () => (
    <nav className="admin-nav-container">
        <ul>
            <li>
                <a href="link" className="admin-nav-item">Meus Pedidos</a>
            </li>
            <li>
                <a href="link" className="admin-nav-item">Minhas categorias</a>
            </li>
            <li>
                <a href="link"className="admin-nav-item" >Meus usuários</a>
            </li>
        </ul>
    </nav>
);

export default NavBar;
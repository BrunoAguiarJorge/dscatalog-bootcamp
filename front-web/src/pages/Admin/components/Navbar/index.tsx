import { isAllowedByRole } from 'core/utils/auth';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const NavBar = () => (
    <nav className="admin-nav-container">
        <ul>
            <li>
                <NavLink to="/admin/products" className="admin-nav-item">
                    My Products
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/categories" className="admin-nav-item">
                    My Categories
                </NavLink>
            </li>
            {isAllowedByRole(['ROLE_ADMIN']) && (
                <li>
                <NavLink to="/admin/users" className="admin-nav-item" >
                    Users
                </NavLink>
            </li>
            )}
        </ul>
    </nav>
);

export default NavBar;
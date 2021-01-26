import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/productcard';
import './styles.scss'

const Catalog = () => (
    <div className="catalag-container">
        <h1 className="catalag-title">
            Catalogo de products
            </h1>
        <div className="catalog-products">
            <Link to="/products/1"><ProductCard /></Link>
            <Link to="/products/2"><ProductCard /></Link>
            <Link to="/products/3"><ProductCard /></Link>
            <Link to="/products/4"><ProductCard /></Link>
            <Link to="/products/5"><ProductCard /></Link>
            <Link to="/products/6"><ProductCard /></Link>
            <Link to="/products/7"><ProductCard /></Link>
           
        </div>
    </div>
);

export default Catalog;
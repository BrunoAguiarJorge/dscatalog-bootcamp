import React from 'react';
import ProductCard from './components/productcard';
import './styles.scss'

const Catalog = () => (
    <div className="catalag-container"> 
        <h1 className="catalag-title">
            Catalogo de products
            </h1>
            <div className="catalog-products">
                <ProductCard />
                  <ProductCard />
                    <ProductCard />
                <ProductCard />
                  <ProductCard />
                    <ProductCard />
                <ProductCard />
                  <ProductCard />
                    <ProductCard />
                <ProductCard />
                  <ProductCard />
                    <ProductCard />

            </div>
    </div>
);

export default Catalog;
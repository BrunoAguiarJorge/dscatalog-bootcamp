import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/productcard';
import './styles.scss'
import { makeRequest } from '../../core/utils/request';
import { ProductsResponse } from '../../core/types/Products';


const Catalog = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    console.log(productsResponse);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }

        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data));
    }, []);

    return (
        <div className="catalag-container">
            <h1 className="catalag-title">
                Catalogo de products
            </h1>
            <div className="catalog-products">
                {productsResponse?.content.map(product => (
                <Link to={`/products/${product.id}`} key={product.id}>
                    <ProductCard product={product} />
                </Link>
                ))}
            </div>
        </div>
    );
}

export default Catalog;
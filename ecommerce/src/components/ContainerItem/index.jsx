import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import './container.css'
import axios from 'axios';

const Container = () => {
    const url = 'http://localhost:8888/php_rest_api/';
    const [products, setProducts] = useState({
        loading: false,
        data: null,
        error: false
    });

    useEffect(() => {
        setProducts({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                setProducts({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setProducts({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url]);
    let content = null
    if (products.error) {
        content = <h1>Error</h1>
    }
    console.log(products.error);

    if (products.loading) {
        content = <p>...Loading</p>
    }
    console.log(products.loading);
    console.log(products.data);
    if (products.data) {
        content = (<ul className="products">
            {products.data.map((product) =>
                <li key={product.id}>
                    <ProductItem
                        product={product}
                    />
                </li>)}
        </ul>
        )


    }
    return (
        { content }
    )
}

export default Container;
import React from 'react';
import ProductItem from '../ProductItem';
import './container.css'

const Container = () => {
    return (
        <ul className="products">

            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
            <li>
                <ProductItem />
            </li>
        </ul>


    )
}

export default Container;
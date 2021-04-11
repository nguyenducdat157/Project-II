import React, {useState, useEffect} from 'react';
import ProductItem from '../ProductItem';
import './container.css'

const Container = (props) => {
    const productItems = props.productItems;
    const listItems = productItems.map((item) =>
        <li><ProductItem itemInfo={item}/></li>
    );
    return (
        <ul className="products">
            {listItems}
        </ul>


    )
}

export default Container;
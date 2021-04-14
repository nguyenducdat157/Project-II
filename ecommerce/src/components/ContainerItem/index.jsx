import React, { useState, useEffect } from 'react';
import ProductItem from '../ProductItem';
import './container.css'
//import axios from 'axios';

const Container = (props) => {
    const productItems = props.productItems;
    console.log(productItems);
    const listItems = productItems.length ? productItems.map((item) =>
        <li><ProductItem itemInfo={item} /></li>
    ) : <p>Chưa có sản phẩm nào ở đây</p>;

    // const listItems = <p>Chưa có sản phẩm nào ở đây</p>;
    // if (productItems !== [])
    //     listItems = productItems.map((item) =>
    //         <li><ProductItem itemInfo={item} /></li>
    //     );


    return (
        <ul className="products">
            {listItems}
        </ul>
    )


}



export default Container;
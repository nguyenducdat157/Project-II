import { DateRangeSharp } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import ProductItem from '../ProductItem';
import './container.css'
import axios from 'axios';
import { HOST_URL } from '../../config';

const Container = (props) => {
    const productItems = props.productItems;
    // console.log(productItems);
    // const [productItems, setProductItems] = useState(props.productItems);
    const [option, setOption] = useState('');
    const [direction, setDirection] = useState('');
    const userID = localStorage.getItem('id');

    const handleChange = (e) => {
        //console.log(e.target.value);
        // console.log(e.target.direction);
        const value = e.target.value.split("-");
        setOption(value[0]);
        setDirection(value[1]);
        console.log(value);
        // const tempProductList = productItems;
        productItems.sort((a, b) => {
            if (value[0] === "price") {

                return (value[1] === 'desc') ? (Math.round((1 - b.saleOff / 100) * b[value[0]])) - (Math.round((1 - a.saleOff / 100) * a[value[0]])) :
                    (Math.round((1 - a.saleOff / 100) * a[value[0]])) - (Math.round((1 - b.saleOff / 100) * b[value[0]]));
            }
            else if (value[0] === 'name') {
                return (value[1] === 'desc') ?
                    b[value[0]].toLowerCase().localeCompare(a[value[0]].toLowerCase()) :
                    a[value[0]].toLowerCase().localeCompare(b[value[0]].toLowerCase())
                    ;
            }

            else {
                return (value[1] === 'desc') ?
                    new Date(a[value[0]]).getTime() - new Date(b[value[0]]).getTime() :
                    new Date(b[value[0]]).getTime() - new Date(a[value[0]]).getTime()
                    ;
            }
        });
        // props.handleChange(tempProductList);
        //  console.log(productItems);

    }

    //console.log({ name: 'dat', age: '18' });
    const listItems = productItems.length ? productItems.map((item) =>
        <li><ProductItem itemInfo={item} /*inWishlist={checkInWishlist(item)}*/ /></li>
    ) : <p>Chưa có sản phẩm nào ở đây</p>;

    return (
        <>
            {!props.isHomePage ?
                <select className="sorting-options" onChange={handleChange} style={{ marginBottom: '1%' }} >
                    <option value="">Sắp xếp theo</option>
                    <option value="price-desc">Giá: Giảm dần</option>
                    <option value="price-asc">Giá: Tăng dần</option>
                    <option value="name-asc">Tên: A-Z</option>
                    <option value="name-desc">Tên: Z-A</option>
                    <option value="importDate-desc">Cũ nhất</option>
                    <option value="importDate-asc" >Mới nhất</option>
                </select> : ''
            }
            <ul className="products">
                {listItems}
            </ul>
        </>
    )


    // return (
    //     <>
    //         {!props.isHomePage ?
    //             <select value className="sorting-options">
    //                 <option value="price" direction="" onChange={() => sortBy(value, direction)}>Giá: Giảm dần</option>
    //                 <option value="price" direction="asc" onChange={() => sortBy(value, direction)}>Giá: Tăng dần</option>
    //                 <option value="name" direction="" onChange={() => sortBy(value, direction)}>Tên: A-Z</option>
    //                 <option value="price" direction="asc" onChange={() => sortBy(value, direction)}>Tên: Z-A</option>
    //                 <option value="importDate" direction="" onChange={() => sortBy(value, direction)}>Cũ nhất</option>
    //                 <option value="importDate" direction="asc" onChange={() => sortBy(value, direction)}>Mới nhất</option>
    //             </select> : ''
    //         }
    //         <ul className="products">
    //             {listItems}
    //         </ul>
    //     </>
    // )


}



export default Container;
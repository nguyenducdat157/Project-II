import { DateRangeSharp } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import ProductItem from '../ProductItem';
import './container.css'
//import axios from 'axios';

const Container = (props) => {
    const productItems = props.productItems;
    //console.log(productItems);
    const [option, setOption] = useState('');
    const [direction, setDirection] = useState('');


    // const listItems = <p>Chưa có sản phẩm nào ở đây</p>;
    // if (productItems !== [])
    //     listItems = productItems.map((item) =>
    //         <li><ProductItem itemInfo={item} /></li>
    //     );
    const handleChange = (e) => {
        //console.log(e.target.value);
        // console.log(e.target.direction);
        const value = e.target.value.split("-");
        setOption(value[0]);
        setDirection(value[1]);
        productItems.sort((a, b) => {
            if (option === "price") {

                return (direction === 'asc') ? (Math.round((1 - b.saleOff / 100) * b[option])) - (Math.round((1 - a.saleOff / 100) * a[option])) :
                    (Math.round((1 - a.saleOff / 100) * a[option])) - (Math.round((1 - b.saleOff / 100) * b[option]));
            }
            else if (option === 'name') {
                return (direction === 'asc') ?
                    b[option].toLowerCase().localeCompare(a[option].toLowerCase()) :
                    a[option].toLowerCase().localeCompare(b[option].toLowerCase())
                    ;
            }

            else {
                return (direction === 'asc') ?
                    new Date(a[option]).getTime() - new Date(b[option]).getTime() :
                    new Date(b[option]).getTime() - new Date(a[option]).getTime()
                    ;
            }
        });
        console.log(productItems);

    }

    //console.log({ name: 'dat', age: '18' });
    const listItems = productItems.length ? productItems.map((item) =>
        <li><ProductItem itemInfo={item} /></li>
    ) : <p>Chưa có sản phẩm nào ở đây</p>;

    return (
        <>
            {!props.isHomePage ?
                <select className="sorting-options" onChange={handleChange} >
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
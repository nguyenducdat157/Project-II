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
    ) : <p>Ch??a c?? s???n ph???m n??o ??? ????y</p>;

    return (
        <>
            {!props.isHomePage ?
                <select className="sorting-options" onChange={handleChange} style={{ marginBottom: '1%' }} >
                    <option value="">S???p x???p theo</option>
                    <option value="price-desc">Gi??: Gi???m d???n</option>
                    <option value="price-asc">Gi??: T??ng d???n</option>
                    <option value="name-asc">T??n: A-Z</option>
                    <option value="name-desc">T??n: Z-A</option>
                    <option value="importDate-desc">C?? nh???t</option>
                    <option value="importDate-asc" >M???i nh???t</option>
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
    //                 <option value="price" direction="" onChange={() => sortBy(value, direction)}>Gi??: Gi???m d???n</option>
    //                 <option value="price" direction="asc" onChange={() => sortBy(value, direction)}>Gi??: T??ng d???n</option>
    //                 <option value="name" direction="" onChange={() => sortBy(value, direction)}>T??n: A-Z</option>
    //                 <option value="price" direction="asc" onChange={() => sortBy(value, direction)}>T??n: Z-A</option>
    //                 <option value="importDate" direction="" onChange={() => sortBy(value, direction)}>C?? nh???t</option>
    //                 <option value="importDate" direction="asc" onChange={() => sortBy(value, direction)}>M???i nh???t</option>
    //             </select> : ''
    //         }
    //         <ul className="products">
    //             {listItems}
    //         </ul>
    //     </>
    // )


}



export default Container;
import { CssBaseline } from '@material-ui/core';
import React from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import './productDetail.css';
import '../../App.css'

const ProductDetail = (props) => {
    const product = {
        name: 'quan',
        img: '',
        price: '2500000đ',
        description: 'cool',
        sizes: ['S', 'M', 'L', 'XL'],
    }
    return (
        <>
            <HeaderItem />
            <div className="details">
                <div className="big-img">
                    <img src="https://product.hstatic.net/200000201725/product/_nik3832_7fbbc8458c5441e1b24bf8871b0814aa_master.jpg"
                        alt="Image Product">

                    </img>

                </div>
                <div className="product-info">
                    <div className="product-title" >
                        <h2>{product.name}</h2>

                    </div>
                    <div className="product-price" id="price-preview">
                        <span>{product.price}</span>

                    </div>

                    <div className="sizes">{
                        product.sizes.map(size => {
                            console.log(size);
                            <button className="btn-size">M</button>
                        })
                    }

                    </div>
                    <div className='quantity'>
                        <button className='quantity-minus quantity-btn' >-</button>
                        <input type='text' name='amount' className='item-quantity' value='2'></input>
                        <button className='quantity-plus quantity-btn' >+</button>
                        <CssBaseline />
                    </div>


                    <div className="product-description">
                        <h3 style={{ fontWeight: '600' }}>Description</h3>
                        <p ><br />{product.description}</p>
                    </div>
                    <button className="btn-cart">Add to cart</button>
                </div>


            </div>
            <Footer />
        </>
    )
}

export default ProductDetail;
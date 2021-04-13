import { CssBaseline } from '@material-ui/core';
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import './productDetail.css';
import '../../App.css'

const ProductDetail = (props) => {
    const [choosenSize, setSize] = useState('S');
    const [amount, setAmount] = useState(1);
    const itemInfo = props.location.state.info;
    
    const product = {
        name: itemInfo['name'],
        img: require('../../asset/images/products/' + itemInfo['imgFile']).default,
        price: itemInfo['price'],
        description: 'cool',
        sizes: ['S', 'M', 'L', 'XL'],
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const handleClickSize = (e) => {

        setSize(e.target.innerHTML);
    }

    const handleIncreaseAmount = () => {
        setAmount(amount + 1);
    }
    const handleDecreaseAmount = () => {
        setAmount(Math.max(0, amount - 1));
    }
    return (
        <>
            <HeaderItem />
            <div className="details">
                <div className="big-img">
                    <img src={product.img}
                        alt="Image Product">

                    </img>

                </div>
                <div className="product-info">
                    <div className="product-title" >
                        <h2>{product.name}</h2>

                    </div>
                    <div className="product-price" id="price-preview-detail">
                        <span>{numberWithCommas(product.price)}đ</span>
                       
                    </div>

                    <div className="sizes">{
                        product.sizes.map((size) => 
                            <button className="btn-size" onClick={handleClickSize} 
                            style={{backgroundColor : choosenSize==size ? 'black' : 'white', color : choosenSize==size ? 'white' : 'black'}}>
                                {size}
                            </button>
                        )
                    }

                    </div>
                    <div className='quantity'>
                        <button className='quantity-minus quantity-btn' disabled={amount == 1} onClick={handleDecreaseAmount}>-</button>
                        <input type='text' name='amount' className='item-quantity' value={amount}></input>
                        <button className='quantity-plus quantity-btn' onClick={handleIncreaseAmount}>+</button>
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
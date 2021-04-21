import { CssBaseline } from '@material-ui/core';
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import './productDetail.css';
import '../../App.css'
import {ToastContainer, toast, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = (props) => {
    const [choosenSize, setSize] = useState('S');
    const [amount, setAmount] = useState(1);
    const itemInfo = props.location.state.info;
    const [showToast, setToast] = useState(false);
    const product = {
        id: itemInfo['ID'],
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

    const addProductToCart = (products, product) => {
        let found = false
        for (let i = 0; i < products.length; i++) {
            if (product.id == products[i].id && product.size == products[i].size) {
                products[i].amount += product.amount;
                // products[i] = product;
                found = true;
                break;
            }
        }
        if (!found) {
            products.push(product);
        }
    }

    const handleAddToCart = () =>{
        let orderInfo = {
            id: product.id, 
            name: product.name,
            img: product.img,
            price: product.price,
            size: choosenSize,
            amount: amount,
        };
        // console.log(orderInfo);
        if (localStorage.getItem('cart') == null){
            let products = [];
            addProductToCart(products, orderInfo);
            // products.push(orderInfo);
            localStorage.setItem('cart', JSON.stringify(products));
        }
        else{
            let products = JSON.parse(localStorage.getItem('cart'));
            addProductToCart(products, orderInfo);
            // products.push(orderInfo);
            localStorage.setItem('cart', JSON.stringify(products));
        }
        setToast(true);
        toast.success("Thêm sản phẩm thành công", {
            onClose: ()=>setToast(false),
            hideProgressBar: true,
            closeButton: false,
            position: "top-center",
            
        })
    
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
                    <div className='quantity-productDetail'>
                        <button className='quantity-minus quantity-btn' disabled={amount == 1} onClick={handleDecreaseAmount}>-</button>
                        <input type='text' name='amount' className='item-quantity' value={amount}></input>
                        <button className='quantity-plus quantity-btn' onClick={handleIncreaseAmount}>+</button>
                        <CssBaseline />
                    </div>


                    <div className="product-description">
                        <h3 style={{ fontWeight: '600' }}>Description</h3>
                        <p ><br />{product.description}</p>
                    </div>
                    <button className="btn-cart" onClick={handleAddToCart}>Add to cart</button>
                </div>
                <ToastContainer
                    transition={Slide}
                    autoClose={2000}
                />


            </div>


            <Footer />
        </>
    )
}

export default ProductDetail;
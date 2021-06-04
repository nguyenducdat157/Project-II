import { CssBaseline } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import './productDetail.css';
import '../../App.css'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HOST_URL } from '../../config';
import axios from 'axios';

const ProductDetail = (props) => {
    const [choosenSize, setSize] = useState('S');
    //const [Wishlist, setWistlist] = useState([]);
    const itemInfo = props.location.state.info;
    console.log(itemInfo);
    const [amount, setAmount] = useState(1);

    //const itemInWistlist = props.location.state.inWishlist;
    const [showToast, setToast] = useState(false);
    const [showToastHeart, setToastHeart] = useState(false);
    const userID = localStorage.getItem('id');
    const product = {
        id: itemInfo['ID'],
        name: itemInfo['name'],
        img: require('../../asset/images/products/' + itemInfo['imgFile']).default,
        price: itemInfo['price'],
        description: itemInfo['description'],
        type: itemInfo['type'],
        availableAmount: itemInfo['availableAmount'],
        saleOff: itemInfo['saleOff']
    }

    // function getSize(type) {
    //     switch (type) {
    //         case 'quan-jeans':
    //         case 'quan-shorts':
    //         case 'quan-tay':
    //         case 'ao-somi':
    //         case 'ao-thun':
    //         case 'ao-polo':
    //             return ['S', 'M', 'L', 'XL', 'XXL'];
    //         case 'accessoty-bag':
    //             return [];
    //         case 'accessory-shoes':
    //             return [38, 39, 40, 41, 42, 43];
    //         case 'accessory-others':
    //             return [];
    //     }
    // }

    const getLikedInLocalStorage = () => {
        //const initLiked = checkInWishlist(product.id);
        const listWishlist = JSON.parse(localStorage.getItem('wishlist'));
        // console.log(listWishlist);
        if (listWishlist === null) {
            return false;

        }
        else {
            for (let i = 0; i < listWishlist.length; i++) {
                if (listWishlist[i].product_id === product.id) {
                    // console.log(listWishlist[i].isInWishlist);
                    return listWishlist[i].isInWishlist;

                }
            }

            return false;
        }
    };

    const [liked, setLiked] = useState(() => {
        return getLikedInLocalStorage();
    });



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
            if (product.id === products[i].id && product.size === products[i].size) {
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



    const handleAddToCart = () => {
        let orderInfo = {
            id: product.id,
            name: product.name,
            // img: product.img,
            imgFile: itemInfo['imgFile'],
            price: product.price,
            size: choosenSize,
            amount: amount,
            availableAmount: product.availableAmount,
            saleOff: product.saleOff
        };
        // console.log(orderInfo);
        if (localStorage.getItem('cart') == null) {
            let products = [];
            addProductToCart(products, orderInfo);
            // products.push(orderInfo);
            localStorage.setItem('cart', JSON.stringify(products));
        }
        else {
            let products = JSON.parse(localStorage.getItem('cart'));
            addProductToCart(products, orderInfo);
            // products.push(orderInfo);
            localStorage.setItem('cart', JSON.stringify(products));
        }
        setToast(true);
        toast.success("Thêm sản phẩm thành công", {
            onClose: () => setToast(false),
            hideProgressBar: true,
            closeButton: false,
            position: "top-center",

        })

    }

    const addToWishList = (items, item) => {
        let found = false
        for (let i = 0; i < items.length; i++) {
            if (item.product_id === items[i].product_id) {
                items[i].isInWishlist = item.isInWishlist;
                found = true;
                break;
            }
        }
        if (!found) {
            items.push(item);
        }
        console.log(item);
    }


    const handleAddToWishList = () => {
        //console.log(liked);
        setLiked((preState) => {
            return !preState;
        });
        // console.log(liked);
        const item = {
            product_id: product.id,
            isInWishlist: !getLikedInLocalStorage()
        }

        if (localStorage.getItem('wishlist') == null) {
            let items = [];

            addToWishList(items, item);

            // products.push(orderInfo);
            localStorage.setItem('wishlist', JSON.stringify(items));
        }
        else {
            let items = JSON.parse(localStorage.getItem('wishlist'));
            // console.log(items);
            addToWishList(items, item);
            // console.log(items);
            // products.push(orderInfo);
            localStorage.setItem('wishlist', JSON.stringify(items));
        }
        //console.log(localStorage.getItem('wishlist'));

        console.log(getLikedInLocalStorage());
        if (getLikedInLocalStorage() === true) {
            //console.log("ADDD");

            const data = {
                "user_id": userID,
                "product_id": itemInfo['ID']
            };
            console.log(JSON.stringify(data));

            let config = {
                method: 'post',
                url: `${HOST_URL}/wishlists`,
                headers: {
                    'Content-Type': 'application/json'
                    // "Access-Control-Allow-Methods": "GET, POST, DELETE"

                },
                data: data

            }
            //config.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            axios(config)
                .then(res => {
                    console.log(res);


                })
                .catch(err => {
                    console.log(err);
                });

            setToastHeart(true);
            toast.success("Đã thêm vào danh sách yêu thích!", {
                onClose: () => setToastHeart(false),
                hideProgressBar: true,
                closeButton: false,
                position: "top-center",

            })

        } else {
            //console.log("Remove");
            const data = {
                "user_id": userID,
                "product_id": itemInfo['ID']
            };
            console.log(JSON.stringify(data));

            let config = {
                method: 'delete',
                url: `${HOST_URL}/wishlists`,
                headers: {
                    'Content-Type': 'application/json'
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
                },
                data: data

            }
            axios(config)
                .then(res => {
                    console.log(res);


                })
                .catch(err => {
                    console.log(err);
                });


        }

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
                    <div className="head-info">
                        <div className="product-title" >
                            <h2>{product.name}</h2>

                        </div>
                        <div className="wishlist">
                            {userID ? <Button variant="outline-light"
                                onClick={handleAddToWishList}
                            ><FontAwesomeIcon icon={faHeart} style={{ color: liked ? 'red' : 'black' }} /></Button>
                                : <Button style={{ display: "none" }} />}

                        </div>
                    </div>

                    <div className="product-price" id="price-preview-detail">
                        <span>{numberWithCommas(product.price)}đ</span>

                    </div>

                    {/* <div className="sizes">{
                        product.sizes.map((size) =>
                            <button className="btn-size" onClick={handleClickSize}
                                style={{ backgroundColor: choosenSize == size ? 'black' : 'white', color: choosenSize == size ? 'white' : 'black' }}>
                                {size}
                            </button>
                        )
                    }

                    </div> */}
                    <div className="product-amount">
                        <p>Đã bán: <b>{itemInfo['soldAmount']}</b> sản phẩm</p>
                        <p>Còn: <b>{itemInfo['availableAmount']}</b> sản phẩm</p>
                    </div>
                    <div className='quantity-productDetail'>
                        <button className='quantity-minus quantity-btn' disabled={amount === 1} onClick={handleDecreaseAmount}>-</button>
                        <input type='text' name='amount' className='item-quantity' value={amount}></input>
                        <button className='quantity-plus quantity-btn' disabled={amount === parseInt(itemInfo['availableAmount']) || parseInt(itemInfo['availableAmount']) === 0} onClick={handleIncreaseAmount}>+</button>
                        <CssBaseline />
                    </div>


                    <div className="product-description">
                        <h3 style={{ fontWeight: '600' }}>Description</h3>
                        <p ><br />{product.description}</p>
                    </div>
                    {parseInt(itemInfo['availableAmount']) > 0 ?
                        <button className="btn-cart" onClick={handleAddToCart}>Add to cart</button> :
                        <h2>Hết hàng</h2>
                    }

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
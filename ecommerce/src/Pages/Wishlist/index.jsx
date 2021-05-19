import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import { HOST_URL } from '../../config';
import './wishlist.css';
import { Link } from 'react-router-dom';
const WishlistItem = (props) => {
    const itemInfo = props.itemInfo;
    const id = props.id;
    const handleItemRemove = () => {
        props.handleItemRemove(id);
    }
    const imgFile = require('../../asset/images/products/' + itemInfo['imgFile']).default;
    return (
        <>
            <div className='wishlist-item'>
                <div className='wishlist-img'>
                    <Link to={{ pathname: `/product-detail/${itemInfo.name}`, state: { info: itemInfo /*Wishlist: inWishlist*/ } }}><img src={imgFile} alt='Product photo' /> </Link>
                    {/* <img src={imgFile} alt='Product photo' /> */}
                </div>

                <div className='wishlist-info'>
                    <div className='wishlist-left'>
                        <Link to={{ pathname: `/product-detail/${itemInfo.name}`, state: { info: itemInfo /*Wishlist: inWishlist*/ } }}> <h4 className="wishlist-name">{itemInfo.name}</h4> </Link>
                        {/* <h4 className="wishlist-name">{itemInfo.name}</h4> */}
                        <p><b><span className='wishlist-price'>{itemInfo.price}</span></b> </p>
                    </div>
                    <div className='wishlist-right'>

                        <button type="button" class="close" aria-label="Close" onClick={handleItemRemove}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {/* <img src="https://theme.hstatic.net/200000201725/1000627199/14/ic_close.png?v=404" alt=""/> */}
                    </div>
                </div>
            </div>
            <div className='hr'>
                <hr />
            </div>
        </>

    );
}
const WishlistPage = () => {
    const [productList, setProductList] = useState([]);
    const userId = localStorage.getItem('id');
    const [itemChange, setItemChange] = useState(0);
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
    }

    useEffect(function () {
        // console.log("hello");
        //const products = JSON.parse(localStorage.getItem('cart'));

        // console.log(userId);
        axios({
            method: 'get',
            url: `${HOST_URL}/wishlists/products?id=${userId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                let wishlist = res.data.response;
                console.log(wishlist);
                setProductList(wishlist);
                // let items = wishlist.map((item) => {
                //     // console.log(item);
                //     return {
                //         product_id: item.product_id,
                //         isInWishlist: true
                //     }
                // })
                // localStorage.setItem('wishlist', JSON.stringify(items));
            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });


        // if (products) {
        //     setProductList(products);
        //     setTotalBill(getTotalBill(products));
        // }

        // console.log(products);
        // console.log(totalBill);
    }, []);
    const handleItemRemove = (id) => {
        const product_id = productList[id].ID;
        productList.splice(id, 1);
        setProductList(productList);
        setItemChange(product_id);
        //console.log(itemChange);
        // setTotalBill(getTotalBill(productList));
        const item = {
            product_id: product_id,
            isInWishlist: false
        }
        let items = JSON.parse(localStorage.getItem('wishlist'));
        addToWishList(items, item);

        localStorage.setItem('wishlist', JSON.stringify(items));


        const data = {
            "user_id": userId,
            "product_id": product_id
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

    return (
        <div>
            <HeaderItem />
            <div className="wishlist-header" style={{ marginLeft: '5%', marginBottom: '20px' }}>
                {productList.length ? <h3>Danh sách sản phẩm quan tâm({productList.length})</h3> : <h3>Không có sản phẩm nào ở đây</h3>}

            </div>
            { productList.length ?

                <div className='wishlist-content'>
                    <div className='items'>
                        <div className="overflow-scroll">
                            <ul>
                                {productList.map((item, idx) =>
                                    <li><WishlistItem handleItemRemove={handleItemRemove} id={idx} itemInfo={item} /></li>
                                )}

                            </ul>
                        </div>
                    </div>
                </div >
                : ''}
            < Footer />
        </div >



    );
}

export default WishlistPage;

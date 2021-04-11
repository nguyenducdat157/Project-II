import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import React from 'react';
import './productItem.css';

const ProductItem = (props) => {
    const {id, available, image, title, sale, salePrice, originalPrice} = props.itemInfo;
    const itemInfo = props.itemInfo;
    const saleOff = itemInfo['saleOff'];
    const name = itemInfo['name'];
    const price = itemInfo['price']

    const imgFile = require('../../asset/images/products/' + itemInfo['imgFile']).default;
    // console.log(imgFile);
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const displaySaleItem = (saleOff, price) => {
        return(
            <div class="product-price" id="price-preview">
            <span className="product-sale">-{saleOff}%</span>
            <span className="product-price-content">{numberWithCommas(Math.round((1 - saleOff/100) * price))}đ</span>
            <del>{numberWithCommas(price)}₫</del>
            </div>
        );
    }
    const displayNormalItem = (price) => {
        return(
            <div class="product-price" id="price-preview">
            <span className="product-price-content">{numberWithCommas(price)}đ</span>

            </div>
        );

    }
    return (
        <div className="product-block">
            <div className="product-image">
            <Link to={{pathname: `/product-detail/${name}`, state: {info: itemInfo}}}><img src={imgFile}></img></Link>
            </div>
            <div className="product-title">
                <Link to={{pathname: `/product-detail/${name}`, state: {info: itemInfo}}}>{name}</Link>
                {/* <a href="https://h2tstore.vn/products/quan-jean-1357xc28" >{name}</a> */}
            </div>
            {saleOff > 0 ? displaySaleItem(saleOff, price) : displayNormalItem(price)}
            {/* <div class="product-price" id="price-preview">
                <span className="product-sale">-{saleOff}%</span>
                <span className="product-price-content">{Math.round((1 - saleOff/100) * price)}</span>
                <del>{price}₫</del>
            </div>
            <div className="product-item__action">
                <span className="product_item__like">
                    <a href="#"><FontAwesomeIcon icon={faHeart} /></a>
                </span>

            </div> */}
        </div>
    )
}

export default ProductItem;
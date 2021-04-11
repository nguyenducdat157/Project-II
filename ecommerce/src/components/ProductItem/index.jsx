import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './productItem.css';
import ImageQuan from '../../asset/quan1.png';
import axios from 'axios';
const ProductItem = (props) => {

    return (
        <div className="product-block">
            <div className="product-image">
                <a href={`/productDetail/${props.product.id}`}><img src={props.product.imgFile}></img></a>
            </div>
            <div className="product-title">
                <a href={`/productDetail/${props.product.id}`} >{props.product.name}</a>
            </div>
            <div class="product-price" id="price-preview">
                <span className="product-sale">-{props.product.sale}</span>
                <span className="product-price-content">{props.product.price}</span>
                <del>{props.product.price * (1 - props.product.sale)}</del>
            </div>
            <div className="product-item__action">
                <span className="product_item__like">
                    <a href="#"><FontAwesomeIcon icon={faHeart} /></a>
                </span>

            </div>
        </div>
    )
}

export default ProductItem;
import React from 'react';
import './productItem.css';
const ProductItem = () => {
    return (
        <div className="product-block grid__row">
            <div className="grid__column-2">
                <div className="product-image">
                    <img src="https://product.hstatic.net/200000201725/product/_nik9584_c1f027880d4148d28450a779faf74478_large.jpg"></img>
                </div>
                <div className="product-title">
                    <a href="https://h2tstore.vn/products/quan-jean-1357xc28" >Quần Jeans MUSLAND</a>
                </div>
                <div class="product-price" id="price-preview">
                    <span className="product-sale">-30%</span>
                    <span className="product-price">553,000₫</span>
                    <del>790,000₫</del>
                </div>
                <div className="product-item__action">
                    <span className="product_item__like">
                        <i className="far fa-heart"></i>
                        {/* <i className="fas fa-heart"></i> */}
                    </span>

                </div>


            </div>
        </div>
    )
}

export default ProductItem;
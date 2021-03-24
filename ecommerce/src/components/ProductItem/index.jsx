import React from 'react';
import './productItem.css';
const ProductItem = () => {
    return (
        // <div className="product-block grid__row">
        //     <div className="grid__column-2">
        //         <div className="product-image">
        //             <img src="https://product.hstatic.net/200000201725/product/_nik9584_c1f027880d4148d28450a779faf74478_large.jpg"></img>
        //         </div>
        //         <div className="product-title">
        //             <a href="https://h2tstore.vn/products/quan-jean-1357xc28" >Quần Jeans MUSLAND</a>
        //         </div>
        //         <div class="product-price" id="price-preview">
        //             <span className="product-sale">-30%</span>
        //             <span className="product-price">553,000₫</span>
        //             <del>790,000₫</del>
        //         </div>
        //         <div className="product-item__action">
        //             <span className="product_item__like">
        //                 <i className="far fa-heart"></i>
        //                 {/* <i className="fas fa-heart"></i> */}
        //             </span>

        //         </div>


        //     </div>
        // </div>
        <div className="single-product">
            <div className="product-img">
                <a href="product-details.html">
                    <img className="default-img" src="https://product.hstatic.net/200000201725/product/_nik9584_c1f027880d4148d28450a779faf74478_large.jpg" alt="#" />
                    <img className="hover-img" src="" alt="#" />
                </a>
                <div className="button-head">
                    <div className="product-action">
                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i className=" ti-eye" /><span>Quick Shop</span></a>
                        <a title="Wishlist" href="#"><i className=" ti-heart " /><span>Add to
                  Wishlist</span></a>
                        <a title="Compare" href="#"><i className="ti-bar-chart-alt" /><span>Add to
                  Compare</span></a>
                    </div>
                    <div className="product-action-2">
                        <a title="Add to cart" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
            <div className="product-content">
                <h3><a href="product-details.html">Women Hot Collection</a></h3>
                <div className="product-price">
                    <span>$29.00</span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;
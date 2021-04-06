import './index.css'
const CartItem = (props) => {
    
    return(
        <div className='cart-item'>
            <div className= 'product-img'>
                <img clasName='product' src='https://product.hstatic.net/200000201725/product/_nik5611_72947c9cf3864ae789f330819d1a8a74_master.jpg' alt='Product photo'/>
            </div>
            
            <div className = 'item'>
                <div className='item-info-remove'>
                    <div className='item-info'>
                        <h4> Áo hoodie </h4>
                        <p hidden={props.hiddenButton}> <span className='item-price'>500000đ</span></p>
                        <p> <span className='variant'> XL/BLUE</span></p>
                    </div>
                    <div className='item-remove'>
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                        {/* <img src="https://theme.hstatic.net/200000201725/1000627199/14/ic_close.png?v=404" alt=""/> */}
                    </div>
                    
                </div>

                <div className='quantity-price'>
                    <div className='quantity'>
                        <button className='quantity-minus quantity-btn' hidden={props.hiddenButton}>-</button>
                        <input type='text' name='amount' className='item-quantity' value='2'></input>
                        <button className='quantity-plus quantity-btn' hidden={props.hiddenButton}>+</button>
                    </div>
                    <b className='total-price'>1000000đ</b>
                </div>
       
            </div>
            <div className='hr'>
                <hr/>
            </div>
            
        </div>
    );
}

export default CartItem
import { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
const CartItem = (props) => {

    const itemInfo = props.itemInfo;
    console.log(itemInfo);
    const id = props.id;
    const [amount, setAmount] = useState(itemInfo.amount);
    const imgFile = require('../../asset/images/products/' + itemInfo['imgFile']).default;


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    const handleIncreaseAmount = () => {
        if (!props.hiddenButton) {


            setAmount(Math.min(amount + 1, itemInfo['availableAmount']));

            // console.log(amount + 1);
            props.handleUpdateAmount(id, amount + 1);
        }


    }
    const handleDecreaseAmount = () => {
        if (!props.hiddenButton) {
            setAmount(Math.max(1, amount - 1));
            props.handleUpdateAmount(id, amount - 1);
        }

    }

    const handleItemRemove = () => {
        props.handleItemRemove(id);
    }
    return (
        <div className='cart-item'>
            <div className='product-img'>
                <Link to={{ pathname: `/product-detail/${itemInfo.name}`, state: { info: itemInfo } }}><img clasName='product' src={imgFile} alt='Product photo' /></Link>
                {/* <img clasName='product' src={itemInfo.img} alt='Product photo' /> */}
            </div>

            <div className='item'>
                <div className='item-info-remove'>
                    <div className='item-info'>
                        <Link to={{ pathname: `/product-detail/${itemInfo.name}`, state: { info: itemInfo } }}> <h4> {itemInfo.name} </h4></Link>
                        {/* <h4> {itemInfo.name} </h4> */}
                        <p hidden={props.hiddenButton}> <span className='item-price'>{numberWithCommas(itemInfo.price)}</span></p>
                        {/* <p> <span className='variant'> {itemInfo.size}</span></p> */}
                    </div>
                    <div className='item-remove'>
                        <button type="button" class="close" aria-label="Close" onClick={handleItemRemove}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {/* <img src="https://theme.hstatic.net/200000201725/1000627199/14/ic_close.png?v=404" alt=""/> */}
                    </div>

                </div>

                <div className='quantity-price'>
                    <div className='quantity'>
                        <button className='quantity-minus quantity-btn' hidden={props.hiddenButton} onClick={handleDecreaseAmount}>-</button>
                        <input type='text' name='amount' className='item-quantity' value={amount}></input>
                        <button className='quantity-plus quantity-btn' hidden={props.hiddenButton} onClick={handleIncreaseAmount}>+</button>
                    </div>
                    <b className='total-price'>{numberWithCommas(itemInfo.price * amount)}đ</b>
                </div>

            </div>
            <div className='hr'>
                <hr />
            </div>

        </div>
    );
}

export default CartItem
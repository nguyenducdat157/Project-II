import CartItem from '../../components/CartItem/cartItem'
import './index.css'
import Button from 'react-bootstrap/Button'
import Overflow from 'react-bootstrap/'
import CartDropdown from '../../components/Cart-dropdown/cartList'
import HeaderItem from '../../components/Header'
import Footer from '../../components/Footer'
import '../../App.css'
import React, {useState} from 'react';
const CartView = (props) => {
    const [numItems, setNumItems] = useState(0);
    const [itemList, setItemList] = useState([]);
    return (
        <div>
            <HeaderItem />
            <div className="items-header">
                <h4>Giỏ hàng của bạn</h4>
                <p>Có 3 sản phẩm trong giỏ hàng</p>
            </div>
            
            <div className='items-content'>
                <div className='items'>
                    <div className="overflow-scroll">
                        <ul>
                            <li><CartItem hiddenButton={false} /> <hr /></li>
                            <li><CartItem hiddenButton={false} /> <hr /></li>
                            {/* <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li> */}
                        </ul>
                    </div>
                </div>
                <div className="total">
                    <h5><b>Thông tin đơn hàng</b></h5>
                    <hr />
                    <p>Tổng tiền: <span id="total-amount"> 2000000đ</span></p>
                    <hr />
                    <div id='payment'>
                        <button className="button-primary btn-cart"><a href="/checkout">Thanh toán</a></button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default CartView;
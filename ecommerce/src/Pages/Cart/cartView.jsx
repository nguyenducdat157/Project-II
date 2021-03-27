import CartItem from '../../components/CartItem/cartItem'
import './index.css'
import Button from 'react-bootstrap/Button'
import Overflow from 'react-bootstrap/'
import CartDropdown from '../../components/Cart-dropdown/cartList'
const CartView = (props) =>{
    return(
        <div>
            <div className="items-header">
                <h4>Giỏ hàng của bạn</h4>
                <p>Có 3 sản phẩm trong giỏ hàng</p>
                
            </div>
            <div className='items-content'> 
                <div className='items'>
                    <div className="overflow-scroll">
                    <ul>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
                        <li><CartItem hiddenButton={false}/> <hr/></li>
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
                    <hr/>
                    <p>Tổng tiền: <span id="total-amount"> 2000000đ</span></p>
                    <hr/>
                    <div id='payment'>
                        <Button>Thanh toán</Button>
                        <CartDropdown/>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}

export default CartView;
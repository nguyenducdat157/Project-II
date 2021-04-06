import CartItem from '../CartItem/cartItem'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import './index.css'
import { DropdownButton } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
const CartDropdown = (props) => {
    return (

        // <Dropdown>
        //     <Dropdown.Toggle variant="success" id="dropdown-basic">
        //         Dropdown Button
        //     </Dropdown.Toggle>
        //     <p id="cart"> Giỏ hàng</p>
        //     <div id="dropdown-items">
        //         <DropdownMenu>
        //             <Dropdown.ItemText><CartItem hiddenButton="true"/><hr/></Dropdown.ItemText>
        //             <Dropdown.ItemText ><CartItem hiddenButton="true"/><hr/></Dropdown.ItemText>
        //             <Dropdown.ItemText ><CartItem hiddenButton="true"/><hr/></Dropdown.ItemText>
        //         </DropdownMenu>

        //     </div>
        // </Dropdown>

        <DropdownButton variant='light' title={<FontAwesomeIcon icon={faCartArrowDown} style={{ color: 'black' }} />} menuAlign="right" id='cart-dropdown'>

            <p id="cart"> Giỏ hàng</p>
            <div id="dropdown-items">
                <Dropdown.ItemText><CartItem hiddenButton="true" /><hr /></Dropdown.ItemText>
                <Dropdown.ItemText ><CartItem hiddenButton="true" /><hr /></Dropdown.ItemText>
                <Dropdown.ItemText ><CartItem hiddenButton="true" /><hr /></Dropdown.ItemText>
            </div>
            {/* total and button in dropdown */}
            <div className="total-fee">
                <span className="fee-label" style={{ marginLeft: '20px' }}>Tổng tiền</span>
                <span className="fee-value" style={{ marginRight: '44px' }}>30000000</span>
            </div>
            <div className="button-cart-item">
                <button className="btn-view-cart button-primary btn-cart"><a href="/cart">Xem giỏ hàng</a></button>
                <button className="btn-checkout-cart button-primary btn-cart"><a href="/checkout">Thanh toán</a></button>
            </div>



        </DropdownButton>







        // <div className='header-action-dropdown'>

        //     <div className='header-dropdown-content'>
        //         <div className='site-cart'>
        //             <div className='cart-title-bold'>
        //                 <b> Giỏ hàng </b>
        //             </div>
        //             <div className = 'cart-view'>
        //                 <div className='cart-view-scroll'>
        //                     <ul>
        //                         <li>
        //                             <CartItem/>
        //                             <hr/>
        //                         </li>
        //                         <li>
        //                             <CartItem/>
        //                             <hr/>
        //                         </li>
        //                         <li>
        //                             <CartItem/>
        //                             <hr/>
        //                         </li>
        //                         <li>
        //                             <CartItem/>
        //                             <hr/>
        //                         </li>

        //                     </ul>
        //                 </div>
        //                 <div className='cart-view-total'></div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default CartDropdown;
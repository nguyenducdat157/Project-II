import CartItem from '../CartItem/cartItem'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import './index.css'
import { DropdownButton } from 'react-bootstrap'
const CartDropdown = (props) => {
    return(
        

        
            <DropdownButton variant="primary" title="Cart" menuAlign="right">
                <p id="cart"> Giỏ hàng</p>
                <div id="dropdown-items">
                    <Dropdown.ItemText><CartItem hiddenButton="true"/><hr/></Dropdown.ItemText>
                    <Dropdown.ItemText ><CartItem hiddenButton="true"/><hr/></Dropdown.ItemText>
                    <Dropdown.ItemText ><CartItem hiddenButton="true"/><hr/></Dropdown.ItemText>
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
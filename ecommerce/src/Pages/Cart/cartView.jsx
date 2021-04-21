import CartItem from '../../components/CartItem/cartItem'
import './index.css'
import Button from 'react-bootstrap/Button'
import Overflow from 'react-bootstrap/'
import CartDropdown from '../../components/Cart-dropdown/cartList'
import HeaderItem from '../../components/Header'
import Footer from '../../components/Footer'
import '../../App.css'
import React, {useState, useEffect} from 'react';
const CartView = (props) => {

    const [productList, setProductList] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [login, setLogin] = useState(false);
    useEffect(function(){
        // console.log("hello");
        const products = JSON.parse(localStorage.getItem('cart'));
        setProductList(products);
       
        setTotalBill(getTotalBill(products));
        // console.log(products);
        // console.log(totalBill);
    }, []);
    
    // window.addEventListener('storage', () => {
    //     // When local storage changes, dump the list to
    //     // the console.
    //     //  setProductList(JSON.parse(localStorage.getItem('cart')) || [])   
    //     console.log(JSON.parse(localStorage.getItem('cart')));
    //   });
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const renderCartItems = () => {
        // console.log("rendering");
        return (productList.map((item, idx)=>
            <li><CartItem hiddenButton={false} id={idx} itemInfo={item} handleUpdateAmount={handleUpdateAmount} handleItemRemove={handleItemRemove}/></li>
        ));
    }

    // useEffect(renderCartItems, [productList]);
    const handleUpdateAmount = (id, value) => {
        // console.log(value);
        productList[id].amount = Math.max(1, value);
        setProductList(productList);
        setTotalBill(getTotalBill(productList));
        localStorage.setItem('cart', JSON.stringify(productList));
        // console.log(productList);
    }
    const handleItemRemove = (id) => {
        productList.splice(id, 1);
        setProductList(productList);
        setTotalBill(getTotalBill(productList));
        localStorage.setItem('cart', JSON.stringify(productList));
    }
    const getTotalBill = (productList) =>{
        let total = 0;
        for (let i = 0; i < productList.length; i++) {
            total += productList[i].amount * productList[i].price;
        }
        return total;
    }

    const checkLoginStatus = () => {
        setLogin(localStorage.getItem('id') != null);
    }

    
    return (
        <div>
            <HeaderItem />
            <div className="items-header">
                <h4>Giỏ hàng của bạn</h4>
                <p>Có {productList.length} sản phẩm trong giỏ hàng</p>
            </div>
            
            <div className='items-content' hidden={productList.length == 0}>
                <div className='items'>
                    <div className="overflow-scroll">
                        <ul>
                            {productList.map((item, idx)=>
                            <li><CartItem hiddenButton={false} id={idx} itemInfo={item} handleUpdateAmount={handleUpdateAmount} handleItemRemove={handleItemRemove}/></li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="total">
                    <h5><b>Thông tin đơn hàng</b></h5>
                    <hr />
                    <p>Tổng tiền: <span id="total-amount"> {numberWithCommas(totalBill)}đ</span></p>
                    <hr />
                    <div id='payment'>
                        <button className="button-primary btn-cart" onClick={checkLoginStatus}><a href= {login ? "/checkout" : "/signin"} >Thanh toán</a></button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default CartView;
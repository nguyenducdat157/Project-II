import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import './account.css';
const AccountPage = () => {
    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('info');
        localStorage.removeItem('wishlist');
        localStorage.removeItem('cart');
    }
    const info = JSON.parse(localStorage.getItem('info'));
    const userId = localStorage.getItem('id');
    // console.log(info.name);
    // console.log(info.phone);
    // console.log(info.address);
    // console.log(info.email);
    return (
        <>
            <HeaderItem />
            <div className="title-info-account">
                <h1>Tài khoản của bạn
                </h1>
                <hr className="hr-line"></hr>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-3 sidebar-account">
                        <h3 className="titleSidebar">Tài khoản</h3>
                        <ul className="list-unstyled">
                            <li className="wish-list"><Link to={`/customer/wishlist/${userId}`} >Danh sách sản phẩm quan tâm</Link></li>
                            <li className="order-list"><a href="/listOrder">Đơn hàng của tôi</a></li>
                            <li><a href="#">Đổi mật khẩu</a></li>
                            <li className="logout"><a href="/" onClick={handleLogout}>Đăng xuất</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-9">
                        <div className="row">
                            <div className="col-xs-12" id="customer_sidebar">
                                <h2 className="title-detail">Thông tin tài khoản</h2>
                                <p className="name_account">{info.firstname + ' ' + info.lastname}</p>
                                <p className="email ">{info.email}</p>
                                <p className="address">{info.address}</p>
                                <p className="phone">{info.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AccountPage;
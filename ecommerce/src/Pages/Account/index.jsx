import React from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import './account.css';
const AccountPage = () => {
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
                            <li className="wish-list"><a href="/account">Danh sách sản phẩm quan tâm</a></li>
                            <li className="order-list"><a href="/listOrder">Đơn hàng của tôi</a></li>
                            <li><a href="#">Đổi mật khẩu</a></li>
                            <li className="logout"><a href="/account/logout">Đăng xuất</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-9">
                        <div className="row">
                            <div className="col-xs-12" id="customer_sidebar">
                                <h2 className="title-detail">Thông tin tài khoản</h2>
                                <p className="name_account">Đạt Nguyễn</p>
                                <p className="email ">nguyenducdat157@gmail.com</p>
                                <p className="address">Nhân Hiền, Hiền Giang, Thường Tín</p>
                                <p className="phone">0379313749</p>
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
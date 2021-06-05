import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderItem from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { HOST_URL } from '../../config';
import { AdminHeader } from '../Admin/dashboard';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#e5e5e5'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '100px',
        height: '100px',
    },
}));

export default function OrderDetail(props) {
    const classes = useStyles();
    // const orderInfo = props.location.state.info;
    const orderId = props.location.state.orderId;
    const [orderInfo, setOrderInfo] = useState({});
    const userInfo = JSON.parse(localStorage.getItem('info'));
    // let timeShipping =  new Date(orderInfo.createTime);
    // timeShipping.setDate(timeShipping.getDate() + 3);
    // let timeShipping = new Date();
    const [productList, setProductList] = useState([]);
    const isAdmin = true;
    useEffect(function () {


        axios({
            method: 'get',
            url: `${HOST_URL}/orders/order?orderId=${orderId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                let order = res.data.response;

                console.log(order[0]);
                setOrderInfo(order[0]);

            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });


        axios({
            method: 'get',
            // url: `${HOST_URL}/orders/products?orderId=${orderInfo.id}`,
            url: `${HOST_URL}/orders/products?orderId=${orderId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                let products = res.data.response;
                console.log(products);
                setProductList(products);

            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });

    }, []);

    function calculateTime(date) {
        let newTime = new Date(date);
        newTime.setDate(newTime.getDate() + 3);
        return newTime;
    }

    const showListProduct = productList.map(product => {
        // const imgFile = require('../../asset/images/products/' + product.imgFile).default;
        const imgFile = product.imgFile;
        return (

            <Grid container spacing={3}>

                <Grid item xs={5} style={{ textAlign: 'left' }}>

                    <div className="info-product" style={{ display: 'flex' }}>
                        <div className="img-product" >
                            <img className={classes.img} alt="complex" src={imgFile} />
                        </div>
                        <div direction="column" style={{ marginLeft: '20px' }}>
                            <div className="title-product">{product.name}</div>
                            {/* <div className="size-product">S</div> */}
                        </div>
                    </div>

                </Grid>
                <Grid item xs={2} style={{ textAlign: 'left' }}>
                    <p>Giá</p>
                    <div className="price-product">{product.price}</div>

                </Grid>
                <Grid item xs={1} style={{ textAlign: 'left' }}>
                    <p>Số lượng</p>
                    <div className="amount-product">{product.amount}</div>

                </Grid>
                <Grid item xs={2} style={{ textAlign: 'left' }}>
                    <p>Giảm giá</p>
                    <div className="sale-product">{product.saleOff}%</div>

                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <p>Tạm tính</p>
                    <div className="finalprice-product">{Math.round((1 - product.saleOff / 100) * product.price) * product.amount}</div>

                </Grid>
            </Grid>
        );
    })




    //  console.log(orderInfo);
    return (
        <>
            {!userInfo ? <Redirect to="/signin"/> : ""}
            {userInfo && userInfo.role === 'admin' ? <AdminHeader style={{ marginBottom: '30px' }} /> : <HeaderItem />}
            {/* <HeaderItem /> */}
            <div className={classes.root}>
                <Grid container style={{ width: '100%', margin: 'auto' }} spacing={3} >
                    <Grid item xs={4} className="info-receiver" >
                        <p>ĐỊA CHỈ NGƯỜI NHẬN</p>
                        <Paper className={classes.paper} style={{ height: "70%" }}>
                            <div className="name-receiver"><b>{orderInfo.name}</b></div>
                            <div className="address-receiver">{orderInfo.address}</div>
                            <div className="phone-receiver">{orderInfo.phone}</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} className="info-shipping" >
                        <p>HÌNH THỨC GIAO HÀNG</p>
                        <Paper className={classes.paper} style={{ height: "70%" }}>
                            <div className="time-shipping">Giao hàng vào ngày {calculateTime(orderInfo.createTime).getDate()}, tháng {calculateTime(orderInfo.createTime).getMonth() + 1}</div>
                            <div className="fee-shipping">Phí vận chuyển: {orderInfo.shippingFee}</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} className="info-payment">
                        <p>HÌNH THỨC THANH TOÁN</p>
                        <Paper className={classes.paper} style={{ height: "70%" }}>
                            <div className="method-payment">Thanh toán bằng tiền mặt khi nhận hàng</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper className={classes.paper} style={{ display: 'grid' }}>
                            <p>Sản phẩm</p>
                            {showListProduct}
                            <Grid container xs={12} className="summary" style={{ marginTop: '30px' }} >
                                <Grid item xs={8}>

                                </Grid>
                                <Grid item xs={2} >
                                    <p>Tạm tính</p>
                                    <p>Phí vận chuyển</p>
                                    <p>Tổng cộng</p>
                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <p>{orderInfo.total_price}đ</p>
                                    <p>{orderInfo.shippingFee}đ</p>
                                    <p>{parseInt(orderInfo.total_price) + parseInt(orderInfo.shippingFee)}đ</p>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                </Grid>

            </div>
            <Footer />
        </>
    );
}

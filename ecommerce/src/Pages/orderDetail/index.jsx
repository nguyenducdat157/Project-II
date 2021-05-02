import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderItem from '../../components/Header';
import Footer from '../../components/Footer';

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

export default function OrderDetail() {
    const classes = useStyles();

    return (
        <>
            <HeaderItem />
            <div className={classes.root}>
                <Grid container style={{ width: '100%', margin: 'auto' }} spacing={3} >
                    <Grid item xs={4} className="info-receiver" >
                        <p>ĐỊA CHỈ NGƯỜI NHẬN</p>
                        <Paper className={classes.paper} style={{ height: "70%" }}>
                            <div className="name-receiver"><b>HOÀNG HUY QUÂN</b></div>
                            <div className="address-receiver">Địa chỉ: Xâm động, xã Vẫn Tảo, huyện Thường Tín, Việt Nam</div>
                            <div className="phone-receiver">Điện thoại: 0123456789</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} className="info-shipping" >
                        <p>HÌNH THỨC GIAO HÀNG</p>
                        <Paper className={classes.paper} style={{ height: "70%" }}>
                            <div className="time-shipping">Giao vào Thứ 3, ngày 16</div>
                            <div className="fee-shipping">Phí vận chuyển: 20000đ</div>
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
                            <Grid container spacing={3}>
                                <Grid item xs={5} style={{ textAlign: 'left' }}>
                                    <p>Sản phẩm</p>
                                    <div className="info-product" style={{ display: 'flex' }}>
                                        <div className="img-product" >
                                            <img className={classes.img} alt="complex" src="https://product.hstatic.net/200000201725/product/145814512_436424211048780_8189294073782225547_n_92a7dd1e09c948aa9ed2d6742e7c5e6a_grande.jpg" />
                                        </div>
                                        <div direction="column" style={{ marginLeft: '20px' }}>
                                            <div className="title-product">Quần Jeans ống xuông</div>
                                            <div className="size-product">S</div>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'left' }}>
                                    <p>Giá</p>
                                    <div className="price-product">59.500đ</div>

                                </Grid>
                                <Grid item xs={1} style={{ textAlign: 'left' }}>
                                    <p>Số lượng</p>
                                    <div className="amount-product">1</div>

                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'left' }}>
                                    <p>Giảm giá</p>
                                    <div className="sale-product">0đ</div>

                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <p>Tạm tính</p>
                                    <div className="finalprice-product">59.500đ</div>

                                </Grid>
                            </Grid>
                            <Grid container xs={12} className="summary" style={{ marginTop: '30px' }} >
                                <Grid item xs={8}>

                                </Grid>
                                <Grid item xs={2} >
                                    <p>Tạm tính</p>
                                    <p>Phí vận chuyển</p>
                                    <p>Tổng cộng</p>
                                </Grid>
                                <Grid item xs={2} style={{ textAlign: 'right' }}>
                                    <p>59.500đ</p>
                                    <p>0đ</p>
                                    <p>59.500đ</p>
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

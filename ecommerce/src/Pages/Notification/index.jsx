import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderItem from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { HOST_URL } from '../../config';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
}));

const NotifiCationPage = () => {
    const classes = useStyles();
    const userId = localStorage.getItem('id');
    const [notifications, setNotifications] = useState([]);
    const [nofiChange, setNofiChange] = useState(0);
    // const [orders, setOrders] = useState([]);

    useEffect(function () {
        // console.log("hello");
        //const products = JSON.parse(localStorage.getItem('cart'));

        // console.log(userId);
        axios({
            method: 'get',
            url: `${HOST_URL}/notifications?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                let notifyList = res.data.response.reverse();
                console.log(notifyList);
                setNotifications(notifyList);
                // let items = wishlist.map((item) => {
                //     // console.log(item);
                //     return {
                //         product_id: item.product_id,
                //         isInWishlist: true
                //     }
                // })
                // localStorage.setItem('wishlist', JSON.stringify(items));
            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });


        axios({
            method: 'get',
            url: `${HOST_URL}/orders?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, [nofiChange]);
    const changeStatusNofi = async (id, status) => {
        console.log('change');
        if (status === "0") {
            await axios({
                method: 'put',
                url: `${HOST_URL}/notifications`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { "id": id }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log("error!");
                    console.log(err);
                });

            setNofiChange(id);

        }


    }

    // const showListNotify = () => {
    //     return notifications.map(notification =>
    //         <Grid container spacing={3} xs={12} className={classes.paper} >
    //             <Grid item xs={12} sm={1}>

    //             </Grid>
    //             <Grid item xs={12} sm={2}>
    //                 <Paper className={classes.paper}><p>{notification.createTime}</p> </Paper>

    //             </Grid>
    //             <Grid item xs={12} sm={9}>
    //                 <Paper className={classes.paper}><p>{notification.content}</p>

    //                 </Paper>

    //             </Grid>
    //         </Grid>
    //     );
    // }
    return (

        <div className={classes.root}>
            <HeaderItem />
            { notifications.length ?
                <>
                    <div className="notify-title">
                        <h3>Thông báo({notifications.filter(item => { return item.status === "0" }).length})</h3>
                    </div>
                    <Grid container spacing={3} style={{ backgroundColor: '#e5e5e5', margin: '2% 2%', width: '96%' }}>
                        {notifications.map(notification =>
                            <Grid container spacing={3} xs={12} className={classes.paper} >
                                <Grid item xs={12} sm={1}>

                                </Grid>
                                <Grid item xs={12} sm={2}  >
                                    <Paper className={classes.paper} style={{ backgroundColor: (notification.status === "0") ? 'white' : '#E9E9E9' }}><p>
                                        Ngày {new Date(notification.createTime).getDate()}/{new Date(notification.createTime).getMonth() + 1} /{new Date(notification.createTime).getFullYear()}
                                    </p>
                                    </Paper>

                                </Grid>
                                <Grid item xs={12} sm={9} >
                                    <Paper className={classes.paper} style={{ backgroundColor: (notification.status === "0") ? 'white' : '#E9E9E9' }}>
                                        {notification.content === "Đã được xác nhận" ?
                                            < p > Đơn hàng có id {notification.id_order} {notification.content} và đang giao, cảm ơn quý khách !
                                        <Link onClick={() => { changeStatusNofi(notification.id, notification.status) }} to={{ pathname: `/order-detail/${notification.id_order}`, state: { orderId: notification.id_order } }}>
                                                    Chi tiết
                                            </Link>
                                            </p> :
                                            < p > Đơn hàng có id {notification.id_order} {notification.content} thành công, cảm ơn quý khách !
                                        <Link onClick={() => { changeStatusNofi(notification.id, notification.status) }} to={{ pathname: `/order-detail/${notification.id_order}`, state: { orderId: notification.id_order } }}>
                                                    Chi tiết
                                            </Link>
                                            </p>
                                        }


                                    </Paper>

                                </Grid>
                            </Grid>)}

                        {/* {showListNotify} */}

                    </Grid>
                </>
                : <div className="notify-title">
                    <h3 style={{ margin: 'auto' }}>Bạn không có thông báo nào</h3>
                </div>
            }
            <Footer />
        </div >
    );
}

export default NotifiCationPage;
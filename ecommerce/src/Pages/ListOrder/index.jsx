import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { listOrders, deleteOrder } from '../actions/orderActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import HeaderItem from '../../components/Header';
import Footer from '../../components/Footer';
import '../../App.css';
import axios from 'axios';
import { HOST_URL } from '../../config';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabElement(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.parentCallback(newValue);
    };

    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
                style={{ marginRight: '20px' }}
            >
                <Tab label="Tất cả" style={{ textTransform: 'none' }} />
                <Tab label="Đang xác nhận" style={{ textTransform: 'none' }} />
                <Tab label="Đang chuyển" style={{ textTransform: 'none' }} />
                <Tab label="Đã nhận" style={{ textTransform: 'none' }} />
            </Tabs>
        </Paper>
    );
}


function OrdersList(props) {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('id');
    const [tab, setTab] = useState(0);
    //console.log(userId);
    const tabValue = ['Tất cả', 'Đang xác nhận', 'Đang chuyển', 'Đã nhận'];


    const callback = (status) => {
        setTab(status);
    }

    useEffect(function () {
        axios({
            method: 'get',
            url: `${HOST_URL}/orders?userId=${userId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                let orderList = res.data.response;
                orderList = tab ? orderList.filter(item => {
                    return item.status === tabValue[tab];
                }) : orderList;
                setOrders(orderList);

            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });
    }, [tab]);



    return (
        <>
            <HeaderItem />
            <div className="content content-margined">
                <div className="back-to-result" style={{ marginBottom: '20px' }} >
                    <Link to="../account" className="link-primary" style={{ display: 'contents' }}>
                        <Grid container item xs={3} style={{ width: '15rem' }}>
                            <Grid item xs={2}><ArrowBackIcon /></Grid>
                            <Grid item xs={10}>Back to profile</Grid>
                        </Grid>
                    </Link>
                </div>
                <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3>Đơn hàng của tôi</h3>
                    <TabElement style={{ width: 'fit-content' }} parentCallback={callback} />
                </div>

                <div className="order-list">

                    <Table className="table">
                        <TableHead>
                            <tr>
                                <TableCell>ID</TableCell>
                                <TableCell>Created Time</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Status</TableCell>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (<tr key={order.id}>

                                <TableCell>
                                    <Link to={{ pathname: `/order-detail/${order.id}`, state: { info: order } }}>
                                        {order.id}
                                    </Link>
                                </TableCell>
                                {/* <TableCell></TableCell> */}
                                <TableCell>{order.createTime}</TableCell>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.total_price}đ</TableCell>
                                <TableCell>{order.address}</TableCell>

                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <Link /*onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandler(order) : {}} */ style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon /></Link>
                                </TableCell>
                            </tr>))}
                        </TableBody>
                    </Table>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default OrdersList;
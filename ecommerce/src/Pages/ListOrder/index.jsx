import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle, LocalShipping } from '@material-ui/icons';

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
                <Tab label="Đã hủy" style={{ textTransform: 'none' }} />
            </Tabs>
        </Paper>
    );
}



function OrdersList(props) {
    const isAdmin = true;
    const userInfo = JSON.parse(localStorage.getItem('info'));
    // const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('id');
    const [tab, setTab] = useState(0);
    const [orderChange, setOrderChange] = useState({ id: 0, status: 'Đang xác nhận' });
    //console.log(userId);
    const tabValue = ['Tất cả', 'Đang xác nhận', 'Đang chuyển', 'Đã nhận', 'Đã hủy'];


    const callback = (status) => {
        setTab(status);
    }

    const changeStatusHandler = async (id, status) => {
        console.log("change status");
        let checkOrderChange = { id: id, status: '' };
        if (isAdmin) {
            checkOrderChange.status = (status === "Đang xác nhận") ? "Đang chuyển" : "Đã nhận";
            console.log(checkOrderChange.status);
        }
        else {
            checkOrderChange.status = "Đã hủy";
            console.log(checkOrderChange.status);
        }
        const data = {
            id: id,
            status: checkOrderChange.status,
            isAdmin: isAdmin
        }
        // console.log(orderChange.status);

        // console.log(orderChange.status);
        await axios({
            method: 'put',
            url: `${HOST_URL}/orders`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });

        setOrderChange(checkOrderChange);


    }



    useEffect(function () {
        if (userInfo){
            let url = '';
            if (userInfo.role === 'admin'){
                url = `${HOST_URL}/orders`
            }
            else{
                url = `${HOST_URL}/orders?userId=${userId}`
            }
            axios({
                method: 'get',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    let orderList = res.data.response.reverse();
                    orderList = tab ? orderList.filter(item => {
                        return item.status === tabValue[tab];
                    }) : orderList;
                    setOrders(orderList);
    
                })
                .catch(err => {
                    console.log("error!");
                    console.log(err);
                });
        }

    }, [tab, orderChange.id, orderChange.status]);

    // console.log(userInfo);
    return (
        
        <>
            {userInfo === null ?  <Redirect to="/signin"/> : null}
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
                    <h3>Đơn hàng</h3>
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
                                {/* {
                                    isAdmin ? <SimpleSelect initialValue={order.status} /> : <TableCell>{order.status}</TableCell>
                                } */}
                                <TableCell>{order.status}</TableCell>
                                {userInfo.role === 'admin' ?
                                    (order.status === "Đang xác nhận") ?
                                        <TableCell>
                                            <Link onClick={() => {changeStatusHandler(order.id, order.status)}} style={{ color: "#203040", cursor: 'pointer' }}><LocalShipping /></Link>
                                            <Link style={{ color: "#203040", cursor: 'pointer' }}><CheckCircle color="disabled" /></Link>
                                        </TableCell> :
                                        (order.status === "Đang chuyển") ?
                                            <TableCell>
                                                <Link style={{ color: "#203040", cursor: 'pointer' }}><LocalShipping color="disabled" /></Link>
                                                <Link onClick={() => {changeStatusHandler(order.id, order.status)}} style={{ color: "#203040", cursor: 'pointer' }}><CheckCircle /></Link>
                                            </TableCell> :
                                            <TableCell>
                                                <Link style={{ color: "#203040", cursor: 'pointer' }}><LocalShipping color="disabled" /></Link>
                                                <Link style={{ color: "#203040", cursor: 'pointer' }}><CheckCircle color="disabled" /></Link>
                                            </TableCell>
                                    :
                                    (order.status === "Đang xác nhận") ?
                                        <TableCell>
                                            <Link onClick={() => (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không')) ? () => {changeStatusHandler(order.id, order.status)} : {}} style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon /></Link>
                                        </TableCell> :
                                        <TableCell>
                                            <Link style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon color="disabled" /></Link>
                                        </TableCell>


                                }

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
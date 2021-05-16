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



function OrdersList(props) {
    //   const orderList = useSelector(state => state.orderList);
    //   const { loading, orders, error } = orderList;

    //   const orderDelete = useSelector(state => state.orderDelete);
    //   const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    //   const dispatch = useDispatch();

    //   useEffect(() => {
    //     dispatch(listOrders());
    //     return () => {
    //       //
    //     };
    //   }, [successDelete]);

    // xóa đơn hàng
    //   const deleteHandler = (order) => {
    //     dispatch(deleteOrder(order._id));
    //   }

    const orders = [{
        id: '1',
        createDate: '12-04-2020',
        userName: 'nguyenducdat',
        totalPrice: '1.000.000đ',
        address: 'Hanoi',
        status: 'Da nhan'
    },
    {
        id: '1',
        createDate: '12-04-2020',
        userName: 'nguyenducdat',
        totalPrice: '1.000.000đ',
        address: 'Hanoi',
        status: 'Da nhan'
    },
    {
        id: '1',
        createDate: '12-04-2020',
        userName: 'nguyenducdat',
        totalPrice: '1.000.000đ',
        address: 'Hanoi',
        status: 'Da nhan'
    }
    ]
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
                <div className="order-header">
                    <h3>Orders</h3>
                </div>
                <div className="order-list">

                    <Table className="table">
                        <TableHead>
                            <tr>
                                <TableCell>ID</TableCell>
                                <TableCell>Created Date</TableCell>
                                <TableCell>User name</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Status</TableCell>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (<tr key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.createDate}</TableCell>
                                <TableCell>{order.userName}</TableCell>
                                <TableCell>${order.totalPrice}</TableCell>
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
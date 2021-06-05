import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';
import { HOST_URL } from '../../config';
import axios from 'axios';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//     createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//     createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//     createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//     createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//     createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export default function Orders(props) {

    const classes = useStyles();
    // const [orders, setOrders] = useState([]);

    // useEffect(function () {
    //     axios({
    //         method: 'get',
    //         url: `${HOST_URL}/orders`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(res => {
    //             let orderList = res.data.response;
    //             let size = orderList.length;
    //             orderList.sort(function (a, b) {
    //                 return parseInt(b.id) - parseInt(a.id);
    //             });
    //             console.log(size);
    //             if (size > 5) {
    //                 setOrders(orderList.slice(0, 5));
    //             }
    //             else {
    //                 setOrders(orderList);
    //             }
    //         })
    //         .catch(err => {
    //             console.log("error!");
    //             console.log(err);
    //         });
    // }, []);
    let orders = [];
    const orderList = props.listOrder;
    let size = orderList.length;
    orderList.sort(function (a, b) {
        return parseInt(b.id) - parseInt(a.id);
    });
    console.log(size);
    if (size > 5) {
        orders = orderList.slice(0, 5);
    }
    else {
        orders = orderList;
    }

    return (
        <React.Fragment>
            <Title>Đơn hàng gần đây</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Create Date</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <Link to={{ pathname: `/order-detail/${order.id}`, state: { orderId: order.id } }}>
                                    {order.id}
                                </Link>
                            </TableCell>
                            <TableCell>{order.createTime}</TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{numberWithCommas(order.total_price)}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell align="right">{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" to="/admin/listOrder" >
                    Xem thêm đơn hàng
        </Link>
            </div>
        </React.Fragment>
    );
}
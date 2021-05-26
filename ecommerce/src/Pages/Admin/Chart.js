import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';
import { HOST_URL } from '../../config';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}


// const data = [
//     createData('00:00', 0),
//     createData('03:00', 300),
//     createData('06:00', 600),
//     createData('09:00', 800),
//     createData('12:00', 1500),
//     createData('15:00', 2000),
//     createData('18:00', 2400),
//     createData('21:00', 2400),
//     createData('24:00', undefined),
// ];



export default function Chart(props) {
    const theme = useTheme();
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
    //             console.log(orderList);
    //             const today = new Date();
    //             orderList = orderList.filter(item => {
    //                 return new Date(item.createTime).getFullYear() === today.getFullYear() &&
    //                     new Date(item.createTime).getMonth() === today.getMonth() &&
    //                     new Date(item.createTime).getDate() === today.getDate()
    //             });
    //             setOrders(orderList);

    //         })
    //         .catch(err => {
    //             console.log("error!");
    //             console.log(err);
    //         });
    // }, []);
    const today = new Date();
    const orders = props.listOrder.filter(item => {
        return new Date(item.createTime).getFullYear() === today.getFullYear() &&
            new Date(item.createTime).getMonth() === today.getMonth() &&
            new Date(item.createTime).getDate() === today.getDate()
    });;

    // console.log(orders);
    let smallOrders = orders.map(order => {
        let time = order.createTime.split(" ");
        time = time[1].slice(0, 5);
        return {
            time: time,
            price: order.total_price
        }
    })

    let period = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    let data = period.map((x) => {
        let price = (smallOrders === []) ? 0 : smallOrders.reduce((accumulator, currentValue, currentIndex) => {
            // console.log(parseInt(currentValue.time.substring(0, 2)));
            let hour = parseInt(currentValue.time.substring(0, 2));
            if (hour >= parseInt(x.substring(0, 2)) && hour < parseInt(x.substring(0, 2)) + 3) {
                return accumulator + parseInt(currentValue.price) / 1000;
            }
            else return accumulator + 0;
        }, 0)
        //   console.log(createData(x, price))
        return createData(x, price);
    })
    data.push(createData('24:00', undefined));

    return (
        <React.Fragment>
            <Title>Hôm nay</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis type="number" domain={[0, 10000]} tickCount={6} stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Nghìn (đ)
            </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
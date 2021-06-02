import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits(props) {
    const classes = useStyles();
    const today = new Date();
    const orders = props.listOrder.filter(item => {
        return new Date(item.createTime).getFullYear() === today.getFullYear() &&
            new Date(item.createTime).getMonth() === today.getMonth() &&
            new Date(item.createTime).getDate() === today.getDate() && item.status !== "Đã hủy"
    });
    const deposits = orders.reduce((sum, x) => {
        return sum + parseInt(x.total_price) / 1000;
    }, 0);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <React.Fragment>
            <Title>Doanh thu hôm nay</Title>
            <Typography component="p" variant="h5">
                {deposits} (Nghìn đồng)
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Hôm nay
            </Typography>
        </React.Fragment>
    );
}
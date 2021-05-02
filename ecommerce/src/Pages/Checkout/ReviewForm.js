import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const getTotalBill = (productList) => {
    let total = 0;
    for (let i = 0; i < productList.length; i++) {
        total += productList[i].amount * productList[i].price;
    }
    return total;
}




const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review(props) {

    const classes = useStyles();
    const shipInfo = props.shipInfo;
    const cart = props.cart

    const totalBill = getTotalBill(cart) + shipInfo.shipFee;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
      </Typography>
            <List disablePadding>
                {cart.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={'Size: ' + product.size + ' - ' + 'SL: ' + product.amount} />
                        <Typography variant="body2">{numberWithCommas(product.price * product.amount)}đ</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Shipping Fee" />
                    <Typography variant="body2">
                        {numberWithCommas(shipInfo.shipFee)}đ
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {numberWithCommas(totalBill)}đ
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping Information
                    </Typography>
                    <Typography gutterBottom>{shipInfo.firstname + ' ' + shipInfo.lastname}</Typography>
                    <Typography gutterBottom>{shipInfo.address}</Typography>
                    <Typography gutterBottom>{shipInfo.phone}</Typography>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
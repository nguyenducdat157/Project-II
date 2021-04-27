import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './ReviewForm';
import HeaderItem from '../../components/Header';
import Footer from '../../components/Footer';
import {useState} from 'react';
import axios from 'axios';
import { HOST_URL } from '../../config';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    home: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(22),
      
    },
}));

// const steps = ['Shipping address', 'Payment details', 'Review your order'];


export default function Checkout() {
    let history = useHistory();
    const steps = ['Shipping address', 'Review your order'];
    const info = JSON.parse(localStorage.getItem('info'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const shipFee = 30000;
    const userID = localStorage.getItem('id');
   
    let today = new Date();
    const dd = String(today.getDate());
    const mm = String(today.getMonth() + 1); //January is 0!
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    const time = hour + ':' + min + ':' + sec;
    today = yyyy + '-' + mm + '-' + dd + ' ' + time;
    const [shipInfo, setShipInfo] = useState({
        'firstname': info.firstname, 
        'lastname': info.lastname, 
        'address': info.address, 
        'phone': info.phone,
        'shipFee': shipFee
    });


    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const handleShipInfo = (name, value) => {
         
        setShipInfo(prevInfo =>{
            return {...prevInfo, [name]: value}
        });
        
        
    }

    const handleNext = () => {

        if (activeStep == steps.length - 1) {
            const data = {
                "time_created": today,
                "user_id": userID,
                "ship_info": shipInfo,
                "products": cart
            };
            console.log(JSON.stringify(data));
            
            let config = {
                method: 'post',
                url: `${HOST_URL}/orders`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
                    
            }
            axios(config)
                .then(res => {
                    console.log(res);
    
                    
                })
                .catch(err => {
                    console.log(err);
                });
        }
        setActiveStep(activeStep + 1);
    };
    const handleHome = () => {
        localStorage.removeItem('cart');
        history.push('/');
    }
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <div><AddressForm shipInfo={shipInfo} handleShipInfo={handleShipInfo}/></div>;
            case 1:
                return <div><Review cart={cart} shipInfo={shipInfo}/></div>;
            // case 1:
            //     return <div><PaymentForm /></div>;
            // case 2:
            //     return <div><Review /></div>;
            default:
                throw new Error('Unknown step');
        }
    }

    return (

        <React.Fragment>
            <HeaderItem />
            {/* <CssBaseline /> */}
            <AppBar position="absolute" color="default" className={classes.appBar}>
                {/* <Toolbar>

                </Toolbar> */}
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Đặt hàng thành công
                                </Typography>
                                <Typography variant="subtitle1">
                                    Cảm ơn bạn đã mua hàng
                                </Typography>
                                <Button
                                        position="center"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleHome}
                                        className={classes.home}
                                        
                                    >
                                       Tiếp tục mua hàng
                                    </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}

                    </React.Fragment>
                </Paper>
            </main>
            <Footer />
        </React.Fragment>
    );
}


import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { HOST_URL } from '../../config';
import { Redirect } from 'react-router-dom';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Signup() {

    const [user, setUser] = useState({ username: '', password: '', firstname: '', lastname: '', phone: '', email: '', address: '' });

    const [listUserItems, setListUserItems] = useState([]);
    const [success, setSuccess] = useState(false);

    const [isInvalid, setIsInvalid] = useState({
        firstnameIsNull: false,
        lastnameIsNull: false,
        usernameIsNull: false,
        passwordIsNull: false,
        // usernameIsExisted: false,
        // emailIsInvalid: false,
        // phoneIsInvalid: false
    })



    // get list User
    // let configUser = {
    //     method: 'get',
    //     url: `${HOST_URL}/users`,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // }
    // axios(configUser)
    //     .then(res => {
    //         // if (localStorage.getItem('token')) {
    //         //     setLogin(true);
    //         // }
    //         let listUser = res.data.response.user.rows;
    //         setListUserItems(listUser);
    //         //console.log(listUser);

    //     })
    //     .catch(err => {
    //         console.log("error!");
    //         console.log(err);
    //     });


    function validateEmail(email) {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePhone(phone) {
        var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return re.test(String(phone));
    }
    const handleChange = (e) => {
        e.preventDefault();
        let userInfo = user;
        let name = e.target.name;
        let value = e.target.value;
        // console.log(name);
        // console.log(value);
        userInfo[name] = value;

        setUser({
            ...user, userInfo
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            'username': user.username,
            'password': user.password,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'phone': user.phone,
            'email': user.email,
            'address': user.address
        };
        // for (let i = 0; i < listUserItems.length; i++) {
        //     if (user.username === listUserItems[i].username) {
        //         setUsernameIsExisted(true);
        //         break;
        //     }
        // }



        let validate = {
            firstnameIsNull: !user.firstname ? true : false,
            lastnameIsNull: !user.lastname ? true : false,
            usernameIsNull: !user.username ? true : false,
            passwordIsNull: !user.password ? true : false,
            // usernameIsExisted: false,
            emailIsInvalid: !validateEmail(user.email) ? true : false,
            phoneIsInvalid: !validatePhone(user.phone) ? true : false
        }
        console.log(validate.emailIsInvalid, validate.phoneIsInvalid);
        setIsInvalid(validate);
        //  console.log(isInvalid);






        if (user.firstname && user.lastname && user.username && user.password && !validate.emailIsInvalid && !validate.phoneIsInvalid) {
            let config = {
                method: 'post',
                url: `${HOST_URL}/register`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data

            }
            axios(config)
                .then(res => {
                    console.log("success!");
                    setSuccess(true);


                    // console.log(JSON.parse(res.data));
                    // console.log(typeof(res.data));
                    localStorage.setItem('id', res.data.response.user.id);
                    localStorage.setItem('token', res.data.token);
                    const user = res.data.response.user;
                    const userInfo = {
                        name: user.firstname + ' ' + user.lastname,
                        email: user.email,
                        address: user.address,
                        phone: user.phone,
                    };
                    console.log(userInfo);
                    localStorage.setItem('info', JSON.stringify(userInfo));


                })
                .catch(err => {
                    setSuccess(false);
                });

        }
    }

    const classes = useStyles();

    return (

        <Container component="main" maxWidth="xs">
            {success ? <Redirect to='/' /> : ''}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
            </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                // required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                onChange={handleChange}
                                value={user.firstname}
                                autoFocus
                                error={isInvalid.firstnameIsNull ? true : false}
                                helperText={isInvalid.firstnameIsNull ? "Vui lòng điền vào trường này" : ''}


                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                //required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                onChange={handleChange}
                                value={user.lastname}
                                autoComplete="lname"
                                error={isInvalid.lastnameIsNull ? true : false}
                                helperText={isInvalid.lastnameIsNull ? "Vui lòng điền vào trường này" : ''}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                // required
                                fullWidth
                                id="username"
                                label="Username"
                                onChange={handleChange}
                                name="username"
                                value={user.username}
                                error={isInvalid.usernameIsNull}
                                helperText={isInvalid.usernameIsNull ? "Vui lòng điền vào trường này" : ''}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                // required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                value={user.password}
                                autoComplete="current-password"
                                error={isInvalid.passwordIsNull ? true : false}
                                helperText={isInvalid.passwordIsNull ? "Vui lòng điền vào trường này" : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={user.email}

                                autoComplete="email"
                                error={isInvalid.emailIsInvalid ? true : false}
                                helperText={isInvalid.emailIsInvalid ? "Email không hợp lệ" : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                onChange={handleChange}
                                value={user.address}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Phone number"
                                name="phone"
                                onChange={handleChange}
                                value={user.phone}
                                error={isInvalid.phoneIsInvalid ? true : false}
                                helperText={isInvalid.phoneIsInvalid ? "Số điện thoại không hợp lệ" : ''}

                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}

                    >
                        Sign up
                     </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
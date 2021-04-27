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
import {Redirect} from 'react-router-dom';
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

    const [user, setUser] = useState({ username: '', password: '',firstname: '', lastname: '', phone: '', email: '', address:''});
    const [success, setSuccess] = useState(false);
    const handleChange = (e) =>{
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
    
    const classes = useStyles();

    return (
        
        <Container component="main" maxWidth="xs">
            {success ? <Redirect to='/'/> : ''}
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
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                onChange={handleChange}
                                value={user.firstname}
                                autoFocus
                                
                
                            />
                            
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                onChange={handleChange}
                                value={user.lastname}
                                autoComplete="lname"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                onChange={handleChange}
                                name="username"
                                value={user.username}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                value={user.password}
                                autoComplete="current-password"
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
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [err, setError] = useState(false);
    const classes = useStyles();
    const [usernameIsNull, setusernameIsNull] = useState(false);
    const [passwordIsNull, setpasswordIsNull] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            'username': username,
            'password': password,
        };
        if (!username) {
            setusernameIsNull(true);
        }
        else {
            setusernameIsNull(false);
        }

        if (!password) {
            setpasswordIsNull(true);
        }
        else {
            setpasswordIsNull(false);
        }
        let config = {
            method: 'post',
            url: `${HOST_URL}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data

        }
        axios(config)
            .then(res => {
                // console.log("success!");
                // console.log(res);
                setLogin(true);
                // console.log(res);
                localStorage.setItem('id', res.data.response.user.id);
                localStorage.setItem('token', res.data.token);
                let user = res.data.response.user;

                // console.log(user);
                // console.log(user.firstname);
                // console.log(user.lastname);
                // console.log(user.email);
                // console.log(user.address);
                // console.log(user.phone);
                let userInfo = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                };

                localStorage.setItem('info', JSON.stringify(userInfo));

            })
            .catch(err => {
                setError(true);
            });
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return (
        <Container component="main" maxWidth="xs">
            {login ? <Redirect
                to='/'
            /> : ''}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {err && username && password ?
                    <div class="alert alert-danger" role="alert">
                        Mật khẩu hoặc tài khoản không hợp lệ
                    </div>
                    : ''
                }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={usernameIsNull ? true : false}
                        helperText={usernameIsNull ? "Vui lòng điền tên tài khoản" : ''}
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        type="text"
                        autoFocus
                        onChange={handleUsernameChange}

                    />
                    {/* {!username ?
                        <div class="alert alert-danger" role="alert">
                            Vui lòng điền tên tài khoản
                    </div>
                        : ''
                    } */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={passwordIsNull && !usernameIsNull ? true : false}
                        helperText={passwordIsNull && !usernameIsNull ? "Vui lòng điền mật khẩu" : ''}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                    {/* {(username.value && !password.value) ?
                        <div class="alert alert-danger" role="alert">
                            Vui lòng điền mật khẩu
                    </div>
                        : ''
                    } */}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
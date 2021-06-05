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
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function PasswordChange() {

    const userInfo = JSON.parse(localStorage.getItem('info'));
    const id = localStorage.getItem('id');
    const [err, setError] = useState(false);
    const [mismatchErr, setMismatchError] = useState(false);
    const classes = useStyles();
    // const [newPasswordIsNull, setNewPasswordIsNull] = useState(false);
    // const [confirmNewPasswordIsNull, setConfirmNewPasswordIsNull] = useState(false);
    // const [passwordIsNull, setpasswordIsNull] = useState(false);
    const [passwordIsNull, setPasswordIsNull] = useState({oldPasswordIsNull: false, newPasswordIsNull: false, confirmNewPasswordIsNull: false});
   
    const [password, setPassword] = useState({oldPassword: null, newPassword: null, confirmNewPassword: null});
    //const [userId, setUserId] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password.oldPassword){
            setPasswordIsNull({...passwordIsNull, oldPasswordIsNull:true});
            return;
        }
            
        if (!password.newPassword){
            setPasswordIsNull({...passwordIsNull, newPasswordIsNull:true});
            return;
        }

        if (!password.confirmNewPassword){
            setPasswordIsNull({...passwordIsNull, confirmNewPasswordIsNull:true});
            return;
        }




        let data = {
            'old_password': password.oldPassword,
            'new_password': password.newPassword,
        };
        // if (!username) {
        //     setusernameIsNull(true);
        // }
        // else {
        //     setusernameIsNull(false);
        // }

        // if (!password) {
        //     setpasswordIsNull(true);
        // }
        // else {
        //     setpasswordIsNull(false);
        // }
        let config = {
            method: 'PUT',
            url: `${HOST_URL}/users/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data

        }
        axios(config)
            .then(res => {
                setError(false);
                toast.success("Mật khẩu thay đổi thành công!", {
                    onClose: () => {
                      window.location.href='/account'  
                    },
                    hideProgressBar: true,
                    closeButton: false,
                    position: "top-center",
        
                })


            })
            .catch(err => {
                setError(true);
            });



    }

    

    const handlePasswordChange = (e) => {
        let newPassword = password;
        const key = e.target.name;
        const value = e.target.value;
        switch(key){
            case "oldPassword":
                if (value.length === 0){
                    // setPasswordIsNull({...passwordIsNull, oldPasswordIsNull:true});
            
                }
                else{
                    setPasswordIsNull({...passwordIsNull, oldPasswordIsNull:false});
                }
                break;
            case "newPassword":
                if (value.length === 0){
                    // setPasswordIsNull({...passwordIsNull, newPasswordIsNull:true});
            
                }
                else{
                    setPasswordIsNull({...passwordIsNull, newPasswordIsNull:false});
                    // if (value !== password.confirmNewPassword){
                    //     setMismatchError(true);
                    // }
                    // else{
                    //     setMismatchError(false);
                    // }
                }
                break;
            case "confirmNewPassword":
                if (value.length === 0){
                    // setPasswordIsNull({...passwordIsNull, confirmNewPasswordIsNull:true});
                    setMismatchError(false);
                }
                else{
                    
                    setPasswordIsNull({...passwordIsNull, confirmNewPasswordIsNull:false});
                    if (value !== password.newPassword){
                        setMismatchError(true);
                    }
                    else{
                        setMismatchError(false);
                    }
                }
                break;
        }
        newPassword[key] = value;
        setPassword(newPassword);
    }



    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer
                transition={Slide}
                autoClose={1000}
            />
            {!userInfo ? <Redirect to='/signin'/> : ""}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                {err ?
                    <div class="alert alert-danger" role="alert">
                        Mật khẩu không hợp lệ
                    </div>
                    : ''
                }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={passwordIsNull.oldPasswordIsNull ? true : false}
                        helperText={passwordIsNull.oldPasswordIsNull ? "Vui lòng điền mật khẩu cũ" : ''}
                        fullWidth
                        name="oldPassword"
                        label="Nhập mật khẩu cũ"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
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
                        error={passwordIsNull.newPasswordIsNull ? true : false}
                        helperText={passwordIsNull.newPasswordIsNull ? "Vui lòng điền mật khẩu mới" : ''}
                        fullWidth
                        name="newPassword"
                        label="Nhập mật khẩu mới"
                        type="password"
                        id="new_password"
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={passwordIsNull.confirmNewPasswordIsNull || mismatchErr ? true : false}
                        helperText={passwordIsNull.confirmNewPasswordIsNull ? "Vui xác nhận mật khẩu mới" : mismatchErr ? "Mật khẩu mới không khớp" :  ""}
                        fullWidth
                        name="confirmNewPassword"
                        label="Xác nhận mật khẩu mới"
                        type="password"
                        id="confirm_new_password"
                        autoComplete="confirm-new-password"
                        onChange={handlePasswordChange}
                    />  
                    {/* {(username.value && !password.value) ?
                        <div class="alert alert-danger" role="alert">
                            Vui lòng điền mật khẩu
                    </div>
                        : ''
                    } */}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Lưu thay đổi
                    </Button>

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
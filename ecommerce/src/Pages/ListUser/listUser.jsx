import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HeaderItem from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import axios from 'axios';
import { HOST_URL } from '../../config';
import { Pagination } from '@material-ui/lab';
import { AdminHeader } from '../Admin/dashboard';

function UserList(props) {

    const [userList, setUserList] = useState([]);
    const [userListFilter, setUserListFilter] = useState([]);

    const [page, setPage] = useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    useEffect(function () {
        let config = {
            method: 'GET',
            url: `${HOST_URL}/users`,
            headers: {
                'Content-Type': 'application/json'
            },

        }
        axios(config)
            .then(res => {
                const users = res.data.response;
                setUserList(users);
                setUserListFilter(users.slice(page * 10 - 10, page * 10));
                console.log(res.data.response);


            })
            .catch(err => {
                console.log(err);
            });
    }, [page])

    return (
        <>
            {/* <HeaderItem /> */}
            <AdminHeader />
            <div className="content content-margined">
                <div className="back-to-result" style={{ marginBottom: '20px' }}>
                    <Link to="../admin" className="link-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <Grid container style={{ width: '15rem' }}>
                            <Grid item xs={2}><ArrowBackIcon /></Grid>
                            <Grid item xs={10}>Back to profile</Grid>
                        </Grid>
                    </Link>
                </div>
                <div className="product-header">
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography component="h1" variant="h5" style={{ textAlign: 'left', marginLeft: '3rem' }}>
                                Danh sách Khách hàng
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="product-list">

                    <Table className="table" style={{ marginTop: '1rem' }} >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Fullname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody whiteSpace='normal'>
                            {userListFilter.map(user => (<TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.firstname + ' ' + user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{user.phone}</TableCell>

                            </TableRow>))}
                        </TableBody>
                    </Table>

                </div>
            </div >
            <div className="listuser-pagination">
                <Pagination count={Math.ceil(userList.length / 10)} page={page} onChange={handleChangePage} style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '70px',
                        marginBottom: '2%'
                    }}
                />
            </div>
            <Footer />
        </>
    )
}
export default UserList;
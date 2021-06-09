import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
//import { listProducts, deleteProduct } from '../actions/productActions';
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
import { AdminHeader } from '../Admin/dashboard';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TabElement(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.parentCallback(newValue);
    };


    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
                style={{ marginRight: '20px' }}
            >
                <Tab label="Tất cả" style={{ textTransform: 'none' }} />
                <Tab label="new" style={{ textTransform: 'none' }} />
                <Tab label="hot" style={{ textTransform: 'none' }} />
                <Tab label="Ngừng kinh doanh" style={{ textTransform: 'none' }} />
            </Tabs>
        </Paper>
    );
}


function ProductList(props) {
    const [idDelete, setIdDelete] = useState(-1);
    const [tab, setTab] = useState(0);
    const tabValue = ['Tất cả', 'new', 'hot', 'Ngừng kinh doanh'];

    const callback = (status) => {
        setTab(status);
    }
    const handleDelete = (id) => {


        axios({
            method: 'delete',
            url: `${HOST_URL}/products/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                toast.success("Xóa sản phẩm thành công!", {

                    hideProgressBar: true,
                    closeButton: false,
                    position: "top-center",
        
                })
                setIdDelete(id);
            })
            .catch(err => {
                toast.error("Sản phẩm đã được mua, không thể xóa!", {

                    hideProgressBar: true,
                    closeButton: false,
                    position: "top-center",
        
                })
            });
        



    }
    function Datediff(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    }

    useEffect(function(){
        
        let products = [...productList];
        const idx = products.findIndex(product => product.ID === idDelete);
        console.log(idx);
        products.splice(idx, 1);
        setProductList(products);
        // setProductList([...products]);
    }, [idDelete]);

    const [productList, setProductList] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('info'));
    useEffect(function () {
        let config = {
            method: 'GET',
            url: `${HOST_URL}/products`,
            headers: {
                'Content-Type': 'application/json'
            },

        }
        axios(config)
            .then(res => {
                let products = res.data.response;
                console.log(products);
                // products = tab ? products.filter(item => {
                //     return item.status === tabValue[tab];
                // }) : products;
                if (tab) {
                    if (tab === 1) {
                        products = products.filter(product => {
                            let createDate = new Date(product.importDate);
                            let today = new Date();

                            return Datediff(createDate, today) < 30;
                        })
                    }
                    if (tab === 2) {
                        products = products.filter(product => {

                            let createDate = new Date(product.importDate);
                            let today = new Date();
                            //  console.log(Datediff(createDate, today), product.soldAmount);
                            return Datediff(createDate, today) < 15 && parseInt(product.soldAmount) >= 50;
                        })
                    }
                    if (tab === 3) {
                        products = products.filter(product => {
                            return product.status === 'deleted';
                        })
                    }

                }
                products.sort((a, b) => {
                    return parseInt(b.ID) - parseInt(a.ID);
                })
                setProductList(products);
                console.log(res.data.response);

            })
            .catch(err => {
                console.log(err);
            });
    }, [tab])


    if (userInfo && userInfo.role === 'admin') {
        return (
            <>
                <ToastContainer
                    transition={Slide}
                    autoClose={1000}
                />
                <AdminHeader />
                <div className="content content-margined">
                    <div className="back-to-result">
                        <Link to="/admin" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            <Grid container style={{ width: '15rem' }}>
                                <Grid item xs={2}><ArrowBackIcon /></Grid>
                                <Grid item xs={10}>Back to profile</Grid>
                            </Grid>
                        </Link>
                    </div>
                    <div className="tab_element" style={{ width: 'fit-content', marginBottom: '10px' }} >
                        <TabElement parentCallback={callback} />
                    </div>

                    <div className="product-header">
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography component="h1" variant="h5" style={{ textAlign: 'left', marginLeft: '3rem' }}>
                                    Product list
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                                <Link to="../admin/createProduct" style={{ color: '#203040', textDecoration: 'none' }}>
                                    <Grid container>
                                        <Grid item xs={1}><AddBoxIcon /></Grid>
                                        <Grid item xs={4} style={{ fontSize: '1rem' }}>Add product</Grid>
                                    </Grid>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="product-list">

                        <Table className="table" style={{ marginTop: '1rem' }} >
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Aivalable Amount</TableCell>
                                    <TableCell>Sold Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Image</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody whiteSpace='normal'>
                                {productList.map(product => (<TableRow key={product.ID}>
                                    <TableCell>{product.ID}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                    <TableCell>{product.availableAmount}</TableCell>
                                    <TableCell>{product.soldAmount}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                    {/* <TableCell style={{ maxWidth: '4rem', wordBreak: 'break-all' }}>{product.description}</TableCell>*/}

                                    <TableCell><img src={product.imgFile} className="img-productList"></img></TableCell>
                                    <TableCell>
                                        {/* onClick={() => (window.confirm('Are you sure to delete this item?')) ? deleteHandler(product) : {}} */}
                                        <Link style={{ color: "#203040", cursor: 'pointer' }} onClick={()=>(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm?")) ? handleDelete(product.ID) : {}}  ><DeleteIcon /></Link>
                                        <Link to={"../admin/editProduct/" + product.ID} style={{ color: "#203040", cursor: 'pointer' }}><CreateIcon /></Link>
                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>

                    </div>
                </div >
                <Footer />
            </>
        )
    }
    return (<h1>Permission denied</h1>)
}
export default ProductList;
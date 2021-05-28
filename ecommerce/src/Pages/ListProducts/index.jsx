import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
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

function ProductList(props) {
    //   const productList = useSelector(state => state.productList);
    // const productList = [{
    //     id: '1',
    //     name: 'quan au',
    //     price: '100',
    //     brand: 'addidas',
    //     type: 'quan',
    //     availableAmount: '100',
    //     status: 'new',
    //     description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //     image: 'https://product.hstatic.net/200000201725/product/_mg_5019_b98d474453db4d9b83d920178bbd46af_master.jpg',



    // }]
    const [productList, setProductList] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('info'));
    useEffect(function(){
        let config = {
            method: 'GET',
            url: `${HOST_URL}/products`,
            headers: {
                'Content-Type': 'application/json'
            },
                
        }
        axios(config)
            .then(res => {
                const products = res.data.response; 
                setProductList(products);
                console.log(res.data.response);
                
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    
    //   const { loading, products, error } = productList;

    //   const productDelete = useSelector(state => state.productDelete);
    //   const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;


    //   const dispatch = useDispatch();

    //   useEffect(() => {
    //     dispatch(listProducts());
    //     return () => {
    //       //
    //     };
    //   }, [successDelete]);

    // xóa sản phẩm
    //   const deleteHandler = (product) => {
    //     dispatch(deleteProduct(product._id));
    //   }

    //   console.log("product = " + products);

    // return loading ? <div>Loading...</div> :
    if (userInfo && userInfo.role === 'admin'){
        return (
            <>
                <HeaderItem />
                <div className="content content-margined">
                    {/* <div className="back-to-result">
                    <Link href="../profile" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <Grid container style={{ width: '15rem' }}>
                            <Grid item xs={2}><ArrowBackIcon /></Grid>
                            <Grid item xs={10}>Back to profile</Grid>
                        </Grid>
                    </Link>
                </div> */}

                    <div className="product-header">
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography component="h1" variant="h5" style={{ textAlign: 'left', marginLeft: '3rem' }}>
                                    Product list
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                                <Link href="../admin/createProduct" style={{ color: '#203040', textDecoration: 'none' }}>
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
                                    <TableCell>Status</TableCell>
                                    <TableCell>Description</TableCell>
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
                                    <TableCell>{product.status}</TableCell>
                                    <TableCell style={{ maxWidth: '4rem', wordBreak: 'break-all' }}>{product.description}</TableCell>
                                    {/* <TableCell>{Math.round((product.rating + Number.EPSILON) * 10) / 10}</TableCell> */}
                                    <TableCell><img src={require('../../asset/images/products/' + product.imgFile).default} className="img-productList"></img></TableCell>
                                    <TableCell>
                                        {/* onClick={() => (window.confirm('Are you sure to delete this item?')) ? deleteHandler(product) : {}} */}
                                        <Link style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon /></Link>
                                        <Link href={"../admin/updateProduct/" + product.id} style={{ color: "#203040", cursor: 'pointer' }}><CreateIcon /></Link>
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
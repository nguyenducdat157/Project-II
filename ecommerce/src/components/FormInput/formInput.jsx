import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Container, ListSubheader } from '@material-ui/core';
import axios from 'axios';
import { HOST_URL } from '../../config';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
export default function FormInput(props) {
    // const [product, setProduct] = useState({name: '', price: '', imgFile: null, availableAmount: 0, type: '', brand: '', importDate:'', saleOff: 0, status:''})
    const product = props.product;
    const type = product.type;
    const [showToast, setToast] = useState(false);
    // console.log(type);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        props.handleChange(name, value)

    }
    const handleFileSelected = (e) => {
        const files = e.target.files;
        // console.log(files);
        props.handleFileSelected(files)


    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in product){
            console.log(product[key]);
            formData.append(key, product[key]);
        }
        formData.append("method", props.method);
        // console.log(data);
        let config = {
            method: 'POST',
            url:  `${HOST_URL}/products`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData

        }
        axios(config)
            .then(res => {
                // console.log(res);
                setToast(true);
                if (res.status === 200 || res.status === 201){
                    
                    toast.success(props.textButton + " s???n ph???m th??nh c??ng", {
                        onClose: () => {
                            setToast(false);
                            window.location.href = '/admin/listProduct'
                        },
                        hideProgressBar: true,
                        closeButton: false,
                        position: "top-center",
            
                    })
                }
                else{
                    toast.error(props.textButton + " s???n ph???m kh??ng th??nh c??ng", {
                        onClose: () => setToast(false),
                        hideProgressBar: true,
                        closeButton: false,
                        position: "top-center",
            
                    })
                }

            })
            .catch(err => {
                console.log(err);
            });

    }

    return (
        <Container component="main" style={{ width: '40rem', marginBottom: '1%' }}>


            <React.Fragment>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                    {props.titleForm}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                InputLabelProps={{ shrink: true }}
                                name="name"
                                id="name"
                                value={product.name}
                                onChange={handleChange}
                                autoComplete="name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Price"
                                InputLabelProps={{ shrink: true }}
                                name="price"
                                id="price"
                                type="number"
                                value={product.price}
                                onChange={handleChange}
                                min="0"
                                InputProps={{
                                    inputProps: {
                                        min: 0
                                    }
                                }}
                                autoComplete="price"
                                autoFocus

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                variant="outlined"
                                name="imgFile"
                                type="file"
                                label="Image"
                                InputLabelProps={{ shrink: true }}
                                margin="normal"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleFileSelected}
                                autoFocus
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                id="availableAmount"
                                label="Available Amount"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    inputProps: {
                                        min: 1
                                    }
                                }}
                                name="availableAmount"
                                autoComplete="availableAmount"
                                onChange={handleChange}
                                value={product.availableAmount}
                                autoFocus
                                min={0}
                            // onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" margin="normal" style={{ width: '100%' }}>
                                <InputLabel id="type">Type</InputLabel>
                                <Select
                                    id="type"
                                    label="type"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    variant="outlined"
                                    margin="normal"
                                    name="type"
                                    value={type}
                                    defaultValue=''
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <ListSubheader>??o</ListSubheader>
                                    <MenuItem value={"ao-somi"}>??o S??mi</MenuItem>
                                    <MenuItem value={"ao-polo"}>??o Polo</MenuItem>
                                    <MenuItem value={"ao-thun"}>??o Thun</MenuItem>
                                    <ListSubheader>Qu???n</ListSubheader>
                                    <MenuItem value={"quan-jeans"}>Qu???n Jeans</MenuItem>
                                    <MenuItem value={"quan-shorts"}>Qu???n Shorts</MenuItem>
                                    <MenuItem value={"quan-tay"}>Qu???n T??y</MenuItem>
                                    <ListSubheader>Ph??? ki???n</ListSubheader>
                                    <MenuItem value={"accessory-bag"}>Ba l??-T??i x??ch</MenuItem>
                                    <MenuItem value={"accessory-shoes"}>Gi??y</MenuItem>
                                    <MenuItem value={"accessory-others"}>Ph??? ki???n kh??c</MenuItem>
                                </Select>


                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="importDate"
                                name="importDate"
                                label="Import Date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                type="date"
                                value={product.importDate}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="brand"
                                label="Brand"
                                InputLabelProps={{ shrink: true }}
                                name="brand"
                                value={product.brand}
                                onChange={handleChange}
                                autoComplete="brand"
                                autoFocus
                                type="text"
                            // onChange={(e) => setBrand(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" margin="normal" style={{ width: '100%' }}>
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    id="status"
                                    label="status"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    variant="outlined"
                                    margin="normal"
                                    name="status"
                                    value={product.status}
                                    defaultValue=''
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value={"sale"}>??ang b??n</MenuItem>
                                    <MenuItem value={"deleted"}>???? x??a</MenuItem>
                                    
   
                                </Select>


                            </FormControl>
                            {/* <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="status"
                                label="Status"
                                name="status"
                                value={product.status}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                autoFocus

                            // onChange={(e) => setBrand(e.target.value)}
                            /> */}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="number"
                                fullWidth
                                id="saleOff"
                                label="Sale Off"
                                name="saleOff"
                                value={product.saleOff}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    inputProps: {
                                        min: 0
                                    }
                                }}
                                onChange={handleChange}
                                autoFocus
                            // onChange={(e) => setBrand(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                InputLabelProps={{ shrink: true }}
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                autoComplete="description"

                                autoFocus
                            // onChange={(e) => setBrand(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button

                                item
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                {props.textButton}
                            </Button>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button

                                item
                                type="reset"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={props.handleReset}
                            >
                                RESET
                            </Button>

                        </Grid>


                    </Grid>
                </form>
            </React.Fragment>
            <ToastContainer
                transition={Slide}
                autoClose={2000}
            />
        </Container>
    );
}
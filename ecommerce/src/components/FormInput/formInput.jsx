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
import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import { HOST_URL } from '../../config';
export default function FormInput(props) {
    // const [product, setProduct] = useState({name: '', price: '', imgFile: null, availableAmount: 0, type: '', brand: '', importDate:'', saleOff: 0, status:''})
    const product = props.product;
    const type = product.type;
    console.log(type);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
   
        props.handleChange(name, value)

    }
    const handleFileSelected = (e) => {
        const files = e.target.files; 
        props.handleFileSelected(files)

        
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        // HTMLFormControlsCollection.log
        const data = product;
        console.log(data);
        let config = {
            method: 'POST',
            url: `${HOST_URL}/products`,
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

    return (
        <Container component="main" style={{ width: '40rem' }}>


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
                            value = {product.name}
                            onChange = {handleChange}
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
                            value = {product.price}
                            onChange = {handleChange}
                            min="0"
                            autoComplete="price"
                            autoFocus

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            variant="outlined"
                            name="imgFile"
                            type= "file"
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
                            name="availableAmount"
                            autoComplete="availableAmount"
                            onChange = {handleChange}
                            value = {product.availableAmount}
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
                                value = {type}
                                defaultValue=''
                                onChange = {handleChange}
                                fullWidth
                            >
                                <MenuItem value={"Quần"}>Quần</MenuItem>
                                <MenuItem value={"Áo"}>Áo</MenuItem>
                                <MenuItem value={"Phụ Kiện"}>Phụ Kiện</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="importDate"
                            name="importDate"
                            label= "Import Date"
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
                            value = {product.brand}
                            onChange = {handleChange}
                            autoComplete="brand"
                            autoFocus
                            type="text"
                        // onChange={(e) => setBrand(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
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
                        />
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
                            onChange={handleChange}
                            autoFocus
                        // onChange={(e) => setBrand(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
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
                    <Grid item xs={12} sm={12}>
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
              

                </Grid>
            </form>
            </React.Fragment>
        </Container>
    );
}
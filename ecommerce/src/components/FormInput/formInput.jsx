import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Container } from '@material-ui/core';

export default function FormInput(props) {
    return (
        <Container component="main" style={{ width: '40rem' }}>


            <React.Fragment>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                    {props.titleForm}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            id="name"
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
                            name="price"
                            id="price"
                            type="number"
                            min="0"
                            autoComplete="price"
                            autoFocus

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            name="image"
                            value=""
                            label="Image"
                            margin="normal"
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
                            name="availableAmount"
                            autoComplete="availableAmount"
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
                                required
                                variant="outlined"
                                margin="normal"

                                fullWidth

                                name="type"
                            // onChange={(e) => setCategory(e.target.value)}
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
                            label=""
                            fullWidth
                            type="date"
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
                            name="brand"
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
                            defaultValue="new"
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
                            name="description"
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
            </React.Fragment>
        </Container>
    );
}
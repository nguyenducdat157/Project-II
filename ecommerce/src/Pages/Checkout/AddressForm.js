import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useState} from 'react';
export default function AddressForm(props) {
    // const info = JSON.parse(localStorage.getItem('info'));
    // const [shipInfo, setShipInfo] = useState({
    //     'firstname': info.firstname, 
    //     'lastname': info.lastname, 
    //     'address': info.address, 
    //     'phone': info.phone

    // });
    
    // useEffect(function(){
    //     console.log(shipInfo);
    // });

    const shipInfo = props.shipInfo;
    const shipInfoIsNull = props.shipInfoIsNull;
    // console.log(validatePhone(shipInfo.phone));
    // const [isInvalidPhone, setInvalidPhone] = useState(()=>validatePhone(shipInfo.phone));
    const isInvalidPhone = props.isInvalidPhone;
    const handleChange = (e) =>{
        e.preventDefault();
        // const newShipInfo = JSON.parse(JSON.stringify(shipInfo));
        const {name, value} = e.target;

              
        props.handleShipInfo(name, value);

    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstname"
                        name="firstname"
                        label="First name"
                        
                        fullWidth
                        autoComplete="given-name"
                        value={shipInfo.firstname}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastname"
                        name="lastname"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        value={shipInfo.lastname}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        error={shipInfoIsNull.address ? true : false}
                        helperText={shipInfoIsNull.address ? "Vui lòng nhập địa chỉ" : ""}
                        value={shipInfo.address}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone number"
                        fullWidth
                        error={shipInfoIsNull.phone || isInvalidPhone ? true : false}
                        helperText={shipInfoIsNull.phone ? "Vui lòng nhập số điện thoại" : isInvalidPhone ? "Vui lòng nhập đúng định dạng" : ""}
                        value={shipInfo.phone}
                        onChange={handleChange}
                    />
                </Grid>


            </Grid>
        </React.Fragment>
    );
}
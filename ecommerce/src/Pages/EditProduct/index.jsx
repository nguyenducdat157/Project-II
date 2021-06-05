import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import FormInput from '../../components/FormInput/formInput';
import HeaderItem from '../../components/Header';
import { useParams } from 'react-router';
import axios from 'axios';
import { HOST_URL } from '../../config';
import { AdminHeader } from '../Admin/dashboard';
function EditProduct() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const handleChange = (name, value) => {
        // let productInfo = product;
        // console.log(Object.keys(productInfo));
        // productInfo[name] = value;

        // setProduct(productInfo);
        setProduct({
            ...product, [name]: value
        });
        // console.log(product);

    }
    const handleFileSelected = (files) => {
        console.log(files[0]);
        // let productInfo = product;
        // productInfo.imgFile = files[0].name; 
        // setProduct(productInfo);
        setProduct({
            ...product, imgFile: files[0]
        });

    }

    const handleReset = () => {
        const newProduct = {
            id: params['id'],
            name: '',
            price: 0,
            imgFile: null,
            availableAmount: 0,
            type: '',
            brand: '',
            importDate: '',
            description: '',
            saleOff: 0,
            status: 'new'
        }
        setProduct(newProduct);
    }
    useEffect(function () {
        const productID = params['id'];

        let config = {
            method: 'GET',
            url: `${HOST_URL}/products/${productID}`,
            headers: {
                'Content-Type': 'application/json'
            }

        }
        axios(config)
            .then(res => {
                console.log(res.data);
                setProduct(res.data);

            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            {/* <HeaderItem /> */}
            <AdminHeader />
            <FormInput titleForm="Update Product" textButton="Cập nhật" product={product}
                method="PUT"
                handleChange={handleChange} handleFileSelected={handleFileSelected}
                handleReset={handleReset}
            />
            <Footer />
        </div>

    )
}

export default EditProduct;
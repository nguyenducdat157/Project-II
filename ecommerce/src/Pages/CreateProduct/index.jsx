import React, { useState } from 'react';
import Footer from '../../components/Footer';
import FormInput from '../../components/FormInput/formInput';
import HeaderItem from '../../components/Header';
import { AdminHeader } from '../Admin/dashboard';

export default function CreateProduct() {
    const [product, setProduct] = useState({ name: '', price: 0, imgFile: null, availableAmount: 0, type: '', brand: '', importDate: '', description: '', saleOff: 0, status: 'new' })
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

    const handleReset = () => {
        const newProduct = {
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
    const handleFileSelected = (files) => {

        // let productInfo = product;
        // productInfo.imgFile = files[0].name; 
        // setProduct(productInfo);
        setProduct({
            ...product, imgFile: files[0]
        });

    }

    return (
        <div>
            {/* <HeaderItem /> */}
            <AdminHeader />
            <FormInput titleForm="Create Product" textButton="Tạo"
                product={product}
                method="POST"
                handleChange={handleChange}
                handleFileSelected={handleFileSelected}
                handleReset={handleReset}
            />
            <Footer />
        </div>

    )
}
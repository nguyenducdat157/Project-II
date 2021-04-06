import React from 'react';
import Footer from '../../components/Footer';
import FormInput from '../../components/FormInput/formInput';
import HeaderItem from '../../components/Header';
function EditProduct() {

    return (
        <div>
            <HeaderItem />
            <FormInput titleForm="Update Product" textButton="Update" />
            <Footer />
        </div>

    )
}

export default EditProduct;
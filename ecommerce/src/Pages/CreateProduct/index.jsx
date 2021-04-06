import React from 'react';
import Footer from '../../components/Footer';
import FormInput from '../../components/FormInput/formInput';
import HeaderItem from '../../components/Header';
export default function CreateProduct() {

    return (
        <div>
            <HeaderItem />
            <FormInput titleForm="Create Product" textButton="Create" />
            <Footer />
        </div>

    )
}
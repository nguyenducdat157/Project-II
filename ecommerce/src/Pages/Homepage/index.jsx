import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import Slice from '../../components/Slice';
import Container from '../../components/ContainerItem';
import axios from 'axios';
import { HOST_URL } from '../../config.js';
const HomePage = (props) => {

    //const [allProductItems, setAllProductItems] = useState([]);
    const [newProductItems, setNewProductItems] = useState([]);
    const [saleProductItems, setSaleProductItems] = useState([]);
    // useState(()=>{

    // });

    function get5Element(arr) {
        return (arr.length > 5) ? arr.slice(0, 5) : arr;
    }
    const [login, setLogin] = useState(false);
    useEffect(function () {

        let config = {
            method: 'get',
            url: `${HOST_URL}/products`,
            headers: {
                'Content-Type': 'application/json'
            },

        }
        axios(config)
            .then(res => {
                if (localStorage.getItem('token')) {
                    setLogin(true);
                }
                let data = res.data.response;
                let listSaleProducts = data.filter(function (x) {
                    return parseInt(x.saleOff) === 50;
                })

                // console.log(listSaleProducts);
                setSaleProductItems(get5Element(listSaleProducts));
                let listNewProducts = data.filter(function (x) {
                    return (new Date().getTime() - new Date(x.importDate).getTime()) / (1000 * 3600 * 24) < 30;
                })
                listNewProducts = get5Element(listNewProducts);
                setNewProductItems(get5Element(listNewProducts));
                // setAllProductItems(data);


            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });
    }, []);
    //console.log(allProductItems);
    console.log(newProductItems);
    console.log(saleProductItems);
    // const newProductItems = [
    //     {},
    //     {},
    //     {},
    //     {},
    // ];
    // const saleProductItems = [
    //     {},
    //     {},
    //     {},
    //     {},
    // ];

    return (
        <>
            <section>
                <header>
                    <HeaderItem login={login} />
                </header>
            </section>
            <section>
                <Slice />
                <div className="container" style={{ maxWidth: '90%' }}>
                    <a href="/collections/new-arrival" className="link-primary"><h3>New arrival</h3></a>
                    <Container productItems={newProductItems} isHomePage={true} />
                    <a href="/collections/sale-50" className="link-primary"><h3>Sale 50%</h3></a>
                    <Container productItems={saleProductItems} isHomePage={true} />
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </>
    )
}

export default HomePage
import React, {useState, useEffect} from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import Slice from '../../components/Slice';
import Container from '../../components/ContainerItem';
import axios from 'axios';
import { HOST_URL } from '../../config';
const HomePage = (props) => {

    const [newProductItems, setNewProductItems] = useState([]);
    const [saleProductItems, setSaleProductItems] = useState([]);
    // useState(()=>{

    // });
 


    const [login, setLogin] = useState(false);
    useEffect(function(){

        let config = {
            method: 'get',
            url: `${HOST_URL}/products`,
            headers: {
                'Content-Type': 'application/json'
            },
    
        }
        axios(config)
            .then(res => {
                if (localStorage.getItem('token')){
                    setLogin(true);
                }
                let data = res.data.response;
                setNewProductItems(data);
               
            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });
    }, []);
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
                    <h3>New arrival</h3>
                    <Container productItems={newProductItems} />
                    <h3>Sale 50%</h3>
                    <Container productItems={saleProductItems}/>
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </>
    )
}

export default HomePage
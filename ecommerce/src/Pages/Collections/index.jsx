import { Pagination } from '@material-ui/lab';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Container from '../../components/ContainerItem';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import { HOST_URL } from '../../config';


const CollectionPage = () => {
    const [collectionItems, setCollectionItems] = useState('');
    const { type } = useParams();
    console.log(type);
    // useState(()=>{

    // });
    // const [login, setLogin] = useState(false);
    // useEffect(function () {

    //     let config = {
    //         method: 'get',
    //         url: `${HOST_URL}/products/`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },

    //     }


    useEffect(function () {

        let config = {
            method: 'get',
            url: type ? `${HOST_URL}/products/:type?type=${type}` : `${HOST_URL}/products`,
            headers: {
                'Content-Type': 'application/json'
            },

        }
        axios(config)
            .then(res => {
                // if (localStorage.getItem('token')) {
                //     setLogin(true);
                // }
                let data = res.data.response;
                setCollectionItems(data);

            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });
    }, []);

    // function HandleItems() {
    //     setCollectionItems([]);
    // }

    return (<>
        <section>
            <header>
                <HeaderItem />
            </header>
        </section>
        <section>
            <div className="img-collection">
                <img
                    className="d-block w-100 h-custom"
                    src="https://file.hstatic.net/1000300454/file/collection_banner-min_11f1e9d6efab4e4290dc47799f1fd7cf.jpg"
                    alt="Image collection"
                    style={{ height: '500px' }}
                />
            </div>
            <div className="container" style={{ maxWidth: '100%' }}>
                <h3>Tất cả sản phẩm</h3>
                <Container productItems={collectionItems} />

            </div>
            <div className="collection-pagination">
                <Pagination count={10} style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '70px',
                        marginBottom: '-30px'
                    }}
                />
            </div>
        </section>
        <section>
            <Footer />
        </section>
    </>
    )
}

export default CollectionPage;
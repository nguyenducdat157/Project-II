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
    const [collectionItemsFilters, setCollectionItemsFilters] = useState('');
    const { type } = useParams();
    console.log(type);

    //pagination
    const [page, setPage] = useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    // const handleChangeCollectionItems = (productList) => {
    //     setCollectionItemsFilters(productList);
    // }

    //const [filters, setFilters] =

    function setCollectionTitle(type) {
        switch (type) {
            case 'ao':
                return "Áo";

            case 'quan':
                return "Quần";

            case 'accessory':
                return "Phụ Kiện";

            case 'quan-jeans':
                return "Quần Jeans";

            case 'quan-shorts':
                return "Quần shorts";

            case 'quan-tay':
                return "Quần Tây";

            case 'ao-somi':
                return 'Áo Sơmi';

            case 'ao-thun':
                return 'Áo Thun';

            case 'ao-polo':
                return 'Áo Polo';

            case 'accessory-bag':
                return 'Balo-Túi xách';

            case 'accessory-shoes':
                return 'Giày';

            case 'accessory-others':
                return 'Phụ kiện Khác';
        }
    }
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

        // const url = (type === "new-arrival") ? `${HOST_URL}/products/status?status=new` :
        //     (type === "sale-50") ? `${HOST_URL}/products/status?status=sale` :
        //         type ? `${HOST_URL}/products?type=${type}` : `${HOST_URL}/products`;
        // console.log(url);

        let config = {
            method: 'get',
            url: (type === "new-arrival") ? `${HOST_URL}/products/status?status=new` :
                (type === "sale-50") ? `${HOST_URL}/products/status?status=sale` :
                    type ? `${HOST_URL}/products?type=${type}` : `${HOST_URL}/products`,
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
                //console.log(data);
                setCollectionItems(data);
                setCollectionItemsFilters(data.slice(page * 10 - 10, page * 10));

            })
            .catch(err => {
                console.log("error!");
                console.log(err);
            });
    }, [page]);

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
            {/* <div className="img-collection">
                <img
                    className="d-block w-100 h-custom"
                    src="https://file.hstatic.net/1000300454/file/collection_banner-min_11f1e9d6efab4e4290dc47799f1fd7cf.jpg"
                    alt="Image collection"
                    style={{ height: '500px' }}
                />
            </div> */}
            <div className="container" style={{ maxWidth: '90%' }}>
                {type ? <h3><b>{setCollectionTitle(type)}</b></h3> : <h3>Tất cả sản phẩm</h3>}
                <Container productItems={collectionItemsFilters} />

            </div>
            <div className="collection-pagination">
                <Pagination count={Math.ceil(collectionItems.length / 10)} page={page} onChange={handleChangePage} style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '70px',
                        marginBottom: '2%'
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
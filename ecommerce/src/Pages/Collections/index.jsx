import { Pagination } from '@material-ui/lab';

import React from 'react'
import Container from '../../components/ContainerItem';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';


const CollectionPage = () => {

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
                <Container />

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
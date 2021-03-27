
import { Pagination } from '@material-ui/lab';

import React from 'react'
import Container from '../../components/ContainerItem';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';


const QuanPage = () => {

    return (<>
        <section>
            <header>
                <HeaderItem />
            </header>
        </section>
        <section>
            <div className="img-quan">
                <img
                    className="d-block w-100 h-custom"
                    src="https://file.hstatic.net/200000201725/collection/quan_jean_3bbe6a0fe09e4f25ab5649fe9935d7b3.jpg"
                    alt="First slide"
                    style={{ height: '600px' }}
                />
            </div>
            <div className="container" style={{ maxWidth: '100%' }}>
                <h3>Quần</h3>
                <Container />

            </div>
            <div className="quan-pagination">
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

export default QuanPage;
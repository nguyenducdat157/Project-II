
import { Pagination } from '@material-ui/lab';

import React from 'react'
import Container from '../../components/ContainerItem';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';


const AoPage = () => {

    return (<>
        <section>
            <header>
                <HeaderItem />
            </header>
        </section>
        <section>
            <div className="img-ao">
                <img
                    className="d-block w-100 h-custom"
                    src="https://file.hstatic.net/200000201725/collection/ao_5b865fed70ec409a9a00671e5eb93506.jpg"
                    alt="First slide"
                    style={{ height: '600px' }}
                />
            </div>
            <div className="container" style={{ maxWidth: '100%' }}>
                <h3>Áo</h3>
                <Container />

            </div>
            <div className="ao-pagination">
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

export default AoPage;
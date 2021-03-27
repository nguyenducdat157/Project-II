import React from 'react';
import Footer from '../../components/Footer';
import HeaderItem from '../../components/Header';
import Slice from '../../components/Slice';
import Container from '../../components/ContainerItem'
const HomePage = () => {
    return (
        <>
            <section>
                <header>
                    <HeaderItem />
                </header>
            </section>
            <section>
                <Slice />
                <div className="container" style={{ maxWidth: '90%' }}>
                    <h3>New arrival</h3>
                    <Container />
                    <h3>Sale 50%</h3>
                    <Container />
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </>
    )
}

export default HomePage
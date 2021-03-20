import React from 'react';
import { Carousel } from 'react-bootstrap';
import './slice.css';
const Slice = () => {
    return (
        <div className="slice-component">


            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100 h-custom"
                        src="https://file.hstatic.net/200000201725/collection/ao_5b865fed70ec409a9a00671e5eb93506.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100 h-custom"
                        src="https://file.hstatic.net/200000201725/collection/quan_jean_3bbe6a0fe09e4f25ab5649fe9935d7b3.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-custom"
                        src="https://file.hstatic.net/200000201725/collection/giay_7ed451fb80cd456192e2279035f6cc19.png"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Slice;
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white">

            <div className="container p-4">

                <section className="mb-4">

                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-facebook-f" /></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-twitter" /></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-google" /></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-instagram" /></a>
                </section>

                <section className="mb-4">
                    <p>
                        Thank you
                    </p>
                </section>
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">nguyenducdat</a>
            </div>
            {/* Copyright */}
        </footer>
    )
}

export default Footer;
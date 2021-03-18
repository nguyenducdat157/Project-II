import React from 'react';
import NavbarItem from '../Navbar';
import { Image, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './header.css';
const HeaderItem = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <a href="">
                    <Image src="https://file.hstatic.net/200000201725/file/logo300x70_edf9c9c72acb48f791fe052257311c5c.png" fluid />
                </a>
            </div>

            <div className="header-navbar">
                <NavbarItem />
            </div>
            <div className="header-icon">
                <div className="search-icon">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light"><i class="fas fa-search"></i></Button>
                    </Form>
                </div>
                <div className="account-icon">
                    <Nav.Link href="/account"><i class="fas fa-user-circle"></i></Nav.Link>
                </div>
                <div className="cart-icon">
                    <Nav.Link href="/cart"><i class="fas fa-shopping-cart"></i></Nav.Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderItem;
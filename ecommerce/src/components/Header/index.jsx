import React from 'react';
import NavbarItem from '../Navbar';
import { Image, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';


const HeaderItem = () => {
    return (
        <>
            <div className="header" >
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
                            <Button variant="outline-light"><FontAwesomeIcon icon={faSearch} style={{ color: 'black' }} /></Button>
                        </Form>
                    </div>
                    <div className="account-icon">
                        <Nav.Link href="/account"><FontAwesomeIcon icon={faUserCircle} style={{ color: 'black' }} /></Nav.Link>
                    </div>
                    <div className="cart-icon">
                        <Nav.Link href="/cart"><FontAwesomeIcon icon={faCartArrowDown} style={{ color: 'black' }} /></Nav.Link>
                    </div>
                </div>
            </div>
            <div className="header-line"><hr /></div>
        </>
    )
}

export default HeaderItem;
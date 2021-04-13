import React from 'react';
import NavbarItem from '../Navbar';
import { Image, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import CartDropdown from '../Cart-dropdown/cartList';
import Logo from '../../asset/logo.png';
const HeaderItem = (props) => {
    const login = props.login;
    // function HandleItems() {
    //     props.setHandleItems();
    // }
    return (
        <>
            <div className="header" >
                <div className="header-logo">
                    <a href="/">
                        <Image src={Logo} fluid />
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
                        <Nav.Link href={login ? "/account" : "/signin"}><FontAwesomeIcon icon={faUserCircle} style={{ color: 'black' }} /></Nav.Link>
                    </div>
                    <div className="cart-icon">
                        {/* <Nav.Link href="/cart"><FontAwesomeIcon icon={faCartArrowDown} style={{ color: 'black' }} /></Nav.Link> */}
                        <CartDropdown />
                    </div>
                </div>
            </div>
            <div className="header-line"><hr /></div>
        </>
    )
}

export default HeaderItem;
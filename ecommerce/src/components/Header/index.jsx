import React, { useEffect, useState } from 'react';
import NavbarItem from '../Navbar';
import { Image, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import CartDropdown from '../Cart-dropdown/cartList';
import Logo from '../../asset/logo.png';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { NavigateBefore } from '@material-ui/icons';

const HeaderItem = (props) => {
    const login = (localStorage.getItem('id') !== null);
    // function HandleItems() {
    //     props.setHandleItems();
    // }
    const userInfo = JSON.parse(localStorage.getItem('info'));

    const [searchKeyword, setSearchKeyword] = useState('');
    const [redirect, setRedirect] = useState(false);
    //const [url, setUrl] = useState("");

    const history = useHistory();
    const handleSearchInputChanges = (e) => {
        setSearchKeyword(e.target.value);
    }
    const submitSearchHandler = (e) => {
        e.preventDefault();
        console.log(searchKeyword);
        //const newUrl = '/search?keyword=' + searchKeyword.toString();
        // setUrl(newUrl);
        // console.log(history.location);
        const url = '/search?keyword=' + searchKeyword.toString();
        console.log(url);
        history.push(url);
        console.log(history.location);
        setRedirect(true);
        if (props.handleSubmit) {
            props.handleSubmit(url);
        }
    }





    // console.log(login)
    // console.log(userInfo)
    return (
        <>
            {
                redirect && <Redirect to={"/search" + history.location.search} />
            }

            <div className="header" >
                <div className="header-logo">
                    <a href="/">
                        <Image src={Logo} fluid />
                    </a>
                </div>

                <div className="header-navbar">
                    <NavbarItem role={userInfo && userInfo.role === 'admin' ? 'admin' : 'customer'}/>
                </div>
                  
                    <div className="header-icon">
                        <div className="search-icon">
                            <Form inline >
                                <FormControl
                                    id="auto"
                                    type="text"
                                    placeholder="T??m ki???m s???n ph???m, lo???i, h??ng,..."
                                    style={{ width: '18rem' }}
                                    className="mr-sm-2"
                                    onChange={handleSearchInputChanges}
                                // value={searchKeyword}
                                />
                                <Button variant="outline-light"
                                    onClick={submitSearchHandler}
                                    type="submit"
                                ><FontAwesomeIcon icon={faSearch} style={{ color: 'black' }} /></Button>
                            </Form>

                        </div>
                        <div className="account-icon" style={{ marginRight: '1rem', fontSize: '1rem' }}>
                            <a href={login ? "/account" : "/signin"}><FontAwesomeIcon icon={faUserCircle} style={{ color: 'black' }} /></a>

                        </div>
                        <div className="cart-icon">

                            <a href="/cart" style={{ display: 'inline-block', marginLeft: '1rem', fontSize: '1rem' }}><FontAwesomeIcon icon={faShoppingCart} style={{ color: 'black' }} /></a>
                            {/* <CartDropdown /> */}
                        </div>
                    </div>

                    
            </div>
            <div className="header-line"><hr /></div>
        </>
    )
}

export default HeaderItem;
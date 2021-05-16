import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Redirect, Route } from 'react-router-dom';
import './category.css';
const CategoryItem = (props) => {
    const [itemName, setItemName] = useState('');
    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    function selectCategory(type) {
        switch (type) {
            case 'Áo':
                return "ao";

            case 'Quần':
                return "quan";

            case 'Phụ Kiện':
                return "accessory";

            case 'Quần Jeans':
                return "quan-jeans";

            case 'Quần shorts':
                return "quan-shorts";

            case 'Quần Tây':
                return "quan-tay";

            case 'Áo sơ mi':
                return 'ao-somi';

            case 'Áo Thun':
                return 'ao-thun';

            case 'Áo Polo':
                return 'ao-polo';

            case 'Balo-Túi xách':
                return 'accessory-bag';

            case 'Giày':
                return 'accessory-shoes';

            case 'Phụ kiện khác':
                return 'accessory-others';
        }

    }



    // function HandleItems() {
    //     props.setHandleItems();
    // }

    const listItems = props.children.map((element) =>
        <Dropdown.Item href={"/collections/" + selectCategory(element)}   >{element}</Dropdown.Item>

    );

    // const listItems = props.children.map((element) =>
    //     <Dropdown.Item ><Redirect to={"/collections/" + selectCategory(element)}> {element}</Redirect></Dropdown.Item>

    // );

    return (
        <div className="dropdown">
            <Dropdown
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <a className="link-primary" href={"/collections/" + selectCategory(props.name)} replace  >{props.name}</a>
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    {listItems}

                </Dropdown.Menu>
            </Dropdown>
        </div >
    )
}
export default CategoryItem;
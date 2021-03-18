import React, { useSate } from 'react';
import { Dropdown } from 'react-bootstrap';
import './category.css';
const CategoryItem = (props) => {
    //const [itemName, setItemName] = useState('');
    const listItems = props.children.map((element) =>
        <Dropdown.Item href="">{element}</Dropdown.Item>
    );
    return (
        <div className="dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    {listItems}

                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
export default CategoryItem;
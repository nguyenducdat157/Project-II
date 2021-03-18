import React from 'react';
import { Dropdown } from 'react-bootstrap';
const CategoryItem = () => (
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sản Phẩm
  </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Quần </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Áo</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Phụ Kiện</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
)
export default CategoryItem;
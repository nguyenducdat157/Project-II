import React from "react"
import { Navbar, Nav } from 'react-bootstrap';
import CategoryItem from "../Category_dropdown";
const NavbarItem = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto navbar-item">
        <CategoryItem />
        <Nav.Link href="/sale" >Sale</Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default NavbarItem;
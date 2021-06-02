import React from "react"
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import CategoryItem from "../Category_dropdown";
// const NavbarItem = () => (
//   <Navbar expand="lg" id="navbar">
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="mr-auto navbar-item">
//         <CategoryItem name="Quần" children={['Quần Jeans', 'Quần shorts', 'Quần Tây']} />
//         <CategoryItem name="Áo" children={['Áo sơ mi', 'Áo Polo', 'Áo Thun']} />
//         <CategoryItem name="Phụ Kiện" children={['Balo-Túi xách', 'Giày', 'Phụ kiện khác']} />
//       </Nav>
//     </Navbar.Collapse>
//   </Navbar>
// )
const NavbarItem = (props) => {
  // function HandleItems() {
  //   props.setHandleItems();
  // }

  const handleLogOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    localStorage.removeItem('wishlist');
    window.location.href = '/';
  } 
  return (
    <Navbar expand="lg" id="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto navbar-item">
          {props.role === 'admin' ? 
          <>
            <Nav.Link href="/admin/listOrder"> Đơn hàng </Nav.Link>
            <Nav.Link href="/admin/listProduct"> Sản phẩm</Nav.Link>
            <Nav.Link href="#"> Khách hàng</Nav.Link>
            <Nav.Link onClick={handleLogOut}> Đăng xuất</Nav.Link>
          </>
          :
          <> 
            <CategoryItem name="Quần" children={['Quần Jeans', 'Quần shorts', 'Quần Tây']} />
            <CategoryItem name="Áo" children={['Áo sơ mi', 'Áo Polo', 'Áo Thun']} />
            <CategoryItem name="Phụ Kiện" children={['Balo-Túi xách', 'Giày', 'Phụ kiện khác']} />
          </>}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavbarItem;
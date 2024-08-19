import React from 'react';
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap';
import './Navbar.css'; // Import your custom CSS for styling

const CustomNavbar = () => {
  return (
    <><div className="top-bar">
    <span>helpdesk@dryklin.com</span>
    <span>234 700 000 9274</span>
    <span>Customer Support</span>
  </div>
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="navbar-logo">
        <Image
                  src="./Dryklin/PNGS/12.png"
                 style={ { width : '80px' , height : '20px'}}
                  />
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/" className='nav-item'>Home</Nav.Link>
            <Nav.Link href="/about" className='nav-item'>About Us</Nav.Link>
            <Nav.Link href="/contact" className='nav-item'>Contact Us</Nav.Link>
          </Nav>
          <Nav className="ml-auto profile-dropdown">
            <NavDropdown
              alignRight
              title={
                <Image
                  src="./profile.png"
                  roundedCircle
                  className="profile-image"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#wallet">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/wallet">Wallet</NavDropdown.Item>
              <NavDropdown.Item href="#orders">Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/signin'>Login</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default CustomNavbar;

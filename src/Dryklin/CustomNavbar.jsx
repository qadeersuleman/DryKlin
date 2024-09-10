import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Navbar.css'; // Import your custom CSS for styling

const CustomNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage once when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('user'); // Remove the user data from localStorage
    Swal.fire({
      title: 'Success!',
      text: 'User Logged in Successfully!',
      icon: 'success',
      customClass: {
        popup: 'my-swal',
      },
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: true,
      willClose: () => {
        navigate('/signin');
      }
    });
  };

  return (
    <>
      <div className="top-bar pc-view">
        <span>helpdesk@dryklin.com</span>
        <span>234 700 000 9274</span>
        <span>Customer Support</span>
      </div>
      <div className="top-bar mobile-view" style={{ display: 'none' }}>
        <span style={{ fontSize: '11px' }}>helpdesk@dryklin.com</span>
        <span style={{ fontSize: '11px' }} className="mx-3">
          234 700 000 9274
        </span>
        <span style={{ fontSize: '11px' }}>Customer Support</span>
      </div>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="navbar-logo">
            <Image src="./Dryklin/PNGS/12.png" style={{ width: '80px', height: '20px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="nav-item">Home</Nav.Link>
              <Nav.Link href="/aboutus" className="nav-item">About Us</Nav.Link>
              <Nav.Link href="/contactus" className="nav-item">Contact Us</Nav.Link>
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
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/wallet">Wallet</NavDropdown.Item>
                <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                {user ? (
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/signin">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Static Bar for Not Logged-in Users */}
      {!user && (
        <Navbar fixed="bottom" bg="dark" variant="dark" className="justify-content-center">
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '60px' }}>
          <Navbar.Text className="text-center" style={{ color: 'white' }}>
            <i className="fas fa-user-circle mx-2"></i> Please{' '}
            <Link to="/signup" style={{ color: '#ffc107', textDecoration: 'none' }}>
             SignUp
            </Link>{' '}
            to access full features.
          </Navbar.Text>
        </Container>
      </Navbar>
      
      )}
    </>
  );
};

export default CustomNavbar;

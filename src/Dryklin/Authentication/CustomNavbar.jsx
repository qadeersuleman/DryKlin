import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Navbar.css"; // Import your custom CSS for styling

const CustomNavbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Spinner state
  const navigate = useNavigate();

  // Fetch user data from localStorage once when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    setLoading(true); // Show spinner

    // Wait for 3 seconds before showing SweetAlert
    setTimeout(() => {
      setLoading(false); // Hide spinner

      Swal.fire({
        title: "Success!",
        text: `${
          user.first_name + " " + user.last_name
        } Logged Out Successfully!`,
        icon: "success",
        customClass: {
          popup: "my-swal",
        },
        confirmButtonText: "OK",
        confirmButtonColor: "#e65c00",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        willClose: () => {
          navigate("/signin");
        },
      });

      localStorage.removeItem("token"); // Remove the token from localStorage
      localStorage.removeItem("user"); // Remove the user data from localStorage
    }, 2000); // Delay for 3 seconds
  };

  return (
    <>
      <div className="top-bar">
        <div>
          <span className="txt-chng">
            {" "}
            <i className="fas fa-envelope head-icon" style={{ marginRight: "8px" }}></i>
            helpdesk@dryklin.com
          </span>
          <span className="txt-chng" style={{ marginLeft: "20px" }}>
            <i className="fas fa-phone-alt head-icon" style={{ marginRight: "8px" }}></i>
            234 700 000 9274
          </span>
        </div>
        <span className="txt-chng customers"><i className="fas fa-user-tie head-icon" style={{ marginRight: "8px" }}></i>Customer Support</span>
      </div>

      <Navbar expand="lg" className="custom-navbar sticky-top">
        <Container>
          <Navbar.Brand href="#home" className="navbar-logo">
            <Image
              src="./Dryklin/PNGS/12.png"
              style={{ width: "80px", height: "20px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="nav-item">
                Home
              </Nav.Link>
              <Nav.Link href="/aboutus" className="nav-item">
                About Us
              </Nav.Link>
              <Nav.Link href="/contactus" className="nav-item">
                Contact Us
              </Nav.Link>
              <Nav.Link href="/wallet" className="nav-item">
                Profile
              </Nav.Link>
              <Nav.Link href="/wallet" className="nav-item">
                Wallet{" "}
              </Nav.Link>
              <Nav.Link href="/orders" className="nav-item">
                Orders
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto profile-dropdown">
              {user ? (
                <Button
                  onClick={handleLogout}
                  className="bg-orange auth-btns"
                  style={{ border: "none" }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Button>
              ) : (
                <Button
                  className="bg-orange auth-btns"
                  href="/signin"
                  style={{ border: "none" }}
                >
                  <i className="fas fa-sign-in-alt "></i> Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {loading && (
        <div className="spinner-overlay">
          <Spinner animation="border" className="spinner-center text-orange" />
        </div>
      )}
    </>
  );
};

export default CustomNavbar;

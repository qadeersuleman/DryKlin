import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import AddressManagement from "../Request/AddressManagement";
import Profile from "./Profile";
import "./Wallet.css";

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // Set to null by default
  const baseUrl = "https://dryklins-1a9d97937409.herokuapp.com"; // Adjust as needed
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } else {
          // Fetch user data from backend if not in localStorage
          const response = await axios.get(`${baseUrl}/api/user/`);
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [baseUrl]);
  
  // Cache busting: append a timestamp or unique ID to the image URL to force reload
  const getProfileImageUrl = (imageUrl) => {
    return `${imageUrl}?t=${new Date().getTime()}`;
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      // Navigate to the homepage when clicking on the Home button
      navigate('/');
    } else {
      setActiveButton(buttonNumber);
      setSidebarOpen(false); // Close sidebar on button click
    }
  };

  const getButtonStyle = (buttonNumber) => {
    return {
      backgroundColor: activeButton === buttonNumber ? "#e86317" : "white",
      color: activeButton === buttonNumber ? "white" : "black",
    };
  };

  return (
    <Container fluid className="p-3">
      {user ? (
        <Row>
          {/* Sidebar for PC View */}
          <Col
            md={2}
            className="vh-100 p-0 full-sidebar d-none d-md-block"
            style={{
              borderRight: "1px solid #c5c5c5",
              position: "fixed",
              left: 0,
              top: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="logo mb-4 text-center">
              <Link to="/">
                <Image
                  src="/Dryklin/PNGS/12.png"
                  alt="DryKlin Logo"
                  className="wallet-img"
                />
              </Link>
            </div>
            <ListGroup className="w-100 flex-grow-1">
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item"
                onClick={() => handleButtonClick(1)}
                style={getButtonStyle(1)}
              >
                <i className="fa fa-home mr-2 px-2"></i> Home
              </ListGroup.Item>
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item"
                onClick={() => handleButtonClick(2)}
                style={getButtonStyle(2)}
              >
                <i className="fa fa-map-marker mr-2 px-2"></i> Address Management
              </ListGroup.Item>
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item"
                onClick={() => handleButtonClick(3)}
                style={getButtonStyle(3)}
              >
                <i className="fa fa-user mr-2 px-2"></i> Account
              </ListGroup.Item>
            </ListGroup>
            <div className="profile-section mx-2 mb-3">
              <img
                src={user.profile_image ? `${baseUrl}${user.profile_image}` : "/girls.jpeg"}
                alt="user"
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px" }}
              />
              <div className="ml-3">
                <span className="d-block user-name mx-3">
                  <b>{user.first_name} {user.last_name}</b>
                </span>
                <span className="d-block welcome-text px-2" style={{ fontSize: "12px" }}>
                  {user.email}
                </span>
              </div>
            </div>
          </Col>

          {/* Sidebar for Mobile View */}
          <Col
            md={3}
            lg={2}
            className={`sidebar-container ${sidebarOpen ? "open" : ""} d-md-none`}
            style={{ borderRight: "1px solid #c5c5c5", position: "fixed", left: 0, top: 0 }}
            ref={sidebarRef}
          >
            <div className="logo mb-4 text-center">
              <Link to="/">
                <Image
                  src="/Dryklin/PNGS/12.png"
                  alt="DryKlin Logo"
                  className="wallet-img"
                />
              </Link>
            </div>
            <ListGroup className="w-100">
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item"
                onClick={() => handleButtonClick(1)}
                style={getButtonStyle(1)}
              >
                <i className="fa fa-home mr-2 px-2"></i> Home
              </ListGroup.Item>
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item"
                onClick={() => handleButtonClick(2)}
                style={getButtonStyle(2)}
              >
                <i className="fa fa-map-marker mr-2 px-2"></i> Address Management
              </ListGroup.Item>
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item"
                onClick={() => handleButtonClick(3)}
                style={getButtonStyle(3)}
              >
                <i className="fa fa-user mr-2 px-2"></i> Account
              </ListGroup.Item>
            </ListGroup>
            <Button className="sidebar-close-btn" onClick={toggleSidebar}>
              <i className="fa fa-times"></i>
            </Button>
            <div className="profile-section mx-2 mb-3">
              <img
                src={user.profile_image ? `${baseUrl}${user.profile_image}` : "/girls.jpeg"}
                alt="user"
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px" }}
              />
              <div className="ml-3">
                <span className="d-block user-name mx-3">
                  <b>{user.first_name} {user.last_name}</b>
                </span>
                <span className="d-block welcome-text px-2" style={{ fontSize: "12px" }}>
                  {user.email}
                </span>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }} sm={12}>
            <Button
              className="sidebar-toggle-btn d-md-none bg-orange"
              style={{ border: "none", display: sidebarOpen ? 'none' : 'block' }}
              onClick={toggleSidebar}
            >
              <i className="fa fa-bars text-light bg-orange"></i>
            </Button>
            <div>
              {/* Display Home by default */}
              {activeButton === null && <Home />}
              {activeButton === 2 && <AddressManagement />}
              {activeButton === 3 && <Profile />}
            </div>
          </Col>
        </Row>
      ) : (
        <div className="my-5 mx-5">
          <h2>
            Login to view this page
            <span>
              <Link to="/signin"> Login</Link>
            </span>
          </h2>
        </div>
      )}
    </Container>
  );
};

export default Wallet;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import "./Wallet.css";
import Profile from "./Profile";
import Home from "./Home";
import AddressManagement from "../Request/AddressManagement";
import { Link } from "react-router-dom";

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const getButtonStyle = (buttonNumber) => {
    return {
      backgroundColor: activeButton === buttonNumber ? "#e86317" : "white",
      color: activeButton === buttonNumber ? "white" : "black",
    };
  };

  return (
    <Container fluid className="p-3" >
      {user ? (
        <Row>
          {/* Sidebar */}
          <Col
            md={3}
            lg={2}
            className={`sidebar-container ${sidebarOpen ? "open" : ""}`}
            style={{ borderRight: "1px solid #c5c5c5" }}
          >
            <div className="logo mb-4 text-center">
              <Link to="/">
              <Image
                src="/Dryklin/PNGS/12.png"
                alt="DryKlin Logo"
                className="wallet-img pl-2"

              />
              </Link>
            </div>
            <ListGroup className="w-100">
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item "
                onClick={() => handleButtonClick(1)}
                style={getButtonStyle(1)}
              >
                <i className="fa fa-home mr-2 px-2"></i> Home
              </ListGroup.Item>
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item "
                onClick={() => handleButtonClick(2)}
                style={getButtonStyle(2)}
              >
                <i className="fa fa-map-marker mr-2 px-2"></i> Address Management
              </ListGroup.Item>
              <ListGroup.Item
                className="d-flex justify-content-start align-items-center sidebar-item "
                onClick={() => handleButtonClick(3)}
                style={getButtonStyle(3)}
              >
                <i className="fa fa-user mr-2 px-2"></i> Account
              </ListGroup.Item>
            </ListGroup>
            <hr className="profile-section" />
            <div className="d-flex align-items-center mx-2">
              <img
                src="/girls.jpeg"
                alt="user"
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px" }}
              />
              <div className="ml-3">
                <span className="d-block user-name sidebar-profile">
                  {user ? (
                    <b>
                      {user.first_name} {user.last_name}
                    </b>
                  ) : (
                    <b>James Macintosh</b>
                  )}
                </span>
                {user ? (
                  <span
                    className="d-block welcome-text sidebar-profile"
                    style={{ fontSize: "12px" }}
                  >
                    {user.email}
                  </span>
                ) : (
                  <span
                    className="d-block welcome-text sidebar-profile"
                    style={{ fontSize: "12px" }}
                  >
                    James@Macintosh.com
                  </span>
                )}
              </div>
            </div>
            <Button className="sidebar-close-btn" onClick={toggleSidebar}>
              <i className="fa fa-times"></i>
            </Button>
          </Col>

          <Col
            md={2}
            className=" vh-100 p-0 full-sidebar"
            style={{ borderRight: "1px solid #c5c5c5", display: "none" }}
          >
            <div className="logo mb-4">
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
            <div className="d-flex align-items-center profile-section mx-2">
              <img
                src="/girls.jpeg"
                alt="user"
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px" }}
              />
              <div className="ml-3">
                <span className="d-block user-name mx-3">
                  {user ? (
                    <b>
                      {user.first_name} {user.last_name}
                    </b>
                  ) : (
                    <b>James Macintosh</b>
                  )}
                </span>
                {user ? (
                  <span
                    className="d-block welcome-text px-2"
                    style={{ fontSize: "12px" }}
                  >
                    {user.email}
                  </span>
                ) : (
                  <span
                    className="d-block welcome-text px-2"
                    style={{ fontSize: "12px" }}
                  >
                    James@Macintosh.com
                  </span>
                )}
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} sm={12}>
            <Button
              className="sidebar-toggle-btn d-md-none bg-orange"
              style={{ border: "none" }}
              onClick={toggleSidebar}
            >
              <i className="fa fa-bars text-light bg-orange"></i>
            </Button>
            <div>
              {activeButton === 1 && <Home />}
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

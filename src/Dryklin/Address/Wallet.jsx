import React, { useState } from "react";
import WashBtn from "../WashBtn"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import "./Wallet.css";

const Wallet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  const [showFlow, setShowFlow] = useState(false);

  const handleRequestPickupClick = () => {
    setShowFlow(true); // This triggers the MainFlow component
  };

  return (
    <Container fluid className="p-3">
      <Row>
        {/* Sidebar */}
        <Col
          md={3}
          lg={2}
          className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}
          style={{ borderRight: "1px solid #c5c5c5" }}
        >
          <div className="logo mb-4 text-center">
          <Image
              src="/Dryklin/PNGS/12.png"
              alt="DryKlin Logo"
              className="wallet-img pl-2"
            />
          </div>
          <ListGroup className="w-100">
            <ListGroup.Item className="d-flex justify-content-start align-items-center sidebar-item">
              <i className="fa fa-home mr-2 px-2"></i> Home
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-start align-items-center sidebar-item">
              <i className="fa fa-map-marker mr-2 px-2"></i> Address Management
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-start align-items-center sidebar-item">
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
                <b>James Macintosh</b>
              </span>
              <span
                className="d-block welcome-text sidebar-profile"
                style={{ fontSize: "12px" }}
              >
                James@Macintosh.com
              </span>
            </div>
          </div>
          <Button
            className="sidebar-close-btn"
            onClick={toggleSidebar}
          >
            <i className="fa fa-times"></i>
          </Button>
        </Col>

        <Col
          md={2}
          className=" vh-100 p-0 full-sidebar"
          style={{ borderRight: "1px solid #c5c5c5" , display : "none"} }
          
        >
          <div className="logo mb-4">
            <Image
              src="/Dryklin/PNGS/12.png"
              alt="DryKlin Logo"
              className="wallet-img"
            />
          </div>
          <ListGroup className="w-100">
            <ListGroup.Item className="d-flex justify-content-start align-items-center sidebar-item">
              <i className="fa fa-home mr-2 px-2"></i> Home
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-start align-items-center sidebar-item">
              <i className="fa fa-map-marker mr-2 px-2"></i> Address Management
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-start align-items-center sidebar-item">
              <i className="fa fa-user mr-2 px-2"></i> Account
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex align-items-center profile-section mx-2">
              <img src="/girls.jpeg" alt="user" className="rounded-circle mb-2" style={ {width : "60px", height : "60px"} } />
              <div className="ml-3">
              <span className="d-block user-name">
                  <b>James Macintosh</b>
                </span>
                <span className="d-block welcome-text px-2" style={ { fontSize : "12px"}}>James@Macintosh.com</span>
              </div>
            </div>
        </Col>



        {/* Main Content */}
        <Col md={9} lg={10} sm={12} className="main-content">
          {/* Show toggle button only on mobile */}
          <Button
            className="sidebar-toggle-btn d-md-none bg-orange"
            style={ {border : "none"}}
            onClick={toggleSidebar}
          >
            <i className="fa fa-bars text-light bg-orange"></i>
          </Button>
          <div className="d-flex justify-content-between align-items-center p-3 wallet-main">
            <div className="d-flex align-items-center">
              <img src="/girls.jpeg" alt="user" className="rounded-circle mb-2" style={ {width : "60px", height : "60px"} } />
              <div className="ml-3">
                <span className="d-block welcome-text">Welcome 👏</span>
                <span className="d-block user-name">
                  <b className="px-2">James Macintosh</b>
                </span>
              </div>
            </div>
            <Button className="wallet-btn " onClick={handleRequestPickupClick}>
              Request Pickup <i className="fas fa-arrow-right"></i>
            </Button>
          
                    {showFlow && <WashBtn openFlow={showFlow} />} 
          </div>
          <Row>
            <Col md={9} sm={12}>
              <Card className="mb-3 card-back">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="balance-type">
                      Wallet Balance <i className="fas fa-eye-slash"></i>
                    </span>
                    <h3>₦53,228.00</h3>
                  </div>
                  <Button className="btn-click bg-orange">
                    <i className="fas fa-plus mx-1 "></i>Add Money
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={12}>
              <Card className="mb-3 card-back">
                <Card.Body>
                  <div>
                    <p className="balance-type">Your Location</p>
                    <p style={{ marginTop: "-15px" }}>
                      <i
                        className="fa fa-map-marker"
                        style={{ paddingRight: "10px" }}
                      ></i>
                      <b>Bembo Street, Ibadan</b>
                      
                    </p>
                    <p
                      className="text-orange balance-type"
                      style={{ marginTop: "-15px", marginBottom: "0px" }}
                    >
                      Change Locations
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="p-3 transaction-history-card">
            <h5>History</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Description</span>
                <span>Status</span>
                <span>Date</span>
              </ListGroup.Item>
              {[
                {
                  description: "Free Pickup",
                  status: "Ongoing",
                  date: "Dec 30, 09:42 PM",
                },
                {
                  description: "Free Pickup",
                  status: "Successful",
                  date: "Dec 30, 09:42 PM",
                },
                // ...more items
              ].map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{item.description}</span>
                  <span
                    className={
                      item.status === "Ongoing"
                        ? "text-warning"
                        : "text-success"
                    }
                  >
                    {item.status}
                  </span>
                  <span>{item.date}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Wallet;

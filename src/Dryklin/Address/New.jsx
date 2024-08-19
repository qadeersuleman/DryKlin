import React from "react";
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
  return (
    <Container fluid className="p-3">
      <Row>
        {/* This col is sidebar */}
        <Col
          md={2}
          className=" vh-100 p-0"
          style={{ borderRight: "1px solid #c5c5c5" }}
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
                <span className="d-block welcome-text" style={ { fontSize : "12px"}}>James@Macintosh.com</span>
              </div>
            </div>
        </Col>

        {/* This is other dashboard part */}
        <Col md={10} xm={10} lg={10} sm={10}>
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
              <img src="/girls.jpeg" alt="user" className="rounded-circle mb-2" style={ {width : "60px", height : "60px"} } />
              <div className="ml-3">
                <span className="d-block welcome-text">Welcome 👏</span>
                <span className="d-block user-name">
                  <b>James Macintosh</b>
                </span>
              </div>
            </div>
            <Button className="btn-clicked bg-light">
              Request Pickup <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
          <Row>
            <Col className="" md={9}>
              <Card className="mb-3 card-back">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="balance-type">
                      Wallet Balance <i className="fas fa-eye-slash"></i>
                    </span>
                    <h3>₦53,228.00</h3>
                  </div>
                  <Button className="btn-click">
                    <i className="fas fa-plus mx-1 "></i>Add Money
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-3 card-back">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="balance-type">Your Location</p>
                    <p style={{ marginTop: " -15px" }}>
                      <i
                        className="fa fa-map-marker"
                        style={{ paddingRight: "10px" }}
                      ></i>
                      Bembo Street, Ibadan
                    </p>
                    <p
                      className="text-orange balance-type"
                      style={{ marginTop: " -15px", marginBottom: "0px" }}
                    >
                      Change Locations
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="p-3" style={ {marginRight : "315px"} }>
            <h5>History</h5>

            <ListGroup variant="flush">
            <ListGroup.Item
                  
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>Description</span>
                  <span>
                    Status
                  </span>
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
                {
                  description: "Free Pickup",
                  status: "Successful",
                  date: "Dec 30, 09:42 PM",
                },
                {
                  description: "Free Pickup",
                  status: "Successful",
                  date: "Dec 30, 09:42 PM",
                },
                {
                  description: "Free Pickup",
                  status: "Successful",
                  date: "Dec 30, 09:42 PM",
                },
                {
                    description: "Free Pickup",
                    status: "Successful",
                    date: "Dec 30, 09:42 PM",
                  },
                  {
                    description: "Free Pickup",
                    status: "Successful",
                    date: "Dec 30, 09:42 PM",
                  },
                  {
                    description: "Free Pickup",
                    status: "Successful",
                    date: "Dec 30, 09:42 PM",
                  },
                  {
                    description: "Free Pickup",
                    status: "Successful",
                    date: "Dec 30, 09:42 PM",
                  },
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
 
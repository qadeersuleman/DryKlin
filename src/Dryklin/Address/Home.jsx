import ModalFlowManager from "../Request/ModalFlowManager";
import { Button, Row, Col, Card, ListGroup, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import PaymentTypes from "./PaymentTypes";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);  // State to toggle balance visibility

  // Fetch user data from localStorage once when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch wallet data if user exists
  useEffect(() => {
    const fetchWalletData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get('https://dryklin-e853d5ecea30.herokuapp.com/api/wallet/', {
            params: { email: user.email },
          });
  
          console.log('API Response:', response.data);

if (response.data && response.data.wallet) {
  const walletData = response.data.wallet;  // Directly use the wallet amount

  // Set the wallet balance directly, since walletData is not an array
  setWalletBalance(walletData);  
} 
           else {
            console.error('Unexpected response structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching wallet data:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('User data not found in localStorage.');
      }
    };
  
    fetchWalletData();
  }, [user]);

  // Function to open the modal
  const handleShow = () => setShowModal(true);

  // Function to close the modal
  const handleClose = () => setShowModal(false);

  // Function to toggle wallet balance visibility
  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  // Function to open the location change modal
  const handleLocationShow = () => setShowLocationModal(true);

  // Function to close the location change modal
  const handleLocationClose = () => setShowLocationModal(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-3 wallet-main mt-3">
        <div className="d-flex align-items-center">
          <img
            src="/girls.jpeg"
            alt="user"
            className="rounded-circle mb-2"
            style={{ width: "60px", height: "60px" }}
          />
          <div className="ml-3">
            <span className="d-block welcome-text px-3">Welcome 👏</span>
            {user ? (
              <span className="d-block user-name">
                <b className="px-2">
                  {user.first_name} {user.last_name}
                </b>
              </span>
            ) : (
              <span className="d-block user-name">
                <b className="px-2">Haseeb Latif</b>
              </span>
            )}
          </div>
        </div>
        <ModalFlowManager />
      </div>
      <Row>
        <Col md={9} sm={12}>
          <Card className="mb-3 card-back">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <span className="balance-type">
                  Wallet Balance{" "}
                  <i 
                    className={`fas ${showBalance ? "fa-eye-slash" : "fa-eye"}`}
                    onClick={toggleBalanceVisibility}
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
                <h3 className="py-2">
                  {showBalance ? `₦${walletBalance}` : '*******'} {/* Toggle balance visibility */}
                </h3>
              </div>
              <Button className="btn-click bg-orange" onClick={handleShow}>
                <i className="fas fa-plus mx-1 "></i>Add Money
              </Button>
              <PaymentTypes show={showModal} handleClose={handleClose} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={12}>
          <Card className="mb-3 card-back">
            <Card.Body>
              <div>
                <p className="balance-type">Your Location</p>
                {user ? (
                  <>
                    <p style={{ marginTop: "-15px" }}>
                      <i
                        className="fa fa-map-marker"
                        style={{ paddingRight: "10px" }}
                      ></i>
                      <b>{user.state}</b>
                    </p>
                    <p
                      className="text-orange balance-type"
                      style={{ marginTop: "-15px", marginBottom: "0px", cursor: "pointer" }}
                      onClick={handleLocationShow}
                    >
                      Change Locations
                    </p>
                  </>
                ) : (
                  <p>No user data available.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for changing location */}
      <Modal show={showLocationModal} onHide={handleLocationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form or content to change location */}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New Location</Form.Label>
              <Form.Control type="text" value={"Ibadan Oyo State"} placeholder="Enter new location" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button className="bg-orange" style={{border : "none"}} onClick={handleLocationClose}>
            Save Location
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="p-3 transaction-history-card card-pc-view">
        <h5>History</h5>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>Description</span>
            <span style={{ paddingRight: "50px" }}>Status</span>
            <span style={{ paddingRight: "50px" }}>Date</span>
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
                  item.status === "Ongoing" ? "text-warning" : "text-success"
                }
              >
                {item.status}
              </span>
              <span>{item.date}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Card className="p-3 transaction-history-card card-mob-view" style={{ display: "none" }}>
        <h5>History</h5>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: "12px" }}>Description</span>
            <span style={{ fontSize: "12px", paddingRight: "50px" }}>Status</span>
            <span style={{ fontSize: "12px" }}>Date</span>
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
              <span style={{ fontSize: "12px" }}>{item.description}</span>
              <span
                className={
                  item.status === "Ongoing" ? "text-warning" : "text-success"
                }
                style={{ fontSize: "12px" }}
              >
                {item.status}
              </span>
              <span style={{ fontSize: "12px" }}>{item.date}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
};

export default Home;

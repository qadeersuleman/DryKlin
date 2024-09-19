import ModalFlowManager from "../Request/ModalFlowManager";
import {
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import PaymentTypes from "./PaymentTypes";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false); // State to toggle balance visibility
  const [orders, setOrders] = useState([]);

  // Fetch user data from localStorage once when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch wallet and order data if user exists
  useEffect(() => {
    const fetchWalletAndOrderData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            'https://dryklins-1a9d97937409.herokuapp.com/api/wallet/',
            { params: { email: user.email } }
          );
          console.log('API Response:', response.data);

          if (response.data.wallet) setWalletBalance(response.data.wallet);
          if (response.data.orders) setOrders(response.data.orders);
        } catch (error) {
          console.error('Error fetching wallet and order data:', error.message);
        }
      } else {
        console.error('User data not found in localStorage.');
      }
    };

    fetchWalletAndOrderData();
  }, [user]);

  // Toggle wallet balance visibility
  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  // Open and close modals
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleLocationShow = () => setShowLocationModal(true);
  const handleLocationClose = () => setShowLocationModal(false);

  // Format date and time
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-3 wallet-main mt-3">
        <div className="d-flex align-items-center">
          <img
            src={user?.profile_image ? `https://dryklins-1a9d97937409.herokuapp.com${user.profile_image}` : "/girls.jpeg"}
            alt="user"
            className="rounded-circle mb-2"
            style={{ width: "60px", height: "60px" }}
          />
          <div className="ml-3">
            <span className="d-block welcome-text px-3">Welcome 👏</span>
            <span className="d-block user-name">
              <b className="px-2">{user?.first_name} {user?.last_name || 'Haseeb Latif'}</b>
            </span>
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
                  Amount in Wallet{" "}
                  <i
                    className={`fas ${showBalance ? "fa-eye-slash" : "fa-eye"}`}
                    onClick={toggleBalanceVisibility}
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
                <h3 className="py-2">
                  {showBalance ? `₦${walletBalance}` : "*******"}{/* Toggle balance visibility */}
                </h3>
              </div>
              <Button className="btn-click bg-orange" onClick={handleShow}>
                <i className="fas fa-plus mx-1 "></i>Add Money
              </Button>
              <PaymentTypes show={showModal} handleClose={handleClose} />
            </Card.Body>
          </Card>

          {/* Virtual Account Information */}
          <Card className="mb-3 card-back d-flex">
  <Card.Body>
    <h5 className="balance-type">Virtual Account Details</h5>
    <Row className="d-flex justify-content-between">
      <Col xs={6} style={{paddingLeft : "20px"}}>
        <span className="mb-1" style={{fontSize : "15px"}}>
          <strong className="text-orange " style={{fontSize : "16px"}}>Account No:</strong> 988923782
        </span>
      </Col>
      <Col xs={6} className="text-right" style={{textAlign : "right",paddingRight : "30px"}}>
        <span style={{fontSize : "14px"}}>
          <strong className="text-orange" style={{fontSize : "16px"}}>Bank Name:</strong> Paystack-Titan
        </span>
      </Col>
    </Row>
  </Card.Body>
</Card>

        </Col>

        <Col md={3} sm={12}>
          <Card className=" card-back">
            <Card.Body>
              <div>
                <p className="balance-type">Your Location</p>
                {user ? (
                  <>
                    <p style={{ marginTop: "-15px" }}>
                      <i className="fa fa-location-arrow" style={{ paddingRight: "10px"}} aria-hidden="true"></i>
                      


                      <b>{user.state}</b>
                    </p>
                    <p className="text-orange balance-type" style={{ cursor: "pointer",marginTop : " -15px",marginBottom : "12px"
                     }} onClick={handleLocationShow}>
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
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New Location</Form.Label>
              <Form.Control type="text" value={"Ibadan Oyo State"} placeholder="Enter new location" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-orange" style={{ border: "none" }} onClick={handleLocationClose}>
            Save Location
          </Button>
        </Modal.Footer>
      </Modal>
{/* Pc View */}
      <Card className="p-3 transaction-history-card card-pc-view">
        <h5>History</h5>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span style={{fontWeight : "500"}}>S.No</span>
            <span style={{paddingRight : "10px",fontWeight : "500"}}>Description</span>
            <span style={{paddingRight : "120px",fontWeight : "500"}}>Status</span>
            <span style={{fontWeight : "500"}}>Date</span>
          </ListGroup.Item>
          {orders.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <span>{index}</span>
              <span>{capitalizeFirstLetter(item.delivery_type)}</span>
              <span className={item.is_completed ? "text-success" : "text-warning"}>
                {item.is_completed ? "Successful" : "Ongoing"}
              </span>
              <span>{formatDate(item.created_at)} - {formatTime(item.created_at)}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Card
        className="p-3 transaction-history-card card-mob-view"
        style={{ display: "none" }}
      >
        <h5>History</h5>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span style={{fontSize : " 14px"}}>S.No</span>
            <span style={{fontSize : " 14px", paddingRight : "10px"}}>Description</span>
            <span style={{paddingRight: "60px", fontSize : " 14px" }}>Status</span>
            <span style={{ paddingRight: "30px",fontSize : " 14px" }}>Date</span>
          </ListGroup.Item>
          {orders.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{index}</span>
              <span style={{marginLeft : "10px", fontSize : "14px"}}>{capitalizeFirstLetter(item.delivery_type)}</span>
              <span
                className={item.is_completed ? "text-success" : "text-warning"}
                style={{fontSize : "14px"}}
              >
                {item.is_completed ? "Successful" : "Ongoing"}
              </span>
              <span style={{fontSize : "14px"}}>{formatDate(item.created_at)}-{formatTime(item.created_at)}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
};

export default Home;

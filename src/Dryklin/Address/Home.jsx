import ModalFlowManager from "../Request/ModalFlowManager";
import { Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import FundWallet from "./FundWallet";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

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
            const walletData = response.data.wallet;
  
            // Check if walletData is an array and has elements
            if (Array.isArray(walletData) && walletData.length > 0) {
              setWalletBalance(walletData[0].balance);  // Adjust based on actual data structure
            } else {
              console.error('No wallet data available for this user.');
            }
          } else {
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
                  Wallet Balance <i className="fas fa-eye-slash"></i>
                </span>
                <h3>₦{walletBalance}</h3> {/* Display wallet balance dynamically */}
              </div>
              <Button className="btn-click bg-orange" onClick={handleShow}>
                <i className="fas fa-plus mx-1 "></i>Add Money
              </Button>
              <FundWallet show={showModal} handleClose={handleClose} />
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
                      style={{ marginTop: "-15px", marginBottom: "0px" }}
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
    </>
  );
};

export default Home;

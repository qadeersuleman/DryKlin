import React, { useState, useEffect } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import Address from "../Address/Address"
import axios from "axios"
const AddressManagement = () => {
  // Here we manage to get Addresses from django
  const [addresses, setAddresses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/addresses/', {
            params: { email: user.email },
          });
          setAddresses(response.data.addresses);
        } catch (error) {
          console.error('Error fetching addresses:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('User data not found in localStorage.');
      }
    };

    fetchAddresses();
  }, [user]);



  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleShow = () => setShowModal(true);

  // Function to close the modal
  const handleClose = () => setShowModal(false);
  return (
    <>
      <Row className="my-3">
        <Col className="d-flex align-items-center" >
          <h4 className="mb-0 mx-4 respo-text">Addres Management</h4>
        </Col>
        <div className="col-auto">
          <Button variant="outline-warning mx-3 respo-btn btn1" onClick={handleShow}>
            <i className="fas fa-plus" /> Add New Address
          </Button>
          <Address 
            show={showModal}
            handleClose={handleClose}
          />
        </div>
      </Row>

      <Container>
      <Row>
      {addresses.map((address, index) => (
        <Col md={6} sm={10} xm={10} lg={5} key={index}>
          <Card className="mb-3">
            <Card.Body className="justify-content-between align-items-center">
              <Row>
                <Col md={9}>
                  <h1 className="text-orange" style={{ fontSize: "16px" }}>
                    {address.address}
                  </h1>
                  <p>{address.city}</p>
                  <p style={{ fontSize: "12px", marginTop: "-10px" }}>
                    {user.phone_number} . {user.email}
                  </p>
                </Col>
                <Col md={3}>
                  <Button variant="link" className="text-decoration-none text-orange profile-change-btn" style={{ fontSize: "15px" }}>
                    <i className="fas fa-edit profile-change-btn" /> Edit
                  </Button>
                  <Button variant="link" className="text-decoration-none text-orange profile-change-btn" style={{ fontSize: "15px" }}>
                    <i className="fas fa-trash-alt profile-change-btn" /> Delete
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    
      </Container>
    </>
  );
};

export default AddressManagement;

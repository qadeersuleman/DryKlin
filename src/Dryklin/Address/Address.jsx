import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup, Container } from 'react-bootstrap';
import "./Address.css";

const Address = ({ show, handleClose, handleShowPaymentTypes }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([
    'Alfa Muibi Street, Sanyo, Ibadan',
    'Sanyo, Ibadan, Nigeria',
  ]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const simulatedAddress = `Current Location: ${lat}, ${lng}`;
          setAddress(simulatedAddress);
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Unable to fetch location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSelectSuggestion = (suggestion) => setAddress(suggestion);

  const handleRequestPickup = () => {
    alert(`Request Pickup at: ${address}`);
    handleClose(); // Close Address component modal
    handleShowPaymentTypes(); // Show PaymentTypes component modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container className='Address-modal '>
        <Modal.Body>
          <div className="form-heading">
            <button 
              style={{ border: "none" }} 
              className="bg-light" 
              onClick={handleClose}
            >
              <i className="fas fa-chevron-left pt-3"></i>
            </button>
            <span className="mx-3">Back</span>
            <h3 className='mt-2'>Add New Address</h3>
          </div>
          <Form.Group controlId="formAddress">
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={handleAddressChange}
            />

            <ListGroup className="mt-3">
              <ListGroup.Item 
                action 
                onClick={getCurrentLocation} 
                style={{ border: 'none' }} 
                className='py-3'
              >
                <i className="fas fa-location-crosshairs text-orange"></i> Use current location
              </ListGroup.Item>
              {suggestions.map((suggestion, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => handleSelectSuggestion(suggestion)}
                  style={{ border: 'none' }}
                >
                  <i className="fas fa-map-marker-alt text-orange" style={{ paddingRight: "10px" }}></i>{suggestion}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
        </Modal.Body>
        <Button 
          className="Request-button bg-orange" 
          onClick={handleRequestPickup}
        >
          Request Pickup
        </Button>
      </Container>
    </Modal>
  );
};

export default Address;

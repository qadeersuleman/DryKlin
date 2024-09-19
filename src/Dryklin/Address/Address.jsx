import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, ListGroup, Container } from 'react-bootstrap';
import "./Address.css";

const Address = ({ show, handleClose }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([
    'Alfa Muibi Street, Sanyo, Ibadan',
    'Sanyo, Ibadan, Nigeria',
  ]);
  const [csrfToken, setCsrfToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('https://dryklins-1a9d97937409.herokuapp.com/api/csrfs/');
        setCsrfToken(response.data.csrfToken);
        console.warn('CSRF Token:', response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error.response ? error.response.data : error.message);
      }
    };

    const fetchUserEmail = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email) {
        setEmail(user.email);
      } else {
        console.error('No user email found in localStorage');
      }
    };

    fetchCsrfToken();
    fetchUserEmail();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
              params: {
                q: `${latitude},${longitude}`,
                key: 'fdf3314d4bb34e7fa1a1a5ac632db75d',
              },
            });
            const results = response.data.results;
            if (results.length > 0) {
              setAddress(results[0].formatted);
            } else {
              setAddress('Address not found.');
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            setAddress('Error fetching address.');
          }
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

  const handleRequestPickup = async () => {
    try {
      const data = {
        email: email,   // Include the user's email from localStorage
        address: address,
      };
      const response = await axios.post(
        'https://dryklins-1a9d97937409.herokuapp.com/api/address/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );
      alert(`Successfully Request Pickup at: ${address}`);
      handleClose();
    } catch (error) {
      console.error('Error saving address:', error.response ? error.response.data : error.message);
      alert('Error saving address');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container className='Address-modal'>
        <Modal.Body>
          


          <div className="form-heading" style={{ textAlign: "left" }}>
            <button
              style={{ border: "none", backgroundColor: "white" }}
              onClick={handleClose}
            >
              <i className="fas fa-chevron-left pt-3"></i>
            </button>
            <span className="mx-3">Back</span>
            <h3
              style={{
                marginTop: "15px",
                marginBottom: "5px",
                fontSize: "20px",
              }}
              className="text-orange"
            >
              Add New Address
            </h3>
            
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
                style={{ border: 'none', fontSize : "13px",paddingTop : "15px" }} 
                className='sizeloc'
              >
                <i className="fas fa-location-crosshairs text-orange sizeloc" style={{ paddingRight: "10px" }}></i>  Use current location
              </ListGroup.Item>
              {suggestions.map((suggestion, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => handleSelectSuggestion(suggestion)}
                  style={{ border: 'none', fontSize : "13px" }}
                  className='sizeloc'
                >
                  <i className="fas fa-map-marker-alt text-orange sizeloc" style={{ paddingRight: "10px" }}></i>{suggestion}
                  
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
        </Modal.Body>
        <div className='btn-pc-view'>
        <Button 
          className="Request-button bg-orange" 
          onClick={handleRequestPickup}
          style={{fontSize : "14px", paddingInline : "120px"}}
        >
          Request Pickup
        </Button>
        </div>
        <div className='btn-mob-view' style={{display : "none"}}>

        </div>
      </Container>
    </Modal>
  );
};

export default Address;

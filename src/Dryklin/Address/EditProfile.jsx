import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const locations = [
  'Ibadan, Nigeria',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ'
];

const EditProfile = ({ show, handleNext, handleClose }) => {
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.warn(storedUser);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.put('http://localhost:8000/api/update_profile/', {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      });
      console.log(response.data);
      alert("Successfully Submitted Data");
      handleClose();  // Close modal on successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <button style={{ border: "none" }} className="bg-light" onClick={handleClose}>
            <i className="fas fa-chevron-left pt-1"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3 className='mt-2'>Edit Account</h3>
          <p style={{fontSize : "14px"}}>Edit your profile by clicking on the field you want to make changes to.</p>
        </div>
        <Form className='Request-form' style={{marginTop : "-40px"}} onSubmit={handleSubmit}>
          {/* First Name */}
          <Form.Group controlId="formFirstName">
            <Form.Label className="input-labels">First Name</Form.Label>
            {user && (
              <Form.Control
                type="text"
                name="first_name"
                value={user.first_name}
                placeholder="Enter first name"
                className="input-data"
                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              />
            )}
          </Form.Group>

          {/* Last Name */}
          <Form.Group controlId="formLastName">
            <Form.Label className="input-labels">Last Name</Form.Label>
            {user && (
              <Form.Control
                type="text"
                name="last_name"
                value={user.last_name}
                placeholder="Enter last name"
                className="input-data"
                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              />
            )}
          </Form.Group>

          <Form.Group controlId="formemail">
            <Form.Label className="input-labels">Email</Form.Label>
            {user && (
              <Form.Control
                type="text"
                name="email"
                disabled
                value={user.email}
                placeholder="Enter your email"
                className="input-data"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            )}
          </Form.Group>

          <Form.Group controlId="formphone">
            <Form.Label className="input-labels">Phone Number</Form.Label>
            {
              user ? <Form.Control
              type="text"
              name="phone"
              disabled
              value={user.phone_number}
              placeholder="Enter your phone number"
              className="input-data"
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            />
            : 
            <Form.Control
                type="text"
                name="phone"
                disabled
                placeholder="Enter your phone number"
                className="input-data"
                onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              />
            }
          </Form.Group>

          {/* Location Input */}
          <Form.Group controlId="formCityState">
            <Form.Label className="input-labels">Location</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-data"
            >
              <option value="" disabled>Select your location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="signup-button mt-2 bg-orange"
          >
            <i className='fa fa-check px-2'></i>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;

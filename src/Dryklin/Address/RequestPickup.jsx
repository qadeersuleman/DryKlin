import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RequestPickup = ({ handleNext }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
     // Move to the next step, which will show the PaymentTypes modal
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          
            <button style={{ border: "none" }} className="bg-light" onClick={handleClose}>
              <i className="fas fa-chevron-left pt-3"></i>
            </button>
          
          <span className="mx-3">Back</span>
          <h3 className='mt-2'>Request Pickup</h3>
          <p>Fill in your details below to request a pickup.</p>
        </div>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label className="input-labels">First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Enter first name"
              className="input-data"
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label className="input-labels">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Enter last name"
              className="input-data"
            />
          </Form.Group>

          <Form.Group controlId="formCityState">
            <Form.Label className="input-labels">City, State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Pickup Address"
              className="input-data"
            />
          </Form.Group>

          <Form.Group>
            <Form.Check type="checkbox" label="Save for future use" className='px-4' />
          </Form.Group>

          <Button 
            type="submit" 
            className="signup-button mt-5 bg-orange"
            onClick={handleNext}
          >
            Request Pickup
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestPickup;

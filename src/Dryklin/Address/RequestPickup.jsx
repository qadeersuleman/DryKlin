import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const RequestPickup = ({ handleNext }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    handleNext(); // Move to the next step
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Pickup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You are in a hurry and have your clothes packed already. Fill your details below to request for pickup.</p>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control type="text" placeholder="Enter pickup address" />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Save for future use" />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{ backgroundColor: '#ff6b00', borderColor: '#ff6b00' }}
          >
            Request Pickup
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestPickup;

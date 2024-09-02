import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CardPaymentModal({ show, handleClose }) {
  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <Button
            style={{ border: "none" }}
            className="bg-light "
            onClick={handleClose}
          >
            <i className="fas fa-chevron-left pt-1"></i>
          </Button>
          <span className="mx-3">Back</span>
          <h3 className="mt-3" style={{ fontSize: "18px" }}>
          Pay via Card
          </h3>
        </div>
        <Form>
          <Form.Group controlId="formCardholderName" className="mb-3">
            <Form.Label>Cardholder's name</Form.Label>
            <Form.Control type="text" placeholder="DAVID JORDAN" className='contact-input' />
          </Form.Group>

          <Form.Group controlId="formCardNumber" className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="7348-3421-8345-9081" className='contact-input' />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Form.Group controlId="formCardExpiry" className="mb-3" style={{ flex: 1, marginRight: '10px' }}>
              <Form.Label>Valid through</Form.Label>
              <Form.Control type="text" placeholder="09 / 22" className='contact-input' />
            </Form.Group>

            <Form.Group controlId="formCardCVV" className="mb-3" style={{ flex: 1 }}>
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" placeholder="142" className='contact-input'/>
            </Form.Group>
          </div>

        <Button
          type="submit"
          className="signup-button mt-2 bg-orange"
          onClick={handleClose}
        >
          Proceed to Payment

        </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default CardPaymentModal;

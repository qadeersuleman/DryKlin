import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function BankPaymentModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pay via Bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Direct Bank Payment: Make payments directly from your bank account. Choose from supported banks for a secure transaction.</p>
        <p>How it Works: On the next screen, select your bank, and you’ll be prompted to authorize the transaction via your bank’s app or USSD.</p>
        <p>Why Choose Bank Payment? No need to carry cards; just use your bank account for a simple and secure payment process.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Proceed to Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BankPaymentModal;

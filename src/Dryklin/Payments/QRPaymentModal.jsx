import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function QRPaymentModal({ show, handleClose }) {
  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <button
            style={{ border: "none" }}
            className="bg-light"
            onClick={handleClose}
          >
            <i className="fas fa-chevron-left pt-1"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3 className="mt-3" style={{ fontSize: "18px" }}>
          Pay via QR Code
          </h3>
          <p>Contactless Payment: Scan a QR code to complete your payment securely.</p>
        <p>How it Works: On the next screen, a QR code will be displayed. Use your banking app or any supported QR payment app to scan and authorize the payment.</p>
        <p>Why Choose QR Payment? Fast, secure, and perfect for on-the-go transactions, making payments as simple as scanning a code.</p>
        </div>
        <Button
          type="submit"
          className="signup-button mt-2 bg-orange"
          onClick={handleClose}
        >
          Proceed to Payment
        </Button>
      </Modal.Body>
    </Modal>
    </>
    
    
  );
}

export default QRPaymentModal;

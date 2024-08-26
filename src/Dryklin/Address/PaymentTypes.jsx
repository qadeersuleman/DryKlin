import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./PaymentTypes.css"
const PaymentTypes = ({ show, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState('Card');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const New = () => {
   alert(`Proceed with ${selectedOption}`, {handleClose});
   handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <Button style={{ border: "none", backgroundColor: "transparent" }} onClick={handleClose}>
            <i className="fas fa-chevron-left"></i>
          </Button>
          <span className="mx-3">Back</span>
          <h4 className="mt-2" style={{ color: '#ff6b00' }}>Pay Online</h4>
          <p>Choose your preferred means to pay online.</p>
        </div>
        <Form>
        <Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="fas fa-credit-card"></i>
                <span className="mx-2">Card</span>
              </div>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={selectedOption === 'Card'}
                onChange={handleOptionChange}
              />
            </div>
          </Form.Group>


          <Form.Group className='my-2'>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="fas fa-university"></i>
                <span className="mx-2">Bank Transfer</span>
              </div>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="Bank Transfer"
                checked={selectedOption === 'Bank Transfer'}
                onChange={handleOptionChange}
              />
            </div>
          </Form.Group>

          <Form.Group className='my-2'>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="fas fa-mobile-alt"></i>
                <span className="mx-2">USSD</span>
              </div>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="USSD"
                checked={selectedOption === 'USSD'}
                onChange={handleOptionChange}
              />
            </div>
          </Form.Group>

          <Form.Group className='my-2'>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="fas fa-qrcode"></i>
                <span className="mx-2">QR Code</span>
              </div>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="QR Code"
                checked={selectedOption === 'QR Code'}
                onChange={handleOptionChange}
              />
            </div>
          </Form.Group>
        </Form>
        <Button
          className="w-100 mt-3 mt-5 Payment-Type-btn"
          
          onClick={New}
        >
          Proceed to pay
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentTypes;

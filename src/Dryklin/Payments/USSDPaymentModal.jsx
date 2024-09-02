import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function USSDPaymentModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
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
        <Form.Group controlId="formMobileNetwork" style={{marginTop : "0px"}}>
            <Form.Label style={{fontSize : "14px"}}>Mobile Network</Form.Label>
            <Form.Control as="select" className='contact-input' style={{padding : "5px", fontSize : "13px"}}>
              <option>Choose your network</option>
              <option>MTN</option>
              <option>Airtel</option>
              <option>Glo</option>
              <option>9mobile</option>
              {/* Add more networks as needed */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label style={{fontSize : "14px"}}>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter your phone number" className='contact-input' style={{fontSize : "13px"}}/>
          </Form.Group>

          <Form.Group controlId="formUssdCode" >
            <Form.Label style={{fontSize : "14px"}}>USSD Code</Form.Label>
            <Form.Control type="text" value="*123*000#" readOnly className='contact-input' style={{fontSize : "13px"}}/>
            <Form.Text className="text-muted">
              Dial this code on your phone to proceed with the payment.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formAmount">
            <Form.Label style={{fontSize : "14px"}}>Amount</Form.Label>
            <Form.Control type="text" placeholder="Enter amount" className='contact-input' style={{fontSize : "13px"}}/>
          </Form.Group>

          <Form.Group controlId="formInstructions" className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Text className="text-muted">
              1. Dial the USSD code above on your mobile phone.<br />
              2. Follow the prompts to complete the payment.<br />
              3. You will receive a confirmation SMS once the payment is successful.
            </Form.Text>
          </Form.Group>

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
  );
}

export default USSDPaymentModal;

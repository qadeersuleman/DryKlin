import React,{useState} from 'react';
import { Modal, Button, Row, Col,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./RequestOrder.css"
const RequestOrder = ({ show, handleNext, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState('');


  const handleSelect = (option) => {
    setSelectedOption(option);
  };
    return (
        <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <Link to="/">
            <button
              style={{ border: "none", backgroundColor: "white" }}
              onClick={handleClose}
            >
              <i className="fas fa-chevron-left pt-3"></i>
            </button>
          </Link>
          <span className="mx-3">Back</span>
          <h3 className="mt-4">Order Summary</h3>
          <p style={{ fontSize: "14px" }}>
            check out the details of what you're paying below
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <span> Sub-total</span>
          <span className="fw-bold">₦13800</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Delivery Fee</span>
          <span className="fw-bold">₦800</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Service Charge</span>
          <span className="fw-bold">₦500</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <strong className="fw-bold">Total</strong>
          <strong className="text-orange">₦15100</strong>
        </div>

        <h3 className="text-orange" style={{ fontSize: "18px" }}>
          Choose payment method
        </h3>
        <div>
          <Row className='desktop-row'>
            <Col md={5} className='mx-4'>
            <Card
        onClick={() => handleSelect('normal')}
        className={`delivery-cards ${selectedOption === 'normal' ? 'selected' : ''}`}
      >
        <Row>
          <Col md={2} xm={2} className='mt-2 mx-3'>
          <div className="delivery-checkboxs" style={{width : "20px", height: "20px",marginLeft : "30px"}}>
          {selectedOption === 'normal' && <i className="fa fa-check"></i>}
        </div>
          </Col>
            <Col md={8}>
            <h3 style={{fontSize : "16px"}} className='pt-2'>Pay Now</h3>
            </Col>
        </Row>
        
      </Card>
            </Col>

            <Col md={5}>
            <Card
        onClick={() => handleSelect('express')}
        className={`delivery-cards ${selectedOption === 'express' ? 'selected' : ''}`}
      >
        <Row>
          <Col md={2} xm={2} sm={2} lg={2} className='mt-2 mx-3'>
          <div className="delivery-checkboxs" style={{width : "20px", height: "20px",marginLeft : "30px"}}>
          {selectedOption === 'express' && <i className="fa fa-check"></i>}
        </div>
          </Col>
            <Col md={8} xm={8} sm={8} lg={8}>
              <h3 style={{fontSize : "16px"}} className='pt-2 px-2'>Pay Now</h3>
            </Col>
        </Row>
        
      </Card>
            </Col>
          </Row>
          <div className="d-flex justify-content-between pt-3">
            <p style={{ fontSize: "13px" }}>
              By clicking on "Proceed", you agree to our
              <span className="text-orange">Terms of Use</span>
              and <span className="text-orange">Privacy Policy</span>.
            </p>
          </div>
        </div>
        <Button 
            type="submit" 
            className="signup-button mt-5 bg-orange"
            onClick={handleNext}
          >
            Pay Now
          </Button>
      </Modal.Body>
    </Modal>
    );
};

export default RequestOrder;

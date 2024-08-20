import React,{useState} from 'react';
import { Modal, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import "./RequestDelivery.css"
const RequestDelivery = ({ show, handleNext ,handleClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext(); // Move to the next step, which will show the next modal
      };
      const [selectedOption, setSelectedOption] = useState('');


  const handleSelect = (option) => {
    setSelectedOption(option);
  };
    return (
        <Modal show={show} onHide={handleClose} centered>
            
            <Modal.Body>
            <div className="form-heading">
          <button style={{ border: "none" }} className="bg-light" onClick={handleClose}>
            <i className="fas fa-chevron-left pt-1"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3 className=''>Available Delivery Mode</h3>
          <p>Select your prefered Delivery mode.</p>
        </div>

      <Card
        onClick={() => handleSelect('normal')}
        className={`delivery-card ${selectedOption === 'normal' ? 'selected' : ''}`}
      >
        <Row>
          <Col md={2} xm={2} className='mt-2 mx-3' >
          <div className="delivery-checkbox">
          {selectedOption === 'normal' && <i className="fa fa-check"></i>}
        </div>
          </Col>
            <Col md={8}>
            <div className="delivery-details">
          <h5 className="delivery-title" style={{fontSize : "18px"}}>Nornal Delivery</h5>
          <p className="delivery-info" style={{fontSize : "14px"}}>
            <i className="fa fa-info-circle"></i> Clothes are delivered within <span className="text-warning">3-5 Days</span>.
          </p>
        </div>
            </Col>
        </Row>
        
      </Card>

      <Card
        onClick={() => handleSelect('express')}
        className={`delivery-card ${selectedOption === 'express' ? 'selected' : ''}`}
      >
        <Row>
          <Col md={2} xm={2} sm={2} lg={2} className='mt-2 mx-3' >
          <div className="delivery-checkbox">
          {selectedOption === 'express' && <i className="fa fa-check"></i>}
        </div>
          </Col>
            <Col md={8} xm={8} sm={8} lg={8}>
            <div className="delivery-details">
          <h5 className="delivery-title" style={{fontSize : "18px"}}>Express Delivery</h5>
          <p className="delivery-info" style={{fontSize : "14px"}}>
            <i className="fa fa-info-circle"></i> Clothes are delivered within <span className="text-warning">24 hours</span>.
          </p>
        </div>
            </Col>
        </Row>
        
      </Card>
   



                <Form onSubmit={handleSubmit}>
          {/* Form fields go here */}

          <Button 
            type="submit" 
            className="signup-button mt-5 bg-orange"
          >
            Request Pickup
          </Button>
        </Form>
            </Modal.Body>
            
        </Modal>
    );
};

export default RequestDelivery;

import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BillingModal.css"
const BillingModal = ({ show, handleClose }) => {
    return (
   
        <Modal show={show} onHide={handleClose} centered >
        <Modal.Body>
        <div className="form-heading">
          <Link to="/">
              <button style={ {border : "none", backgroundColor : "white"}} onClick={handleClose}>
              <i className="fas fa-chevron-left pt-3"></i>
              </button>
              </Link>
              <span className="mx-3">Back</span>
            <h3 className='mt-4'>Order Summary</h3>
            <p  style={ {fontSize : "14px"}}>check out the details of what you're paying below</p>
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
          
            <h3 className='text-orange' style={ {fontSize : "18px"}}>Choose payment method</h3>
            <div>
            <Row>
                <Col md={5} className="mx-2">
                     <Button className='btn py-2 new-btn'><i className='fas fa-user px-1'></i>Log in</Button>
                </Col>
                <Col md={5} className="mx-2">
                     <Button className='btn py-2 new-btn'> Pay Now</Button>
                </Col>
            </Row>
            <div className="d-flex justify-content-between pt-3">
            <p style={ {fontSize : "13px"} }>
            By clicking on "Proceed", you agree to our 
            <span className="text-orange">Terms of Use</span>
             and <span className="text-orange">Privacy Policy</span>.
             </p>
            </div>
            </div>
        </Modal.Body>
       
      </Modal>
    );
  };
  
  export default BillingModal;
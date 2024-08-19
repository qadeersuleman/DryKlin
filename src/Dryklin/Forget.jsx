
import { Form, Button, Container, Row, Col, Image, } from 'react-bootstrap';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import { Link } from 'react-router-dom';


const Forget = () => {
  
  return (
    <><div className="top-bar">
    <span>helpdesk@dryklin.com</span>
    <span>234 700 000 9274</span>
    <span>Customer Support</span>
  </div>
    <Container fluid className="signup-container">
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-center img-container">
          <Image src="./girl.webp" fluid className="signup-image image" />
          <div className='text-overlay'>
            <p>Pickup - Wash - Iron - Package - Deliver <br /> All within 24 hours!!!</p>
          </div>
        </Col>
        <Col md={6} className="signup-form-container my-5">
          <div className="form-heading">
          <Link to="/">
              <button>
              <i className="fas fa-chevron-left pt-3"></i>
              </button>
              </Link>
              <span className="mx-3">Back</span>
            <h3 className='mt-2'>Forgot Password</h3>
            <p>Enter the email address linked to your account below to get a link to reset your password</p>
          </div>
          
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label className='input-labels'>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email address" className='input-data'/>
                </Form.Group>

                <Button variant="primary" type="submit" className="signup-button mt-5">
                  Send Link
                </Button>
              </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Forget;

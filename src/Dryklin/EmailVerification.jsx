
import { Form, Button, Container, Row, Col, Image, } from 'react-bootstrap';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import { Link } from 'react-router-dom';


const SigninForm = () => {
  
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
              <button style={ {border : "none", backgroundColor : "white"}}>
              <i className="fas fa-chevron-left pt-3"></i>
              </button>
              </Link>
              <span className="mx-3">Back</span>
            <h3 className='mt-2'>Email Authentication</h3>
            <p>Enter the 6-digit code code sent to the email addres you provided below for verification</p>
          </div>
          
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label className='input-labels'>One Time Password</Form.Label>
                  <Form.Control type="text" placeholder="Enter your email address" className='input-data'/>
                </Form.Group>

                <Button variant="primary" type="submit" className="signup-button mt-5">
                  Verify
                </Button>
              </Form>
            
          <p className="login-link">Didn't get the code? <Link to="/" className='px-2'>Resend 00 : 48</Link></p>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default SigninForm;

import { Form, Button, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/csrfs/');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/send-otp/',
        { email },
        { headers: { 'X-CSRFToken': csrfToken } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
  };

  return (
    <>
      <div className="top-bar">
        <span>helpdesk@dryklin.com</span>
        <span>234 700 000 9274</span>
        <span>Customer Support</span>
      </div>
      <Container fluid className="signup-container">
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center img-container forgot-pc">
            <Image src="./girl.webp" fluid className="signup-image image" />
            <div className='text-overlay'>
              <p>Pickup - Wash - Iron - Package - Deliver <br /> All within 24 hours!!!</p>
            </div>
          </Col>
          <Col md={6} className="signup-form-container my-5">
            <div className="form-heading">
              <Link to="/">
                <button style={{ border: "none", backgroundColor: "white" }}>
                  <i className="fas fa-chevron-left pt-3"></i>
                </button>
              </Link>
              <span className="mx-3">Back</span>
              <h3 className='mt-2'>Forgot Password</h3>
              <p>Enter the email address linked to your account below to get a link to reset your password</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label className='input-labels'>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  className='input-data'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="signup-button mt-5">
                Send OTP
              </Button>
              {message && <p>{message}</p>}
            </Form>
          </Col>
        </Row>
      </Container>

      <Container  className="forgot-mobile my-5 mx-1" style={{display : "none"}}>
            <div className="form-heading">
              <Link to="/">
                <button style={{ border: "none", backgroundColor: "white" }}>
                  <i className="fas fa-chevron-left pt-3"></i>
                </button>
              </Link>
              <span className="mx-3 text-orange " style={{fontSize : "20px", fontWeight : "00"}}>Forgot Password</span>
              
              <p className='pt-4' style={{fontSize : "14px"}}>Enter the email address linked to your account below to get a link to reset your password</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label className='input-labels fs-6 px-1 fw-normal'>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  className='input-data py-3'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </Form.Group>
              {message &&
              <Alert className='my-5' >
               <p>{message}</p>
              </Alert>
              }
              <Button variant="primary" type="submit" className="signup-button mt-5 fs-6">
                Send Link
              </Button>
              
            </Form>
          </Container>
    </>
  );
};

export default ForgotPassword;

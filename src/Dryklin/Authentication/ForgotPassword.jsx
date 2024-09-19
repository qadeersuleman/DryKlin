import { Form, Button, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('https://dryklins-1a9d97937409.herokuapp.com/api/csrfs/');
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
        'https://dryklin-e853d5ecea30.herokuapp.com/api/send-otp/',
        { email },
        { headers: { 'X-CSRFToken': csrfToken } }
      );
      if (response.status === 200 && response.data.success) {
        toast.success('OTP Sended successfully!', {
          position: 'top-center', // Use string 'top-center' here
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          onClose: () => navigate('/emails', { state: { email } }),
        });
      } else {
        toast.error('Failed to submit the form. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
      });
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
              
              <Button variant="primary" type="submit" className="signup-button mt-5 fs-6">
                Send Link
              </Button>
              
            </Form>
          </Container>
          <ToastContainer />
    </>
  );
};

export default ForgotPassword;

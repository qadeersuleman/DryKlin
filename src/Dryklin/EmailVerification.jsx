import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from './CustomNavbar';
const EmailVerification = () => {
  // State for countdown timer
  const [seconds, setSeconds] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [otp, setOtp] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ''; // Get email from location state

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('https://dryklin-e853d5ecea30.herokuapp.com/api/csrfs/');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    let timer;
    if (isTimerActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Timer expired
      setIsTimerActive(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [seconds, isTimerActive]);

  const handleResendCode = () => {
    // Reset timer logic (60 seconds countdown)
    setSeconds(60);
    setIsTimerActive(true);
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      const response = await axios.post(
        'https://dryklin-e853d5ecea30.herokuapp.com/api/verify-otp/',
        { email, otp },
        { headers: { 'X-CSRFToken': csrfToken } }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.status === 200 && response.data.success) {
        toast.success('OTP verified successfully!', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          onClose: () => navigate('/'), // Navigate to the next page after toast
        });
      } else {
        toast.error('Invalid OTP. Please try again.', {
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
      toast.error('An error occurred during OTP verification. Please try again later.', {
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
      <CustomNavbar />
      <Container fluid className="signup-container">
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center img-container">
            <Image src="./girl.webp" fluid className="signup-image image" />
            <div className="text-overlay">
              <p>Pickup - Wash - Iron - Package - Deliver <br /> All within 24 hours!!!</p>
            </div>
          </Col>
          <Col md={6} className="signup-form-container my-5">
            <div className="form-heading">
              <Link to="/">
                <button style={{ border: 'none', backgroundColor: 'white' }}>
                  <i className="fas fa-chevron-left pt-3"></i>
                </button>
              </Link>
              <span className="mx-3">Back</span>
              <h3 className="mt-2">Email Authentication</h3>
              <p>Enter the 6-digit code sent to the email address you provided below for verification</p>
            </div>

            <Form onSubmit={handleOtpVerification}>
              <Form.Group controlId="formEmail">
                <Form.Label className="input-labels">One Time Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your OTP"
                  className="input-data"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} // Bind input to state
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="signup-button mt-5">
                Verify
              </Button>
            </Form>

            <p className="login-link">
              Didn’t get the code?
              {isTimerActive ? (
                <span className="px-2 text-orange">
                  Resend {`00:${seconds.toString().padStart(2, '0')}`}
                </span>
              ) : (
                <Link to="/forgetpass" className="px-2" onClick={handleResendCode}>
                  Resend Code
                </Link>
              )}
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="forgot-mobile my-5 mx-1" style={{display : "none"}}>
            <div className="form-heading">
              <Link to="/">
                <button style={{ border: 'none', backgroundColor: 'white' }}>
                  <i className="fas fa-chevron-left pt-3"></i>
                </button>
              </Link>
              <span className="mx-3 text-orange" style={{fontSize : "20px", fontWeight : "500"}}>Email Authentication</span>
              
              <p style={{fontSize : "13px"}} className='mt-3'>Enter the 6-digit code sent to the email address you provided below for verification</p>
            </div>

            <Form onSubmit={handleOtpVerification}>
              <Form.Group controlId="formEmail">
                <Form.Label className="input-labels">One Time Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your OTP"
                  className="input-data"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} // Bind input to state
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="signup-button mt-5">
                Verify
              </Button>
            </Form>

            <p className="login-link">
              Didn’t get the code?
              {isTimerActive ? (
                <span className="px-2 text-orange">
                  Resend {`00:${seconds.toString().padStart(2, '0')}`}
                </span>
              ) : (
                <Link to="/forgetpass" className="px-2" onClick={handleResendCode}>
                  Resend Code
                </Link>
              )}
            </p>
          </Container>
      <ToastContainer />
    </>
  );
};

export default EmailVerification;

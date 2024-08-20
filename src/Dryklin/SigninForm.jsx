import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image, InputGroup, Tabs, Tab } from 'react-bootstrap';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for HTTP requests
import CustomNavbar from './CustomNavbar';

const SigninForm = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [key, setKey] = useState('email');
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    if (key === 'email' && !formData.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }
    // if (formData.password.length < 6) {
    //   errors.password = "Password must be at least 6 characters.";
    // }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        // Fetch CSRF token
        const csrfResponse = await axios.get('http://127.0.0.1:8000/api/login/');
        const csrfToken = csrfResponse.data.csrfToken;
        console.warn('CSRF Token:', csrfToken);
        console.warn('Form Data:', formData);

  
        // Send login request
        const response = await axios.post('http://127.0.0.1:8000/api/login/', formData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Include CSRF token in headers
          },
        });
  
        setSuccessMessage(response.data.message);
        navigate("/")
      } catch (error) {
        console.error('Error sending data:', error.response || error);
        setErrors(error.response ? error.response.data : { general: 'An error occurred. Please try again.' });
      }
    }
  };
  

  return (
    <><CustomNavbar />
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
              <button style={{ border: "none" }} className="bg-light">
                <i className="fas fa-chevron-left pt-3"></i>
              </button>
            </Link>
            <span className="mx-3">Back</span>
            <h3 className='mt-2'>Login</h3>
            <p>Fill in your details below to sign in.</p>
          </div>
          <Tabs id="signin-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="email" title="Email">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label className='input-labels'>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="Enter your email address" 
                    value={formData.email}
                    onChange={handleChange}
                    className='input-data'
                  />
                  {errors.email && <div className="error-text">{errors.email}</div>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className='input-labels'>Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={handleChange}
                      className='input-data'
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} className="password-toggle">
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.password && <div className="error-text">{errors.password}</div>}
                </Form.Group>

                <Button variant="primary" type="submit" className="signup-button mt-5">
                  Login
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="phone" title="Phone Number">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label className='input-labels'>Phone Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="phone_number"
                    placeholder="+234 Enter your phone number" 
                    value={formData.phone_number}
                    onChange={handleChange}
                    className='input-data'
                  />
                  {errors.phone_number && <div className="error-text">{errors.phone_number}</div>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className='input-labels'>Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={handleChange}
                      className='input-data'
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} className="password-toggle">
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.password && <div className="error-text">{errors.password}</div>}
                </Form.Group>

                <Button variant="primary" type="submit" className="signup-button mt-5">
                  Login
                </Button>
              </Form>
            </Tab>
          </Tabs>
          <p className="login-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
          {successMessage && <div className="success-text">{successMessage}</div>}
          {errors.general && <div className="error-text">{errors.general}</div>}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default SigninForm;

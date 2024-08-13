import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image, InputGroup, Tabs, Tab } from 'react-bootstrap';
import './SigninForm.css'; // Assuming you create this file for custom CSS
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [key, setKey] = useState('email');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
            <h3 className='mt-2'>Login</h3>
            <p>Fill in your details below to sign in.</p>
          </div>
          <Tabs id="signin-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="email" title="Email">
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label className='input-labels'>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email address" className='input-data'/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className='input-labels'>Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={handlePasswordChange}
                      className='input-data'
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} className="password-toggle">
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="signup-button mt-5">
                  Login
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="phone" title="Phone Number">
              <Form>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label className='input-labels'>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="+234 Enter your phone number" className='input-data'/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className='input-labels'>Password</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={handlePasswordChange}
                      className='input-data'
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} className="password-toggle">
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="signup-button mt-5">
                  Login
                </Button>
              </Form>
            </Tab>
          </Tabs>
          <p className="login-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </Col>
      </Row>
    </Container>
  );
};

export default SigninForm;

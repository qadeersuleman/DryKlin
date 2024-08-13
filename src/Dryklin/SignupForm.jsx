import React from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "./SignupForm.css"; // Import custom CSS
import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <Container fluid className="signup-container">
      <Row className="min-vh-100">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center img-container"
        >
          <Image src="./girl.webp" fluid className="signup-image" />
          <div className="text-overlay">
            <p>
              Pickup - Wash - Iron - Package - Deliver <br /> All within 24
              hours!!!
            </p>
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center signup-form-container"
        >
          <div className="form-heading">
            
              <Link to="/">
              <button>
              <i className="fas fa-chevron-left pt-3"></i>
              </button>
              </Link>
            
            <span className="mx-3">Back</span>
            <h3 className="mt-2">Create account</h3>
            <p>Fill in your details below to sign up.</p>
          </div>
          <Form className="w-100">
            <Form.Group controlId="formFirstName">
              <Form.Label className="input-labels">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                className="input-data"
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label className="input-labels">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                className="input-data"
              />
            </Form.Group>

            <Form.Group controlId="formCityState">
              <Form.Label className="input-labels">City, State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ibadan"
                disabled
                className="input-data"
              />
              <Form.Text className="text-muted">
                We are only available in Ibadan, Oyo State for now.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="input-labels">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                className="input-data"
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="input-labels">Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="+234 Enter your phone number"
                className="input-data"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="input-labels">Create Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="input-data"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label className="input-labels">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password again"
                className="input-data"
              />
            </Form.Group>

            <Form.Group controlId="formTerms">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    By clicking on 'Proceed', you agree to{" "}
                    <span style={{ color: "#e86317" }}>
                      <b>our Terms of Use</b>
                      <br />
                    </span>{" "}
                    and{" "}
                    <span style={{ color: "#e86317" }}>
                      {" "}
                      <b>Privacy Policy.</b>
                    </span>
                  </>
                }
                className="terms-condition"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="signup-button">
              Sign up
            </Button>
          </Form>
          <p className="login-link">
            Already have an account? <Link to="/signin">Log In</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;

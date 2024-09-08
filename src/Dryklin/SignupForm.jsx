import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupForm.css";
import CustomNavbar from "./CustomNavbar";
import Swal from 'sweetalert2';

const SignupForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    // referral_code: "",
    // profile_image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.last_name) newErrors.last_name = "Last Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Please enter a valid email address.";
    if (!formData.phone_number) newErrors.phone_number = "Phone number is required.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
    } else {
        setErrors({});
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });

        try {
            const csrfResponse = await axios.get('https://dryklin-e853d5ecea30.herokuapp.com/api/signup/');
            const csrfToken = csrfResponse.data.csrfToken;

            const response = await axios.post('https://dryklin-e853d5ecea30.herokuapp.com/api/signup/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                },
            });

           

           // Save the tokens in localStorage or sessionStorage
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // Check response status instead of response.ok
        if (response.status === 200 && response.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'Account Registered Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            willClose : () => {
              navigate("/")
            }
          });
          
        } else {
          Swal.fire({
            title: 'error!',
            text: 'Failed to Submit the Form!',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            
          });
        }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Internal Server Issue!',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            
          });
        }
    }
};


  return (
    <>
    <CustomNavbar />
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
          <div className="form-heading" >
            <Link to="/">
              <button style={ {border : "none"} } className="bg-light">
                <i className="fas fa-chevron-left pt-3" ></i>
              </button>
            </Link>
            <span className="mx-3">Back</span>
            <h3 className="mt-2">Create account</h3>
            <p>Fill in your details below to sign up.</p>
          </div>
          <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label className="input-labels">First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                className="input-data"
                value={formData.first_name}
                onChange={handleChange}
                isInvalid={!!errors.first_name}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label className="input-labels">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                className="input-data"
                value={formData.last_name}
                onChange={handleChange}
                isInvalid={!!errors.last_name}
                
              />
              <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
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
                name="email"
                placeholder="Enter your email address"
                className="input-data"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="input-labels">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="+234 Enter your phone number"
                className="input-data"
                value={formData.phone_number}
                onChange={handleChange}
                isInvalid={!!errors.phone_number}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone_number}
                  </Form.Control.Feedback>
              </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="input-labels">Create Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input-data"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
              </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label className="input-labels">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Enter your password again"
                className="input-data"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
              </Form.Group>
  
            <Form.Group controlId="formTerms">
              <Form.Check
                type="checkbox"
                style={{fontSize : "13px", marginBlock :"10px" }}
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


    {/* That is for Mobile Size */}
    <Container className="mobile-view mt-3" style={{display : "none"}}>
    <Row>
    <div className="form-heading px-4">
              <Link to="/">
                <button style={{ border: "none" }} className="bg-light">
                  <i className="fas fa-chevron-left pt-3"></i>
                </button>
              </Link>
              <span className="mx-3">Back</span>
              <h3 className="mt-2">Signup</h3>
              <p>Fill in your details below to Register you Account.</p>
            </div>
        </Row>
        <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label className="input-labels">First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                className="input-data"
                value={formData.first_name}
                onChange={handleChange}
                isInvalid={!!errors.first_name}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label className="input-labels">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                className="input-data"
                value={formData.last_name}
                onChange={handleChange}
                isInvalid={!!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.last_name}
                  </Form.Control.Feedback>
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
                name="email"
                placeholder="Enter your email address"
                className="input-data"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
              </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label className="input-labels">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="+234 Enter your phone number"
                className="input-data"
                value={formData.phone_number}
                onChange={handleChange}
                isInvalid={!!errors.phone_number}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone_number}
                  </Form.Control.Feedback>
              </Form.Group>


            <Form.Group controlId="formPassword">
              <Form.Label className="input-labels">Create Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input-data"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
              </Form.Group>


            <Form.Group controlId="formConfirmPassword">
              <Form.Label className="input-labels">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Enter your password again"
                className="input-data"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
              </Form.Group>
            {/* {  show ? 
            <Alert variant="warning" onClose={() => setShow(false)} dismissible className="py-5">
              <Alert.Heading>Warning!</Alert.Heading>
                <p>
                  This is a warning alert—checkn.
                </p>
              </Alert> 
             : "" 
            } */}
  
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
                className="terms-condition mt-2"
                style={{fontSize : "13px"}}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="signup-button">
              Sign up
            </Button>
          </Form>
          <p className="login-link">
            Already have an account? <Link to="/signin">Log In</Link>
          </p>
    </Container>
    </>
  );
};

export default SignupForm;

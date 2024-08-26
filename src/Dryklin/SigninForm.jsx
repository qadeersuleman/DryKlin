import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  InputGroup,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import "./SigninForm.css"; // Assuming you create this file for custom CSS
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios for HTTP requests
import CustomNavbar from "./CustomNavbar";
import { Box, Flex } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;


const SigninForm = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [key, setKey] = useState("email");
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
    if (key === "email" && !formData.email.includes("@")) {
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
        const csrfResponse = await axios.get("https://dryklin-e853d5ecea30.herokuapp.com/api/login/");
        const csrfToken = csrfResponse.data.csrfToken;
        console.warn("CSRF Token:", csrfToken);
        console.warn("Form Data:", formData);
  
        // Convert formData to JSON if it's not already
        const formDataJson = JSON.stringify(formData);
  
        // Send login request
        const response = await axios.post(
          "https://dryklin-e853d5ecea30.herokuapp.com/api/login/",
          formDataJson,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken, // Include CSRF token in headers
            },
          }
        );
  
        // Save the tokens in localStorage or sessionStorage
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // Check response status instead of response.ok
        if (response.status === 200 && response.data.success) {
          toast.success('Your form has been submitted successfully!', {
            position: 'top-center', // Use string 'top-center' here
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            onClose: () => navigate("/"),
          });
        } else {
          toast.error(response.data.message || 'Failed to submit the form. Please try again.', {
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
        console.error("Error during form submission:", error);
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
    }
  };
  
  return (
    <>
      <CustomNavbar />
      <Container fluid className="signup-container">
        <Row>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center img-container"
          >
            <Image src="./girl.webp" fluid className="signup-image image" />
            <div className="text-overlay">
              <p>
                Pickup - Wash - Iron - Package - Deliver <br /> All within 24
                hours!!!
              </p>
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
              <h3 className="mt-2">Login</h3>
              <p>Fill in your details below to sign in.</p>
            </div>
            <Tabs
              id="signin-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="email" title="Email">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label className="input-labels">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-data"
                    />
                    {errors.email && (
                      <div className="error-text">{errors.email}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label className="input-labels">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-data"
                      />
                      <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        className="password-toggle"
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                      <div className="error-text">{errors.password}</div>
                    )}
                  </Form.Group>
                  {successMessage && (
                    <Alert className="success-text mt-3">
                      {successMessage}
                    </Alert>
                  )}
                  {errors.general && (
                    <Alert className="error-text mt-3">{errors.general}</Alert>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    className="signup-button mt-3"
                  >
                    Login
                  </Button>
                </Form>
              </Tab>

              {/* That is a Phone Tab */}
              <Tab eventKey="phone" title="Phone Number">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label className="input-labels">
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      placeholder="+234 Enter your phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="input-data"
                    />
                    {errors.phone_number && (
                      <div className="error-text">{errors.phone_number}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label className="input-labels">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-data"
                      />
                      <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        className="password-toggle"
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                      <div className="error-text">{errors.password}</div>
                    )}
                  </Form.Group>
                  {successMessage && (
                    <Alert className="success-text mt-3">
                      {successMessage}
                    </Alert>
                  )}
                  {errors.general && (
                    <Alert className="error-text mt-3">{errors.general}</Alert>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    className="signup-button mt-3"
                  >
                    Login
                  </Button>
                </Form>
              </Tab>
            </Tabs>

            <div className="d-flex mt-3">
              <Form.Check
                type="checkbox"
                label="Save us for Now"
                className=""
                style={{ fontSize: "15px" }}
              />
              <span>
                <Link
                  to="/forgetpass"
                  className="text-orange "
                  style={{ textDecoration: "none", paddingLeft: "150px" }}
                >
                  Forgot Password?
                </Link>
              </span>
            </div>

            <p className="login-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="mobile-view mt-3" style={{ display: "none" }}>
        <Row>
          <div className="col text-center">
            <Image
              src="./Dryklin/PNGS/12.png"
              style={{ width: "150px", height: "40px" }}
              className="mx-auto d-block"
            />
            <h4 className="pt-4">Login to Your Account</h4>
            <p style={{ marginTop: "-5px" }}>
              Start making your dreams cometrue
            </p>
          </div>
        </Row>
        <Tabs
          id="signin-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="email" title="Email">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label
                  className="input-labels px-2"
                  style={{ fontSize: "18px", fontWeight: "400" }}
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-data "
                  style={{
                    paddingBlock: "20px",
                    border: "1px solid black",
                    fontSize: "15px",
                  }}
                />
                {errors.email && (
                  <div className="error-text">{errors.email}</div>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-2">
                <Form.Label
                  className="input-labels"
                  style={{ fontSize: "18px", fontWeight: "400" }}
                >
                  Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-data"
                    style={{
                      paddingBlock: "20px",
                      border: "1px solid black",
                      fontSize: "15px",
                    }}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
                {errors.password && (
                  <div className="error-text">{errors.password}</div>
                )}
              </Form.Group>
              <Box p={5} maxW="400px" mx="auto">
                <Flex direction="column" spacing={4}>
                  {/* Your form fields here */}

                  <Flex justify="space-between" align="center" mt={4}>
                    <Form.Check type="checkbox" label="Save us for Now" />
                    <Link
                      to="/forgetpass"
                      className="text-orange"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>
                  </Flex>
                </Flex>
              </Box>
              {successMessage && (
                <Alert className="success-text mt-3">{successMessage}</Alert>
              )}
              {errors.general && (
                <Alert className="error-text mt-3">{errors.general}</Alert>
              )}
              <Button
                variant="primary"
                type="submit"
                className="signup-button mt-3"
              >
                Login
              </Button>
            </Form>
          </Tab>

          {/* Mobile size phone Tab */}
          <Tab eventKey="phone" title="Phone Number">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label
                  className="input-labels"
                  style={{ fontSize: "18px", fontWeight: "400" }}
                >
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  placeholder="+234 Enter your phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="input-data"
                  style={{
                    paddingBlock: "20px",
                    border: "1px solid black",
                    fontSize: "15px",
                  }}
                />
                {errors.phone_number && (
                  <div className="error-text">{errors.phone_number}</div>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label
                  className="input-labels"
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    marginTop: "10px",
                  }}
                >
                  Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-data"
                    style={{
                      paddingBlock: "20px",
                      border: "1px solid black",
                      fontSize: "15px",
                    }}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
                {errors.password && (
                  <div className="error-text">{errors.password}</div>
                )}
              </Form.Group>
              <Box p={5} maxW="400px" mx="auto">
                <Flex direction="column" spacing={4}>
                  {/* Your form fields here */}

                  <Flex justify="space-between" align="center" mt={4}>
                    <Form.Check type="checkbox" label="Save us for Now" />
                    <Link
                      to="/forgetpass"
                      className="text-orange"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>
                  </Flex>
                </Flex>
              </Box>
              {successMessage && (
                <Alert className="success-text mt-3">{successMessage}</Alert>
              )}
              {errors.general && (
                <Alert className="error-text mt-3">{errors.general}</Alert>
              )}
              <Button
                variant="primary"
                type="submit"
                className="signup-button mt-3"
              >
                Login
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SigninForm;

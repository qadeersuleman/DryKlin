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
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CustomNavbar from "./CustomNavbar";
import Swal from "sweetalert2";

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
        const csrfResponse = await axios.get(
          "https://dryklins-1a9d97937409.herokuapp.com/api/csrfs/"
        );
        const csrfToken = csrfResponse.data.csrfToken;

        const formDataJson = JSON.stringify(formData);

        const response = await axios.post(
          "https://dryklins-1a9d97937409.herokuapp.com/api/login/",
          formDataJson,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
          }
        );

        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        let user = response.data.user

        if (response.status === 200 && response.data.success) {
          Swal.fire({
            title: "Success!",
            text: `${user.first_name + " "+ user.last_name} is logged in Successfully!`,
            icon: "success",
            customClass: {
              popup: "my-swal",
            },
            confirmButtonText: "OK",
            confirmButtonColor: '#e65c00',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            willClose: () => {
              navigate("/");
            },
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Your Login details are incorrect please Recheck!",
            icon: "error",
            customClass: {
              popup: "my-swal-error",
            },
            confirmButtonText: "Try Again",
            confirmButtonColor: '#e65c00',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to Submit the Form!",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: '#e65c00',
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
      <Container fluid className="login-section vh-100 p-0">
        <Row className="h-100 m-0">
          <Col
            md={6}
            className="image-col d-none d-md-block"
            style={{
              backgroundImage: `url('/Iron.webp')`, // Background image from the public folder
            }}
          >
            <div className="overlay">
              {/* Inline image on top of background */}
              <Image
                src="./Dryklin/PNGS/13.png"
                style={{ width: "180px", marginRight: "200px" }}
                fluid
                alt="Signup Image"
              />
              {/* Text over the background image */}
              <p
                className="image-text text-left"
                style={{ textAlign: "left", fontSize: "20px" }}
              >
                Pickup - Wash - Iron - Package - Deliver <br />
                All within 24 hours!!!
              </p>
            </div>
          </Col>

          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="form-container" style={{ marginTop: "-100px" }}>
              <div className="form-heading" style={{ textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <Link to="/">
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        marginRight: "10px",
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  </Link>
                  <span>Back</span>
                </div>
                <h3
                  style={{
                    marginTop: "15px",
                    marginBottom: "5px",
                    fontSize: "20px",
                  }}
                  className="text-orange"
                >
                  Login
                </h3>
                <p style={{ marginBottom: "10px", color: "#666" }}>
                  Fill in your details below to Login
                </p>
              </div>

              <Tabs
                id="signin-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                {/* Email Tab */}
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
                    <Row className="mt-3">
                      <Col className="text-left">
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="normal-label">Remember me </span>
                          }
                          className="save-us-checkbox custom-checkbox"
                        />
                      </Col>
                      <Col className="text-right">
                        <a href="/forgetpass" className="forgot-password-link">
                          Forgot Password?
                        </a>
                      </Col>
                    </Row>

                    {successMessage && (
                      <Alert className="success-text mt-3">
                        {successMessage}
                      </Alert>
                    )}
                    {errors.general && (
                      <Alert className="error-text mt-3">
                        {errors.general}
                      </Alert>
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

                {/* Phone Tab */}
                <Tab eventKey="phone" title="Phone Number">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label className="input-labels">
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder="+088 Enter your phone number"
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
                    </Form.Group>

                    <Row className="mt-3">
                      <Col className="text-left">
                        <Form.Check
                          type="checkbox"
                          label={
                            <span className="normal-label">Remember me </span>
                          }
                          className="save-us-checkbox custom-checkbox"
                        />
                      </Col>
                      <Col className="text-right">
                        <a href="/forgetpass" className="forgot-password-link">
                          Forgot Password?
                        </a>
                      </Col>
                    </Row>

                    {successMessage && (
                      <Alert className="success-text mt-3">
                        {successMessage}
                      </Alert>
                    )}
                    {errors.general && (
                      <Alert className="error-text mt-3">
                        {errors.general}
                      </Alert>
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

              <div className="mt-3 text-center">
                <span>Don't have an account?</span>
                <Link
                  to="/signup"
                  className="ms-2 text-orange"
                  style={{ fontSize: "15px", fontWeight: "600",textDecoration : "none" }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SigninForm;

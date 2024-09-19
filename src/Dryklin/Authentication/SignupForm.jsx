import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import CustomNavbar from "./CustomNavbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
  const navigate = useNavigate();

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

  // For password Toggling
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
    if (!formData.email.includes("@"))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone number is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
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
        const csrfResponse = await axios.get(
          "https://dryklins-1a9d97937409.herokuapp.com/api/signup/"
        );
        const csrfToken = csrfResponse.data.csrfToken;

        const response = await axios.post(
          "https://dryklins-1a9d97937409.herokuapp.com/api/signup/",
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": csrfToken,
            },
          }
        );

        // Save the tokens in localStorage or sessionStorage
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Check response status instead of response.ok
        if (response.status === 200 && response.data.success) {
          Swal.fire({
            title: "Success!",
            text: "Account Registered Successfully!",
            icon: "success",
            customClass: {
              popup: "my-swal",
            },
            confirmButtonText: "OK",
            confirmButtonColor: "#e65c00",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            willClose: () => {
              navigate("/");
            },
          });
        } else {
          Swal.fire({
            title: "error!",
            text: "Your Signed Up details is incorrect Try another Email or Phone Number!",
            icon: "error",
            customClass: {
              popup: "my-swal",
            },
            confirmButtonText: "OK",
            confirmButtonColor: "#e65c00",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Internal Server Issue!",
          icon: "error",
          customClass: {
            popup: "my-swal",
          },
          confirmButtonText: "OK",
          confirmButtonColor: "#e65c00",
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
          {/* Left Column with Image */}
          <Col
            md={6}
            className="image-col d-none d-md-block"
            style={{
              backgroundImage: `url('/Iron.webp')`, // Accessing from public folder
            }}
          >
            <div className="overlay">
              <p className="image-text text-center">
                Pickup - Wash - Iron - Package - Deliver <br /> All within 24
                hours!!!
              </p>
            </div>
          </Col>

          {/* Right Column with Login Form */}

          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              <div className="form-heading" style={{ textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "15px",
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
                  Create Account
                </h3>
                <p style={{ marginBottom: "10px", color: "#666" }}>
                  Fill in your details below to Login
                </p>
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

                <Form.Group
                  controlId="formCityState"
                  style={{ backgroundColor: "white" }}
                >
                  <Form.Label className="input-labels">City, State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ibadan"
                    disabled
                    className="input-data"
                    style={{
                      backgroundColor: "white",
                      color: "#000", // Keep the text color black
                      opacity: 1, // Override the default opacity that makes it look grayed out
                    }}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ fontSize: "12px" }}
                  >
                    <i
                      className="fas fa-exclamation-circle text-orange"
                      style={{ marginInline: "8px" }}
                    ></i>
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

                <Form.Group
                  controlId="formPhoneNumber"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="input-labels">Phone Number</Form.Label>
                  <div style={{ position: "relative" }}>
                    {/* Container for flag, code, and input */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "absolute",
                        top: "0",
                        bottom: "0",
                        left: "15px",
                        zIndex: 1,
                      }}
                    >
                      {/* Nigerian flag */}
                      <img
                        src="https://flagcdn.com/w40/ng.png"
                        width="20"
                        alt="Nigeria Flag"
                        style={{
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {/* Country Code */}
                      <span
                        style={{
                          marginRight: "10px",
                          fontWeight: "normal",
                          fontSize: "12px",
                        }}
                      >
                        + 234
                      </span>
                      {/* Dropdown for null values */}
                      <i
                        className="fas fa-chevron-down"
                        style={{
                          cursor: "pointer",
                          color: "#6c757d",
                          marginRight: "10px",
                          fontSize: "12px",
                        }}
                      ></i>
                    </div>

                    {/* Phone Number Input */}
                    <Form.Control
                      type="text"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      className="input-data"
                      value={formData.phone_number}
                      onChange={handleChange}
                      isInvalid={!!errors.phone_number}
                      style={{ paddingLeft: "110px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone_number}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group
                  controlId="formPassword"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="input-labels">
                    Create Password
                  </Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="input-data"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "75%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#6c757d",
                    }}
                  ></i>
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group
                  controlId="formConfirmPassword"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="input-labels">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter your password again"
                    className="input-data"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <i
                    className={`fas ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "75%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#6c757d",
                    }}
                  ></i>
                </Form.Group>

                <Form.Group controlId="formTerms" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span className="normal-label">
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
                      </span>
                    }
                    className="save-us-checkbox custom-checkbox"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="signup-button"
                >
                  Sign up
                </Button>
                <p className="login-link text-center mt-2">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-orange"
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Log in
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupForm;

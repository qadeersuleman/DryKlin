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

const LoginPage = () => {
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
          "https://dryklin-e853d5ecea30.herokuapp.com/api/csrfs/"
        );
        const csrfToken = csrfResponse.data.csrfToken;

        const formDataJson = JSON.stringify(formData);

        const response = await axios.post(
          "https://dryklin-e853d5ecea30.herokuapp.com/api/login/",
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

        if (response.status === 200 && response.data.success) {
          Swal.fire({
            title: "Success!",
            text: "User Logged in Successfully!",
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
            title: "Error!",
            text: "There was an error logging in!",
            icon: "error",
            customClass: {
              popup: "my-swal-error",
            },
            confirmButtonText: "Try Again",
            confirmButtonColor: "#e65c00",
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

      {/* Main Section */}
      
    </>
  );
};

export default LoginPage;

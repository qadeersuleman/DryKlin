import React, { useState } from "react";
import { Modal, Button, Card, Row, Col, Form, Alert } from "react-bootstrap";
import "./RequestDelivery.css";

const RequestDelivery = ({ show, handleNext, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption) {
      setErrorMessage("Please select a delivery mode."); // Set error message if no option is selected
    } else {
      setErrorMessage(""); // Clear error message if validation passes
      handleNext(selectedOption); // Pass the selected option to the next step
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setErrorMessage(""); // Clear error message when an option is selected
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading" style={{ textAlign: "left" }}>
          <button
            style={{ border: "none", backgroundColor: "white" }}
            onClick={handleClose}
          >
            <i className="fas fa-chevron-left pt-3"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontSize: "20px",
            }}
            className="text-orange"
          >
            Available Delivery Mode
          </h3>
          <p style={{ marginBottom: "10px", color: "#666" }}>
            Select your preferred Delivery mode.
          </p>
        </div>

        {/* Display error message if exists */}
        {errorMessage && (
          <Alert variant="danger" className="mt-2 text-center">
            {errorMessage}
          </Alert>
        )}

        <div className="pc-view-delivery">
          <Card
            onClick={() => handleSelect("normal")}
            className={` delivery-card ${
              selectedOption === "normal" ? "selected" : ""
            }`}
          >
            <Row>
              <Col md={2} xs={2} className="mt-2 mx-3 ">
                <div
                  className="delivery-checkbox align-items-center text-center"
                  style={{ marginLeft: "20px", marginTop: "5px" }}
                >
                  {selectedOption === "normal" && (
                    <i className="fa fa-check"></i>
                  )}
                </div>
              </Col>
              <Col md={8} xs={8}>
                <div className="delivery-details">
                  <h5
                    className="delivery-title"
                    style={{ fontSize: "18px", marginBottom: "5px" }}
                  >
                    Normal Delivery
                  </h5>
                  <p className="delivery-info" style={{ fontSize: "14px" }}>
                    <i className="fa fa-info-circle mx-1"></i> Clothes are
                    delivered within{" "}
                    <span className="text-orange">3-5 Days</span>.
                  </p>
                </div>
              </Col>
            </Row>
          </Card>

          <Card
            onClick={() => handleSelect("express")}
            className={`delivery-card ${
              selectedOption === "express" ? "selected" : ""
            }`}
          >
            <Row>
              <Col md={2} xs={2} className="mt-2 mx-3">
                <div
                  className="delivery-checkbox"
                  style={{ marginLeft: "20px", marginTop: "5px" }}
                >
                  {selectedOption === "express" && (
                    <i className="fa fa-check"></i>
                  )}
                </div>
              </Col>
              <Col md={8} xs={8}>
                <div className="delivery-details">
                  <h5
                    className="delivery-title"
                    style={{ fontSize: "18px", marginBottom: "5px" }}
                  >
                    Express Delivery
                  </h5>
                  <p className="delivery-info" style={{ fontSize: "14px" }}>
                    <i className="fa fa-info-circle mx-1"></i> Clothes are
                    delivered within{" "}
                    <span className="text-orange">24 hours</span>.
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        <p className="text-center">
          <i class="fas fa-truck text-orange"></i> Please note there is a 25%
          additional service charge for express delivery.
        </p>

        <Form onSubmit={handleSubmit}>
          <Button type="submit" className="signup-button mt-5 bg-orange">
            Request Pickup
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestDelivery;

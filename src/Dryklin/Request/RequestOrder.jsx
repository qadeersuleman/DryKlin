import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import "./RequestOrder.css";

const RequestOrder = ({ show, handleNext, handleClose, deliveryOption, paymentOption }) => {
  const [selectedOption, setSelectedOption] = useState(paymentOption || '');

  useEffect(() => {
    console.warn("Delivery Option:", deliveryOption); // Log delivery option
    console.warn("Payment Option:", selectedOption); // Log selected payment option
  }, [deliveryOption, selectedOption]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <button
            style={{ border: "none", backgroundColor: "white" }}
            onClick={handleClose}
          >
            <i className="fas fa-chevron-left pt-3"></i>
          </button>

          <span className="mx-3">Back</span>
          <h3 className="mt-4">Order Summary</h3>
          <p style={{ fontSize: "14px" }}>
            Check out the details of what you're paying below
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <span>Sub-total</span>
          <span className="fw-bold">₦13800</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Delivery Fee</span>
          <span className="fw-bold">₦800</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Service Charge</span>
          <span className="fw-bold">₦500</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <strong className="fw-bold">Total</strong>
          <strong className="text-orange">₦15100</strong>
        </div>

        <h3 className="text-orange" style={{ fontSize: "18px" }}>
          Choose payment method
        </h3>
        <div>
          <Row className="desktop-row">
            <Col md={5} className="mx-4">
              <Card
                onClick={() => handleSelect("wallet")}
                className={`delivery-card ${
                  selectedOption === "wallet" ? "selected" : ""
                }`}
              >
                <Row>
                  <Col md={2} className="mt-2 mx-3">
                    <div
                      className="delivery-checkbox"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "30px",
                      }}
                    >
                      {selectedOption === "wallet" && (
                        <i className="fa fa-check"></i>
                      )}
                    </div>
                  </Col>
                  <Col md={8}>
                    <h3 style={{ fontSize: "14px" }} className="pt-2">
                      Wallet (₦53228.00)
                    </h3>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={5}>
              <Card
                onClick={() => handleSelect("online")}
                className={`delivery-card ${
                  selectedOption === "online" ? "selected" : ""
                }`}
              >
                <Row>
                  <Col md={2} className="mt-2 mx-3">
                    <div
                      className="delivery-checkbox"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "30px",
                      }}
                    >
                      {selectedOption === "online" && (
                        <i className="fa fa-check"></i>
                      )}
                    </div>
                  </Col>
                  <Col md={8}>
                    <h3 style={{ fontSize: "16px" }} className="pt-2 px-2">
                      Pay Online
                    </h3>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Card
            onClick={() => handleSelect("wallet")}
            className={`delivery-card-custom ${
              selectedOption === "wallet" ? "selected-custom" : ""
            }`}
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="delivery-checkbox-custom"
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "20%",
                backgroundColor:
                  selectedOption === "wallet" ? "#ff6b00" : "transparent",
                marginBottom: "10px",
                transition: "background-color 0.3s ease",
              }}
            >
              {selectedOption === "wallet" && (
                <i className="fa fa-check" style={{ color: "#fff" }}></i>
              )}
            </div>
            <p
              className="delivery-content-custom"
              style={{ fontSize: "16px", margin: 0 }}
            >
              Wallet (₦53228.00)
            </p>
          </Card>

          <Card
            onClick={() => handleSelect("online")}
            className={`delivery-card-custom ${
              selectedOption === "online" ? "selected-custom" : ""
            }`}
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="delivery-checkbox-custom"
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "20%",
                backgroundColor:
                  selectedOption === "online" ? "#ff6b00" : "transparent",
                marginBottom: "10px",
                transition: "background-color 0.3s ease",
              }}
            >
              {selectedOption === "online" && (
                <i className="fa fa-check" style={{ color: "#fff" }}></i>
              )}
            </div>
            <h3
              className="delivery-content-custom"
              style={{ fontSize: "16px", margin: 0 }}
            >
              Pay Online
            </h3>
          </Card>
          <div className="d-flex justify-content-between pt-3">
            <p style={{ fontSize: "12px" }}>
              By clicking on "Pay Now", you agree to our
              <span className="text-orange"> Terms of Use </span>
              and <span className="text-orange"> Privacy Policy</span>.
            </p>
          </div>
        </div>
        <Button
          type="submit"
          className="signup-button mt-2 bg-orange"
          onClick={handleNext}
        >
          Pay Now
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RequestOrder;

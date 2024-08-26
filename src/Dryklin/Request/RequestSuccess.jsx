import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./RequestSuccess.css"
const RequestSuccess = ({ show, handleClose }) => {
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

          <span className="mx-3">Back Home</span>
        </div>
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="4x"
          className=" mb-3"
          style={{ marginLeft: "170px", color: "hsl(87, 82%, 69%)" }}
        />
        <h4
          className="text-orange text-center mt-4"
          style={{ fontSize: "20px" }}
        >
          Your order has been placed successfully
        </h4>
        <p className="px-2 text-center" style={{ fontSize: "12px" }}>
          Thank you for ordering a pick-up. Our DryKlinar will be at your pickup
          location shortly. Kindly ensure to be available to pick your call
          whenever they call.
        </p>
        <Container style={{ backgroundColor: "#fcefd9" }}>
          <p className="share-text mx-5 px-5 mt-2" style={{ fontSize: "13px" }}>
            Share your DryKlin story on social media and stand a chance to win
            an iPhone 12 Pro Max!
          </p>
          <div className="social-icons">
            <i class="fab fa-facebook social-icone"></i>
            <i class="fab fa-twitter social-icone" ></i>
            <i class="fab fa-instagram social-icone"></i>
            <i class="fab fa-whatsapp social-icone"></i>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RequestSuccess;

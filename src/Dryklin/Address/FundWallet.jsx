import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import PaymentTypes from "./PaymentTypes"
const FundWallet = ({ show, handleClose }) => {
    const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleShow = () => setShowModal(true);

  // Function to close the modal
  const handleCloses = () => setShowModal(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <button
            style={{ border: "none" }}
            className="bg-light"
            onClick={handleClose}
          >
            <i className="fas fa-chevron-left pt-1"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3 className="mt-3" style={{ fontSize: "18px" }}>
            Fund Wallet
          </h3>
          <p style={{ fontSize: "13px" }}>
            Deposit into your Wallet with virtual Account numbers and get a
            cedited in few minutes or pay online.
          </p>
        </div>
        <Card className="mb-3 card-back">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <p className="text-orange" style={{fontSize : "12px", paddingInline : "150px"}}>
                Paystack - Titan 
                <span className="mx-3">
                    <i className="fas fa-copy"></i> Copy
                </span>
              </p>
              <h1 className="text-center text-orange" style={{fontSize : "22px"}}>9434519113</h1>
            </div>
            
          </Card.Body>
        </Card>
        <Button
          type="submit"
          className="signup-button mt-2 bg-orange"
          onClick={handleShow}
        >
            <i className="fab fa-internet-explorer px-3"></i>
          Pay Online
        </Button>
        <PaymentTypes 
                   show={showModal}
                   handleClose={handleCloses}
                />
      </Modal.Body>
    </Modal>
  );
};

export default FundWallet;

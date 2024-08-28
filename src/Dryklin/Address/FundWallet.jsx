import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import PaymentTypes from "./PaymentTypes";

const FundWallet = ({ show, handleClose }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Function to open the PaymentTypes modal
  const handleShowPaymentModal = () => {
    setShowPaymentModal(true);
    handleClose(); // Close the FundWallet modal
  };

  // Function to close the PaymentTypes modal
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  return (
    <>
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
              Deposit into your Wallet with virtual Account numbers and get credited in a few minutes or pay online.
            </p>
          </div>
          <Card className="mb-3 card-back">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-orange" style={{ fontSize: "12px", paddingInline: "150px" }}>
                  Paystack - Titan
                  <span className="mx-3">
                    <i className="fas fa-copy"></i> Copy
                  </span>
                </p>
                <h1 className="text-center text-orange" style={{ fontSize: "22px" }}>9434519113</h1>
              </div>
            </Card.Body>
          </Card>
          <Button
            type="submit"
            className="signup-button mt-2 bg-orange"
            onClick={handleShowPaymentModal} // Show the PaymentTypes modal
          >
            <i className="fab fa-internet-explorer px-3"></i>
            Pay Online
          </Button>
        </Modal.Body>
      </Modal>

      {/* PaymentTypes Modal */}
      <PaymentTypes show={showPaymentModal} handleClose={handleClosePaymentModal} />
    </>
  );
};

export default FundWallet;

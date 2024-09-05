import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap"; // Import Spinner
import axios from "axios";
import "./PaymentTypes.css";
import FundWallet from "./FundWallet";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import QRPaymentModal from "../Payments/QRPaymentModal";
import CardPaymentModal from "../Payments/CardPaymentModal";
import USSDPaymentModal from "../Payments/USSDPaymentModal";

const PaymentTypes = ({ show, handleClose }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [selectedOption, setSelectedOption] = useState("Card");
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false); // Add state for refresh trigger

  const [showCardModal, setShowCardModal] = useState(false);
  // const [showBankModal, setShowBankModal] = useState(false);
  const [showUSSDModal, setShowUSSDModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const New = async () => {
    setLoading(true); // Start loading when request begins
    try {
      if (selectedOption === "Bank Transfer") {
        // Handle Bank Transfer
        const csrfResponse = await axios.get("https://dryklin-e853d5ecea30.herokuapp.com/api/csrfs/");
        const csrfToken = csrfResponse.data.csrfToken;

        const formData = {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          number: user.phone_number,
        };
        const formDataJson = JSON.stringify(formData);

        const response = await axios.post(
          "https://dryklin-e853d5ecea30.herokuapp.com/api/create-virtual-account/",
          formDataJson,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
          }
        );
        console.warn(response)
        setRefresh(!refresh); // Toggle refresh state to trigger data refetch
        setShowPaymentModal(true); // Open the FundWallet modal
        handleClose(); // Close the PaymentTypes modal

      } else if (selectedOption === "USSD") {
        // Handle USSD logic
        handleClose();
        setShowUSSDModal(true);

      } else if (selectedOption === "QR Code") {
        // Handle QR Code logic
        handleClose();
        setShowQRModal(true)

      } else {
        handleClose()
        setShowCardModal(true)
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      alert("Failed to process payment. Please try again.");
    }
    setLoading(false); // Stop loading when request is complete
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="form-heading">
            <Button
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={handleClose}
            >
              <i className="fas fa-chevron-left"></i>
            </Button>
            <span className="mx-3">Back</span>
            <h4 className="mt-2" style={{ color: "#ff6b00" }}>
              Pay Online
            </h4>
            <p>Choose your preferred means to pay online.</p>
          </div>
          <Form>
            <Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="fas fa-credit-card"></i>
                  <span className="mx-2">Card</span>
                </div>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={selectedOption === "Card"}
                  onChange={handleOptionChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="fas fa-university"></i>
                  <span className="mx-2">Bank Transfer</span>
                </div>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  value="Bank Transfer"
                  checked={selectedOption === "Bank Transfer"}
                  onChange={handleOptionChange}
                />
              </div>
            </Form.Group>

            {/* New USSD Option */}
            <Form.Group className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="fas fa-mobile-alt"></i>
                  <span className="mx-2">USSD</span>
                </div>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  value="USSD"
                  checked={selectedOption === "USSD"}
                  onChange={handleOptionChange}
                />
              </div>
            </Form.Group>

            {/* New QR Code Option */}
            <Form.Group className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="fas fa-qrcode"></i>
                  <span className="mx-2">QR Code</span>
                </div>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  value="QR Code"
                  checked={selectedOption === "QR Code"}
                  onChange={handleOptionChange}
                />
              </div>
            </Form.Group>
          </Form>
          <Button
            className="signup-button bg-orange"
            onClick={New}
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="text-white"/> Processing...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </Modal.Body>
      </Modal>
      <FundWallet
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
        refresh={refresh} // Pass refresh state to FundWallet
      />
      <QRPaymentModal show={showQRModal} handleClose={() => setShowQRModal(false)} />
      <CardPaymentModal show={showCardModal} handleClose={() => setShowCardModal(false)} />
      <USSDPaymentModal show={showUSSDModal} handleClose={() => setShowUSSDModal(false)} />
    </>
  );
};

export default PaymentTypes;

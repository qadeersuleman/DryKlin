import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap"; // Import Spinner
import axios from "axios";
import "./PaymentTypes.css";
import FundWallet from "./FundWallet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

const PaymentTypes = ({ show, handleClose }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [selectedOption, setSelectedOption] = useState("Card");
  const [user, setUser] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);

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
    if (selectedOption === "Bank Transfer") {
      try {
        // Request CSRF token from Django backend
        const csrfResponse = await axios.get("https://dryklin-e853d5ecea30.herokuapp.com/api/csrfs/");
        const csrfToken = csrfResponse.data.csrfToken;
        console.warn("CSRF Token:", csrfToken);

        // Example formData to send (replace with actual data you need to send)
        const formData = {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          number: user.phone_number,
        };
        const formDataJson = JSON.stringify(formData);
        console.warn("Form Data:", formDataJson);

        // Send bank transfer request to Django backend
        const response = await axios.post(
          "https://dryklin-e853d5ecea30.herokuapp.com/api/create-virtual-account/",
          formDataJson,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken, // Include CSRF token in headers
            },
          }
        );

        setAccountDetails(response.data.data);
        console.warn("Bank Transfer Response:", accountDetails);
        alert("Bank transfer initiated successfully.");
        setShowPaymentModal(true); // Open the FundWallet modal
        handleClose(); // Close the PaymentTypes modal
      
        
      } catch (error) {
        console.error("Error initiating bank transfer:", error);
        alert("Failed to initiate bank transfer. Please try again.");
      }
    } else {
      // If any other option is selected, just proceed with alert and close modal
      alert(`Proceed with ${selectedOption}`);
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

          {loading ? ( // Conditionally render spinner or button
            <div className="d-flex justify-content-center mt-5">
              <Spinner animation="border" className="text-orange" />
            </div>
          ) : (
            <Button className="w-100 mt-3 mt-5 Payment-Type-btn" onClick={New}>
              Proceed to pay
            </Button>
          )}
        </Modal.Body>
      </Modal>

      {/* FundWallet Modal */}
      <FundWallet
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
      />
    </>
  );
};

export default PaymentTypes;

import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";


const FundWallet = ({ show, handleClose, amount }) => {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(true); // Start loading when component mounts
  

  useEffect(() => {
    if (show) {
      const initiatePayment = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          alert("User not logged in!");
          handleClose();
          return;
        }

        try {
          const csrfResponse = await axios.get(
            "https://dryklin-e853d5ecea30.herokuapp.com/api/csrfs/"
          );
          const csrfToken = csrfResponse.data.csrfToken;

          const response = await axios.post(
            "https://dryklin-e853d5ecea30.herokuapp.com/initiate-payment/",
            { amount: amount, email: user.email },
            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          );

          setPaymentUrl(response.data.payment_url);
        } catch (error) {
          console.error("Payment initiation failed:", error);
          handleClose();
        } finally {
          setLoading(false); // Hide spinner once the payment URL is set or an error occurs
        }
      };

      initiatePayment();
    }
  }, [show, amount, handleClose]);

  useEffect(() => {
    if (paymentUrl) {
      // Redirect to Paystack payment page after setting the payment URL
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        {loading ? (
          <Spinner animation="border" size="sm" className="text-primary" />
        ) : (
          <p>Redirecting to payment...</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FundWallet;

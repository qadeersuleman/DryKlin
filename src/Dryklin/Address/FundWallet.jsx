import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const FundWallet = ({ show, handleClose, refresh, amount }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  // That is for payment gateway
  
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  
  // Fetch user profile data from Django backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userEmail = JSON.parse(storedUser).email; // Get user email from localStorage
        try {
          const response = await axios.get(
            `https://dryklin-e853d5ecea30.herokuapp.com/api/user-profile/${userEmail}/`
          );
          setUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    
    if (show) {
      fetchUserProfile(); // Fetch user profile only when the modal is shown
    }
  }, [refresh, show]); // Add refresh and show as dependencies to trigger refetch

  // For Copying
  const copyToClipboard = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    // Set its value to the virtual account number
    tempInput.value = userProfile.virtual_account_number;
    // Append it to the body
    document.body.appendChild(tempInput);
    // Select the input value
    tempInput.select();
    // Copy the selected text
    document.execCommand("copy");
    // Remove the temporary input from the body
    document.body.removeChild(tempInput);

    // Show the copy notification
    setShowCopyNotification(true);

    // Hide the copy notification after 2 seconds
    setTimeout(() => setShowCopyNotification(false), 2000);
  };
 
  const PayOnline = async () =>
  {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not logged in!");
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
      setPaymentRef(response.data.reference); // Store the payment reference
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
    handleClose()
    setLoading(false);
  }


const verifyPayment = async (reference) => {
  try {
    const response = await axios.post(
      "https://dryklin-e853d5ecea30.herokuapp.com/paystack/verify-payment/",
      { reference: reference },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.message) {
      alert("Payment verified and transaction saved!");
      // You can also update the wallet UI or redirect user after verification
    } else {
      alert("Payment verification failed: " + response.data.error);
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
  }
}

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
            Deposit into your Wallet with virtual Account numbers and get
            credited in a few minutes or pay online.
          </p>
        </div>
        {userProfile ? (
          <Card className="mb-3 card-back">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="text-orange"
                  style={{ fontSize: "12px", paddingInline: "80px" }}
                >
                  {userProfile.virtual_account_bank}
                  <span
                    className="mx-3"
                    onClick={copyToClipboard}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-copy"></i> Copy
                  </span>
                </p>
                <h1
                  className="text-center text-orange"
                  style={{ fontSize: "22px" }}
                >
                  {userProfile.virtual_account_number}
                </h1>
              </div>
              {showCopyNotification && (
                <div
                  style={{
                    position: "absolute",
                    top: "-0px",
                    left: "80%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#ff6b00",
                    color: "white",
                    padding: "4px 4px",
                    borderRadius: "4px",
                    fontSize: "10px",
                  }}
                >
                  Text copied!
                </div>
              )}
            </Card.Body>
          </Card>
        ) : (
          <p>Loading user profile...</p>
        )}
        <Button
          type="submit"
          className="signup-button mt-2 bg-orange"
          onClick={PayOnline}
        >
          
          {loading ? (
              <>
                <Spinner animation="border" size="sm" className="text-white"/> Processing...
              </>
            ) : (
              <>
              <i className="fab fa-internet-explorer px-3"></i>
                Pay Online
              </>
            )}
        </Button>

        {paymentUrl && (
        <div>
          <p>Redirecting to payment...</p>
          {/* Redirect to Paystack and then verify payment */}
          {setTimeout(() => {
            window.location.href = paymentUrl;
          }, 3000)}
        </div>
      )}


        {paymentRef && (
        <div>
          <button onClick={() => verifyPayment(paymentRef)}>
            Verify Payment
          </button>
        </div>
      )}
      </Modal.Body>
    </Modal>
  );
};

export default FundWallet;

import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import "./RequestOrder.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RequestOrder = ({
  show,
  handleNext,
  handleClose,
  pickupData,
  deliveryData,
  selectedItems,
  total,
  orderData,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    const fetchWalletData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            "https://dryklin-e853d5ecea30.herokuapp.com/api/wallet/",
            {
              params: { email: user.email },
            }
          );

          console.log("API Response:", response.data);

          if (response.data && response.data.wallet) {
            const walletData = response.data.wallet; // Directly use the wallet amount

            // Set the wallet balance directly, since walletData is not an array
            setWalletBalance(walletData);
          } else {
            console.error("Unexpected response structure:", response.data);
          }
        } catch (error) {
          console.error(
            "Error fetching wallet data:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        console.error("User data not found in localStorage.");
      }
    };

    fetchWalletData();
  }, [user]);

  const isValidData = orderData && total !== undefined;
  useEffect(() => {
    if (
      orderData &&
      pickupData &&
      deliveryData &&
      selectedItems &&
      total !== undefined
    ) {
      console.log("All Data is Ready:");
      console.log("Order Data:", orderData);
      console.log("Pickup Data:", pickupData);
      console.log("Delivery Data:", deliveryData);
      console.log("Selected Items:", selectedItems);
      console.log("Total Amount:", total);
    } else {
      console.warn("Some data is missing!");
    }
  }, [orderData, pickupData, deliveryData, selectedItems, total]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  let deliveryFee = 0;
  if (deliveryData === "express") {
    deliveryFee = total * 0.25; // 25% of the total amount
  } else {
    deliveryFee = 1000; // Or some other logic for standard delivery
  }

  var total_charge = deliveryFee + orderData.subTotal;
  const handleSelectPaymentOption = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleSubmit = async () => {
    const orderDetails = {
      user: user.id, // Assuming user object has an ID field
      sub_total: orderData.subTotal,
      delivery_fee: deliveryFee,
      service_charge: orderData.serviceCharge,
      total: total_charge,
      wallet_balance: total_charge,
      pickup_location: "",
      delivery_type: deliveryData,
      is_paid:
        selectedPaymentOption === "wallet" || selectedPaymentOption === "online"
          ? true
          : false,
      items: selectedItems.map((item) => ({
        cloth_name: item.name,
        quantity: item.quantity,
      })),
      // Pickup data
      pickup: {
        location: pickupData.location,
        selected_date: pickupData.selectedDate,
        selected_time: pickupData.selectedTime,
      },
    };
    if (walletBalance < total_charge) {
      Swal.fire({
        title: "Insufficient Balance!",
        text: "Insufficient balance in wallet, please deposit money in wallet or pay online.",
        icon: "warning",
        showCancelButton: true, // Show the cancel button
        confirmButtonText: "Deposit Money", // Text for the "OK" button
        cancelButtonText: "Cancel", // Text for the "Cancel" button
        reverseButtons: true, // Reverse the order of the buttons (optional)
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle the case when "Deposit Money" is clicked
          navigate("/wallet");
          // You can add navigation logic here to redirect to a deposit page
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle the case when "Pay Online" is clicked

          // Add logic to handle the online payment option
          handleClose();
        }
      });
    } else {
      try {
        // Fetch CSRF token
        const csrfResponse = await axios.get(
          "https://dryklin-e853d5ecea30.herokuapp.com/api/csrfs/"
        );
        const csrfToken = csrfResponse.data.csrfToken;
        console.warn("CSRF Token:", csrfToken);

        // Convert formData to JSON if it's not already
        const orderDataJson = JSON.stringify(orderDetails);

        // Send login request
        const response = await axios.post(
          "https://dryklin-e853d5ecea30.herokuapp.com/api/order/",
          orderDataJson,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken, // Include CSRF token in headers
            },
          }
        );

        // Check response status instead of response.ok
        if (response.status === 200 && response.data.success) {
          Swal.fire({
            title: "Success!",
            text: "Your Order is being Processed!",
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            willClose: () => {
              handleClose();
            },
          });
        } else {
          Swal.fire({
            title: "error!",
            text: "Failed to Submit the Form!",
            icon: "error",
            confirmButtonText: "OK",
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
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
      }
    }
  };

  // That is used for initiate payment
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
        { amount: total_charge, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      localStorage.setItem("online", "online");
      setPaymentUrl(response.data.payment_url);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      handleClose();
    }
  };

  if (selectedPaymentOption === "wallet") {
    handleSubmit();
  } else if (selectedPaymentOption === "online") {
    initiatePayment();
    
  }

  useEffect(() => {
    if (paymentUrl) {
      // Redirect to Paystack payment page after setting the payment URL
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);
  return (
    <>
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

          {isValidData ? (
            <>
              <div className="d-flex justify-content-between">
                <span>Sub-total</span>
                <span className="fw-bold">
                  ₦{orderData.subTotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Delivery Fee</span>
                <span className="fw-bold">₦{deliveryFee.toFixed(2)}</span>
              </div>
              {deliveryData === "express" ? (
                <div className="d-flex justify-content-between mt-2">
                  <span></span>
                  <span className="fw-bold text-orange">Express</span>
                </div>
              ) : (
                ""
              )}
              <hr />
              <div className="d-flex justify-content-between">
                <strong className="fw-bold">Total</strong>
                <strong className="text-orange">
                  ₦{total_charge.toFixed(2)}
                </strong>
              </div>

              <h3 className="text-orange" style={{ fontSize: "18px" }}>
                Choose payment method
              </h3>
              <div>
                <Row className="desktop-row">
                  <Col md={5} className="mx-4">
                    <Card
                      onClick={() => handleSelectPaymentOption("wallet")}
                      className={`delivery-card ${
                        selectedPaymentOption === "wallet" ? "selected" : ""
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
                            {selectedPaymentOption === "wallet" && (
                              <i className="fa fa-check"></i>
                            )}
                          </div>
                        </Col>
                        <Col md={8}>
                          <h3 style={{ fontSize: "14px" }} className="pt-2">
                            Wallet (₦{total_charge})
                          </h3>
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  <Col md={5}>
                    <Card
                      onClick={() => handleSelectPaymentOption("online")}
                      className={`delivery-card ${
                        selectedPaymentOption === "online" ? "selected" : ""
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
                            {selectedPaymentOption === "online" && (
                              <i className="fa fa-check"></i>
                            )}
                          </div>
                        </Col>
                        <Col md={8}>
                          <h3
                            style={{ fontSize: "16px" }}
                            className="pt-2 px-2"
                          >
                            Pay Online
                          </h3>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>

                <Card
                  onClick={() => handleSelectPaymentOption("wallet")}
                  className={`delivery-card-custom ${
                    selectedPaymentOption === "wallet" ? "selected-custom" : ""
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
                        selectedPaymentOption === "wallet"
                          ? "#ff6b00"
                          : "transparent",
                      marginBottom: "10px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {selectedPaymentOption === "wallet" && (
                      <i className="fa fa-check" style={{ color: "#fff" }}></i>
                    )}
                  </div>
                  <p
                    className="delivery-content-custom"
                    style={{ fontSize: "16px", margin: 0 }}
                  >
                    Wallet (₦{total_charge})
                  </p>
                </Card>

                <Card
                  onClick={() => handleSelectPaymentOption("online")}
                  className={`delivery-card-custom ${
                    selectedPaymentOption === "online" ? "selected-custom" : ""
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
                        selectedPaymentOption === "online"
                          ? "#ff6b00"
                          : "transparent",
                      marginBottom: "10px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {selectedPaymentOption === "online" && (
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
                onClick={handleSubmit}
              >
                Pay Now
              </Button>
            </>
          ) : (
            <p>Loading order details...</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

RequestOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  pickupData: PropTypes.object,
  deliveryData: PropTypes.object,
  selectedItems: PropTypes.array,
  total: PropTypes.number,
  orderData: PropTypes.shape({
    subTotal: PropTypes.number,
    deliveryFee: PropTypes.number,
    serviceCharge: PropTypes.number,
    total: PropTypes.number,
  }),
};

export default RequestOrder;

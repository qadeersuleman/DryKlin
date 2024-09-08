import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Use react-router for getting query params
import axios from "axios";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference"); // Get the reference from the URL

  useEffect(() => {
    if (reference) {
      // Verify the payment when the user lands on this page
      verifyPayment(reference);
    }
  }, [reference]);

  const verifyPayment = async (reference) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/paystack/verify-payment/",
        { reference: reference },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        Swal.fire({
          title: "Success!",
          text: "Payment Recieved Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
          willClose: () => {
            navigate("/");
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
      Swal.fire({
        title: "Error!",
        text: "Internal Server Issue!",
        icon: "error",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }
  };

  return <></>;
};

export default PaymentSuccess;

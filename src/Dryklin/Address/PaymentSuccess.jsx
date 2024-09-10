import { useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Wallet.css"
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference"); // Get the reference from the URL
  const data = localStorage.getItem("online")

  // Wrapping verifyPayment in useCallback to avoid unnecessary re-renders and dependency issues
  const verifyPayment = useCallback(async (reference) => {
    try {
      const response = await axios.post(
        "https://dryklin-e853d5ecea30.herokuapp.com/paystack/verify-payment/",
        { reference: reference , data : data},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem('online');

      if (response.data.message) {
        Swal.fire({
          title: "Success!",
          text: "Payment Received Successfully!",
          icon: "success",
          customClass: {
            popup: 'my-swal',
          },
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
          willClose: () => {
            navigate("/wallet"); 
          },
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to verify payment!",
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
  }, [navigate]);

  useEffect(() => {
    if (reference) {
      verifyPayment(reference); // Call verifyPayment when the reference is available
    }
  }, [reference, verifyPayment]);

  return null; // This component doesn't return any visible elements
};

export default PaymentSuccess;

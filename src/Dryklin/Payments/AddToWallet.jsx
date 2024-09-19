import React, { useState } from "react";
import axios from "axios";

const AddToWallet = () => {
  const [amount, setAmount] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentRef, setPaymentRef] = useState("");

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not logged in!");
      return;
    }
    try {
      const csrfResponse = await axios.get(
        "https://dryklins-1a9d97937409.herokuapp.com/api/csrfs/"
      );
      const csrfToken = csrfResponse.data.csrfToken;

      const response = await axios.post(
        "https://dryklins-1a9d97937409.herokuapp.com/initiate-payment/",
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
  };

  // Function to verify payment
  const verifyPayment = async (reference) => {
    try {
      const response = await axios.post(
        "https://dryklins-1a9d97937409.herokuapp.com/paystack/verify-payment/",
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
  };

  return (
    <div>
      <h2>Add Money to Wallet</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Add to Wallet</button>

      {paymentUrl && (
        <div>
          <p>Redirecting to payment...</p>
          {/* Redirect to Paystack and then verify payment */}
          {setTimeout(() => {
            window.location.href = paymentUrl;
          }, 3000)}
        </div>
      )}

      {/* Automatically verify payment after redirection */}
      {paymentRef && (
        <div>
          <button onClick={() => verifyPayment(paymentRef)}>
            Verify Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToWallet;


// import React, { useState } from 'react';
// import axios from 'axios';

// const AddToWallet = () => {
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);  // Loading state

//   const handlePayment = async () => {
//     console.log("Payment process started");  // Debugging log

//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!user) {
//       alert("User not logged in!");
//       return;
//     }

//     try {
//       setLoading(true);

//       const csrfResponse = await axios.get('https://dryklin-e853d5ecea30.herokuapp.com/api/signup/');
//       const csrfToken = csrfResponse.data.csrfToken;

//       const response = await axios.post('http://localhost:8000/initiate-payment/',
//         { amount: amount, email: user.email },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//         }
//       );

//       const { reference } = response.data;

//       console.log("Paystack setup initialized");  // Debugging log

//       const handler = window.PaystackPop.setup({
//         key: 'pk_test_6980a4edd01345420b40803bd1b6f8e861d819db', // Replace with actual public key
//         email: user.email,
//         amount: amount * 100,
//         reference: reference,
//         callback: function(response) {
//           console.log('Payment successful', response);  // Debugging log
//           setLoading(false);
//         },
//         onClose: function() {
//           console.log('Payment modal closed');  // Debugging log
//           setLoading(false);
//         }
//       });

//       console.log("Opening Paystack modal");  // Debugging log
//       handler.openIframe();

//     } catch (error) {
//       console.error('Payment initiation failed:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Money to Wallet</h2>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Enter amount"
//       />
//       <button onClick={handlePayment} disabled={loading}>
//         {loading ? 'Processing...' : 'Add to Wallet'}
//       </button>

//       {loading && (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//           <div className="spinner"></div> {/* Add a spinner here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddToWallet;

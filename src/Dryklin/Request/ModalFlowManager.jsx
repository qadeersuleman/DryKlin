import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import RequestPickup from './RequestPickup';
import RequestDelivery from './RequestDelivery';
import RequestOrder from './RequestOrder';
import RequestSuccess from './RequestSuccess';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Pickup.css"

const ModalFlowManager = ({ 
  buttonText = "Request Quick Pickup", 
  buttonClass = "get-started-btn px-3 click_btnes", 
  ShowIcon = true,
  fontSize = "12px",
  fontWeight = "500",
  selectedItems = [], 
  total = 0,
  orderData = {} // Accept orderData as a prop
}) => {
  const [step, setStep] = useState(0);
  const [pickupData, setPickupData] = useState({});
  const [deliveryData, setDeliveryData] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const startFlow = () => {
    setStep(1);
  };

  const handleNext = (data) => {
    if (step === 1) {
      setPickupData(data);
    } else if (step === 2) {
      setDeliveryData(data);
    }
    setStep(prevStep => prevStep + 1);
  };

  const handleClose = () => {
    setStep(0);
    setPickupData({});
    setDeliveryData({});
  };

  const showNotLoggedInAlert = () => {
    Swal.fire({
      title: 'Not Logged In',
      text: 'You need to sign in to continue!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sign In',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
        
    },
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signin');
      }
    });
  };

  return (
    <>
      {user ? (
        <Button className={buttonClass} onClick={startFlow} style={{ fontSize, fontWeight }}>
          {buttonText}
          {/* {ShowIcon && <i className="fas fa-arrow-right mx-1" style={{ fontSize }}></i>} */}
        </Button>
      ) : (
        <Button className={buttonClass} onClick={showNotLoggedInAlert} style={{ fontSize }}>
          {buttonText}
          {ShowIcon && <i className="fas fa-arrow-right mx-1" style={{ fontSize }}></i>}
        </Button>
      )}

      {step === 1 && (
        <RequestPickup show={step === 1} handleNext={handleNext} handleClose={handleClose} />
      )}
      {step === 2 && (
        <RequestDelivery show={step === 2} handleNext={handleNext} handleClose={handleClose} />
      )}
      {step === 3 && (
        <RequestOrder
          show={step === 3}
          handleNext={handleNext}
          handleClose={handleClose}
          pickupData={pickupData}
          deliveryData={deliveryData}
          selectedItems={selectedItems}
          total={total}
          orderData={orderData} // Pass orderData to RequestOrder
        />
      )}
      {step === 4 && <RequestSuccess show={step === 4} handleClose={handleClose} />}
    </>
  );
};

export default ModalFlowManager;

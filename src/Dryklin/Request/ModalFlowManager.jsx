import React, { useState } from 'react';
import RequestPickup from './RequestPickup';
import RequestDelivery from './RequestDelivery';
import RequestOrder from './RequestOrder';
import RequestSuccess from './RequestSuccess';
import { Button } from 'react-bootstrap';

const ModalFlowManager = ({ buttonText = "Request Pickup", buttonClass = "get-started-btn px-3", ShowIcon = true }) => {
  const [step, setStep] = useState(0);
  const [pickupData, setPickupData] = useState({});
  const [deliveryData, setDeliveryData] = useState({});

  const startFlow = () => {
    setStep(1); // Start from the first modal (RequestPickup)
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
    setStep(0); // Close all modals and reset the flow
    setPickupData({});
    setDeliveryData({});
  };

  return (
    <>
      <Button className={buttonClass} onClick={startFlow}>
        {buttonText} 
        { ShowIcon && <i className='fas fa-arrow-right'></i>}
      </Button>

      {step === 1 && (
        <RequestPickup 
          show={step === 1} 
          handleNext={handleNext} 
          handleClose={handleClose} 
        />
      )}
      {step === 2 && (
        <RequestDelivery 
          show={step === 2} 
          handleNext={handleNext} 
          handleClose={handleClose} 
        />
      )}
      {step === 3 && (
        <RequestOrder 
          show={step === 3} 
          handleClose={handleClose} 
          pickupData={pickupData} 
          deliveryData={deliveryData}
        />
      )}
      {step === 4 && (
        <RequestSuccess 
          show={step === 4} 
          handleClose={handleClose} 
        />
      )}
    </>
  );
};

export default ModalFlowManager;

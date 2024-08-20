import React, { useState } from 'react';
import RequestPickup from './RequestPickup';
import RequestDelivery from './RequestDelivery';
import RequestOrder from './RequestOrder';
import RequestSuccess from './RequestSuccess';
import { Button } from 'react-bootstrap';

const ModalFlowManager = () => {
  const [step, setStep] = useState(0);

  const startFlow = () => {
    setStep(1); // Start from the first modal (RequestPickup)
  };

  const handleNext = () => {
    console.log("Current step:", step); // Debugging step value
    setStep(prevStep => prevStep + 1);
  };

  const handleClose = () => {
    setStep(0); // Close all modals and reset the flow
  };

  return (
    <>
      <Button className="get-started-btn px-3" onClick={startFlow}>
        Request Pickup <i className='fas fa-arrow-right'></i>
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
          handleNext={handleNext} 
          handleClose={handleClose} 
        />
      )}
      {step === 4 && (
        <RequestSuccess 
          show={step === 4} 
          handleNext={handleNext} 
          handleClose={handleClose} 
        />
      )}
    </>
  );
};

export default ModalFlowManager;

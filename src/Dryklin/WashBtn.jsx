import React, { useState, useEffect } from 'react';
import RequestPickup from './Address/RequestPickup';
import Address from './Address/Address';
import PaymentTypes from './Address/PaymentTypes';

const Washbnt = () => {
    const [step, setStep] = useState(1);
  
    const handleNext = () => {
      setStep(step + 1);
    };
  
    const handleBack = () => {
      setStep(step - 1);
    };
  
    return (
      <div>
        {step === 1 && <RequestPickup handleNext={handleNext} />}
        {step === 2 && <Address handleNext={handleNext} handleBack={handleBack} />}
        {step === 3 && (
          <PaymentTypes show={step === 3} handleClose={handleBack} />
        )}
      </div>
  );
};

export default Washbnt;

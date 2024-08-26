import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your form has been submitted successfully!', {
      position: "center",  // Directly use a string for position
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyForm;

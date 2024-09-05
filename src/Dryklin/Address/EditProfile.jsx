import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;
const locations = [
  'Ibadan, Nigeria',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ'
];

const EditProfile = ({ show, handleNext, handleClose }) => {
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.warn(storedUser);
    }
  }, []);

   // Through this get addresses
   useEffect(() => {
    const fetchAddresses = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get('https://dryklin-e853d5ecea30.herokuapp.com/api/addresses/', {
            params: { email: user.email },
          });
          setAddresses(response.data.addresses);
        } catch (error) {
          console.error('Error fetching addresses:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('User data not found in localStorage.');
      }
    };

    fetchAddresses();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.put('https://dryklin-e853d5ecea30.herokuapp.com/api/update_profile/', {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      });
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.status === 200 && response.data.success) {
        toast.success('Your form has been submitted successfully!', {
          position: 'top-center', // Use string 'top-center' here
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          onClose: () => handleClose(),
        });
      } else {
        toast.error('Failed to submit the form. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          
        });
      }
      } catch (error) {
          toast.error('An error occurred. Please try again later.', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
          });
      }
  };
  
  

  return (
    <>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <button style={{ border: "none" }} className="bg-light" onClick={handleClose}>
            <i className="fas fa-chevron-left pt-1"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3 className='mt-2'>Edit Account</h3>
          <p style={{fontSize : "14px"}}>Edit your profile by clicking on the field you want to make changes to.</p>
        </div>
        <Form className='Request-form' style={{marginTop : "-40px"}} onSubmit={handleSubmit}>
          {/* First Name */}
          <Form.Group controlId="formFirstName">
            <Form.Label className="input-labels">First Name</Form.Label>
            {user && (
              <Form.Control
                type="text"
                name="first_name"
                value={user.first_name}
                placeholder="Enter first name"
                className="input-data"
                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              />
            )}
          </Form.Group>

          {/* Last Name */}
          <Form.Group controlId="formLastName">
            <Form.Label className="input-labels">Last Name</Form.Label>
            {user && (
              <Form.Control
                type="text"
                name="last_name"
                value={user.last_name}
                placeholder="Enter last name"
                className="input-data"
                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              />
            )}
          </Form.Group>

          <Form.Group controlId="formemail">
            <Form.Label className="input-labels">Email</Form.Label>
            {user && (
              <Form.Control
                type="text"
                name="email"
                disabled
                value={user.email}
                placeholder="Enter your email"
                className="input-data"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            )}
          </Form.Group>

          <Form.Group controlId="formphone">
            <Form.Label className="input-labels">Phone Number</Form.Label>
            {
              user ? <Form.Control
              type="text"
              name="phone"
              disabled
              value={user.phone_number}
              placeholder="Enter your phone number"
              className="input-data"
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            />
            : 
            <Form.Control
                type="text"
                name="phone"
                disabled
                placeholder="Enter your phone number"
                className="input-data"
                onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              />
            }
          </Form.Group>

          {/* Location Input */}
          <Form.Group controlId="formCityState">
            <Form.Label className="input-labels">Location</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-data"
            >
              <option value="" disabled>Select your location</option>
              {addresses.map((address, index) => (
                <option key={index} value={address.address}>{address.address}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="signup-button mt-2 bg-orange"
          >
            <i className='fa fa-check px-2'></i>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    <ToastContainer />
    </>
    
  );
};

export default EditProfile;

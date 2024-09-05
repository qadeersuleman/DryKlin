import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const getDayName = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
};

const generateUpcomingDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);

    const dayName = getDayName(futureDate);
    const dateNumber = futureDate.getDate();

    dates.push({ day: dayName, date: dateNumber.toString() });
  }

  return dates;
};

const times = ['10AM - 12PM', '12PM - 2PM', '2PM - 4PM', '4PM - 6PM'];

const RequestPickup = ({ show, handleNext, handleClose }) => {
  const [addresses, setAddresses] = useState([]);
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // Initialize with an empty string
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [dates, setDates] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({}); // State for storing error messages
  const user = JSON.parse(localStorage.getItem('user'));


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



  useEffect(() => {
    setDates(generateUpcomingDates());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {};
    if (firstName === null) newErrors.firstName = 'First Name is required';
    if (lastName === null) newErrors.lastName = 'Last Name is required';
    if (location === null) newErrors.location = 'Location is required';
    if (!selectedDate) newErrors.selectedDate = 'Date is required'; // Add date validation

    // If there are errors, set the errors state and don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      firstName,
      lastName,
      location,
      selectedDate,
      selectedTime
    };
    handleNext(data); // Pass all data to the next step
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="form-heading">
          <button style={{ border: "none" }} className="bg-light" onClick={handleClose}>
            <i className="fas fa-chevron-left pt-1"></i>
          </button>
          <span className="mx-3">Back</span>
          <h3 className=''>Request Pickup</h3>
          <p>Fill in your details below to request a pickup.</p>
        </div>
        <Form onSubmit={handleSubmit} className='Request-form'>
          {/* First Name */}
          <Form.Group controlId="formFirstName">
            <Form.Label className="input-labels">First Name</Form.Label>
            <Form.Control
              type="text"
              value={user.first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className="input-data"
              isInvalid={!!errors.firstName} // Set isInvalid to true if there's an error
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Last Name */}
          <Form.Group controlId="formLastName">
            <Form.Label className="input-labels">Last Name</Form.Label>
            <Form.Control
              type="text"
              value={user.last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              className="input-data"
              isInvalid={!!errors.lastName} // Set isInvalid to true if there's an error
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Location Input */}
          <Form.Group controlId="formCityState">
            <Form.Label className="input-labels">City, State</Form.Label>
            <Form.Control
              as="select"
              value={addresses}
              onChange={(e) => setLocation(e.target.value)}
              className="input-data"
              isInvalid={!!errors.location} // Set isInvalid to true if there's an error
            >
              <option value="" disabled>Select your location</option>
              {addresses.map((address, index) => (
                <option key={index} value={address.address}>{address.address}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Save for Future Use */}
          <Form.Group>
            <Form.Check type="checkbox" label="Save for future use" className='px-4' />
          </Form.Group>

          {/* Date Picker with Horizontal Scrolling */}
          <div className="date-picker">
            <div id="dateContainer" className="date-container" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
              {dates.map((date, index) => (
                <div 
                  key={index} 
                  className={`date-item ${selectedDate === date.date ? 'selected' : ''}`} 
                  onClick={() => setSelectedDate(date.date)}
                  style={{
                    display: 'inline-block',
                    width: '60px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginRight: '10px',
                    backgroundColor: selectedDate === date.date ? '#ff6600' : 'transparent',
                    color: selectedDate === date.date ? '#fff' : '#000',
                    borderRadius: '8px',
                    border: selectedDate === date.date ? '2px solid #ff6600' : '1px solid #ccc',
                  }}
                >
                  <div>{date.day}</div>
                  <div>{date.date}</div>
                </div>
              ))}
            </div>
            {/* Error message for date selection */}
            {errors.selectedDate && (
              <div style={{ color: 'red', marginTop: '5px' }}>{errors.selectedDate}</div>
            )}
          </div>

          {/* Time Slot Picker */}
          <Form.Group controlId="formTimeSlot">
            <Form.Label className="input-labels">Time Slot</Form.Label>
            <Form.Control as="select" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="input-data">
              {times.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="signup-button mt-2 bg-orange"
          >
            Request Pickup
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestPickup;

import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ'
];

const dates = [
  { day: 'Sun', date: '17' },
  { day: 'Mon', date: '18' },
  { day: 'Tue', date: '19' },
  { day: 'Wed', date: '20' },
  { day: 'Thu', date: '21' },
  { day: 'Fri', date: '22' },
  { day: 'Sat', date: '23' },
  { day: 'Sun', date: '17' },
  { day: 'Mon', date: '18' },
  { day: 'Tue', date: '19' },
  { day: 'Wed', date: '20' },
  { day: 'Thu', date: '21' },
  { day: 'Fri', date: '22' },
  { day: 'Sat', date: '23' },
];

const times = ['10AM - 12PM', '12PM - 2PM', '2PM - 4PM', '4PM - 6PM'];

const RequestPickup = ({ show, handleNext, handleClose }) => {
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedTime, setSelectedTime] = useState(times[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext(); // Move to the next step, which will show the next modal
  };

  const scrollDates = (direction) => {
    const dateContainer = document.getElementById('dateContainer');
    dateContainer.scrollBy({
      left: direction === 'left' ? -100 : 100,
      behavior: 'smooth'
    });
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
              name="first_name"
              placeholder="Enter first name"
              className="input-data"
            />
          </Form.Group>

          {/* Last Name */}
          <Form.Group controlId="formLastName">
            <Form.Label className="input-labels">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Enter last name"
              className="input-data"
            />
          </Form.Group>

          {/* Location Input */}
          <Form.Group controlId="formCityState">
            <Form.Label className="input-labels">City, State</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-data"
            >
              <option value="" disabled>Select your location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </Form.Control>
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
                  marginRight : "10px",
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

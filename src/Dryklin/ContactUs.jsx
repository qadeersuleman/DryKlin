import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactUs.css'; // Import custom CSS
import Footer from "./Footer";
import MyForm from "../MyForm"

const ContactUs = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('')

  // State for CSRF token (if needed)
  const [csrfToken, setCsrfToken] = useState('');

  // Function to handle form submission
  const fetchUserEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setUserEmail(user.email);
    } else {
      console.error('No user email found in localStorage');
    }
    <MyForm />
  };

  useEffect(() => {
    fetchUserEmail()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      // CSRF token fetching logic, if your Django backend requires it.
      const csrfResponse = await axios.get('http://127.0.0.1:8000/api/csrfs/');
      setCsrfToken(csrfResponse.data.csrfToken);
      console.warn('CSRF Token:', csrfResponse.data.csrfToken);
      alert(userEmail)
      // Data to send to backend
      const data = {
        userEmail : userEmail,
        name: name,
        email: email,
        message: message,
      };

      // Sending data to backend
      const response = await axios.post('https://dryklin-e853d5ecea30.herokuapp.com/api/contactus/', data, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Add CSRF token if required by Django
        },
      });

      alert('Message sent successfully!');
      console.log('Server Response:', response.data);

      // Clear form after submission
      setName('');
      setEmail('');
      setMessage('');

    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      alert('Error sending message. Please try again later.');
    }
  };

  return (
    <>
      <Container className="contact-us-container my-5">
        <Row>
          <Col md={6} className="contact-form-container">
            <h3 className="contact-heading">Contact Us</h3>
            <p className="contact-subheading">We’d love to hear from you. Please fill out the form below and we’ll get in touch with you as soon as possible.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  className="contact-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="contact-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Your message"
                  className="contact-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="contact-submit-button">
                Send Message
              </Button>
            </Form>
          </Col>
          <Col md={6} className="contact-info">
            <h3 className="contact-heading">Our Information</h3>
            <p><strong>Address:</strong> 7a, Lagoonvale Street, Kolapo Ishola GRA Akobo, Ibadan</p>
            <p><strong>Phone:</strong> +234 123 456 7890</p>
            <p><strong>Email:</strong> contact@dryklin.com</p>
            <p><strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUs;

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactUs.css'; // Import custom CSS
import Footer from "./Footer"

const ContactUs = () => {
  return (
    <>
     <Container className="contact-us-container my-5">
      <Row>
        <Col md={6} className="contact-form-container">
          <h3 className="contact-heading">Contact Us</h3>
          <p className="contact-subheading">We’d love to hear from you. Please fill out the form below and we’ll get in touch with you as soon as possible.</p>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" className="contact-input" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" className="contact-input" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Your message" className="contact-input" />
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

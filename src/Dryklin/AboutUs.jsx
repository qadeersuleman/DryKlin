import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css'; // Import custom CSS
import Footer from './Footer';
import CustomNavbar from './Authentication/CustomNavbar';

const AboutUs = () => {
  return (
    <>
    <CustomNavbar />
    <Container className="about-us-container my-5">
      <Row>
        <Col md={6} className="about-image-container">
          <Image src="/Dryklin/MOCKUPS/2.jpg" fluid className="about-image" />
        </Col>
        <Col md={6} className="about-info">
          <h1 className="about-heading">About Us</h1>
          <p className="about-text">
            Welcome to DryKlin, your trusted partner for all your laundry needs. Founded in 2023, we are dedicated to providing top-notch laundry services with a focus on convenience and quality. Our mission is to make your life easier by offering reliable and efficient laundry solutions.
          </p>
          <p className="about-text">
            Our team is committed to ensuring that every item we handle receives the utmost care and attention. From pick-up to delivery, we strive to exceed your expectations and deliver fresh, clean clothes right to your door.
          </p>
          <p className="about-text">
            At DryKlin, we believe in using the latest technology and eco-friendly practices to provide you with the best possible service. Thank you for choosing us, and we look forward to serving you!
          </p>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  );
};

export default AboutUs;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <div className="footer-brand">
              <img src="/Dryklin/PNGS/13.png" alt="DryKlin Logo" className="footer-logo" />
              <p className="footer-text">
                At DryKlin, we believe in making laundry simple, convenient, and affordable. Our reliable pick-up and delivery service ensures your clothes are cleaned to perfection, saving you time and effort. With a commitment to quality and customer satisfaction, DryKlin is your trusted partner for all your laundry needs.
              </p>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5>QUICK LINKS</h5>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>HELP</h5>
            <ul className="footer-links">
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <p className="footer-address">
              <i className="fas fa-map-marker-alt"></i> 7a, Lagoonvale Street, Kolapo Ishola GRA Akobo, Ibadan
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-right">
            <ul className="social-icons">
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <p className="footer-copyright text-center">
          Copyright ©2024, All Rights Reserved by DryKlin.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

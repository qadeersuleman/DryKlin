import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} style={ {marginRight : "100px"} }>
            <div className="footer-brand">
              {/* Replace the src with the actual logo path */}
              <img src="path-to-your-logo.png" alt="DryKlin Logo" className="footer-logo" />
              <p className="footer-text">
                At DryKlin, we believe in making laundry simple, convenient, and affordable. Our reliable pick-up and delivery service ensures your clothes are cleaned to perfection, saving you time and effort. With a commitment to quality and customer satisfaction, DryKlin is your trusted partner for all your laundry needs.
              </p>
              
            </div>
          </Col>
          <Col md={3}>
            <h5>QUICK LINKS</h5>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>HELP</h5>
            <ul className="footer-links">
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
            <Col>
            <p className="footer-address">
                <i className="fas fa-map-marker-alt" style={ {fontSize : "15px"}}></i> 7a, Lagoonvale Street, Kolapo Ishola GRA Akobo, Ibadan
              </p>
            </Col>
            <Col md={4} className="text-md-right text-center">
            <ul className="social-icons">
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
            </Col>
        </Row>
        <hr></hr>
            <p className="footer-copyright text-center">
              Copyright ©2024, All Rights Reserved by DryKlin.
            </p>
      </Container>
    </footer>
  );
};

export default Footer;

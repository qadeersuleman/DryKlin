import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomerCare.css";

const CustomerCare = () => {
  return (
    <Container className="customer-care-container">
      <Row>
        <Col>
          <Card className="customer-care-card">
            <Card.Body>
            <Link to="/">
              <button style={ {border : "none"} } className="bg-light text-orange my-3">
                <i className="fas fa-chevron-left pt-3 text-orange" ></i>
              </button>
              
            </Link>
            <span className="mx-3">Back</span>
              <Card.Title className="customer-care-title">Customer Care</Card.Title>
              <Card.Text>
                <h3>We’re Here to Help!</h3>
                <p>
                  At DryKlin, customer satisfaction is our top priority. We are always ready to assist you with any questions, concerns, or issues you may have.
                </p>

                <h3>Contact Us</h3>
                <p>
                  If you need any assistance, feel free to reach out to our customer care team:
                  <ul>
                    <li>By phone: +1-800-123-4567</li>
                    <li>By email: support@dryklin.com</li>
                    <li>Live chat: Available on our website 24/7</li>
                  </ul>
                </p>

                <h3>Frequently Asked Questions (FAQ)</h3>
                <p>
                  For quick answers, check out our <Link to="/faq" className="faq-link">FAQ page</Link>.
                </p>

                <h3>Business Hours</h3>
                <p>
                  Our customer service team is available during the following hours:
                  <ul>
                    <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                    <li>Saturday: 10:00 AM - 4:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </p>

                <h3>Visit Us</h3>
                <p>
                  You can also visit our office at:
                  <br />
                  123 DryKlin Street, Suite 100
                  <br />
                  Lagos, Nigeria
                </p>

                <Button variant="primary" className="contact-button">Contact Us</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerCare;

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <Container className="terms-container">
      <Row>
        <Col>
          <Card className="terms-card">
            <Card.Body>
            <Link to="/">
              <button style={ {border : "none"} } className="bg-light text-orange my-3">
                <i className="fas fa-chevron-left pt-3 text-orange" ></i>
              </button>
            </Link>
              <Card.Title className="terms-title">Terms and Conditions</Card.Title>
              <Card.Text>
                <h3>1. Introduction</h3>
                <p>
                  Welcome to DryKlin. These terms and conditions outline the rules
                  and regulations for the use of DryKlin's Website.
                </p>

                <h3>2. Intellectual Property Rights</h3>
                <p>
                  Other than the content you own, under these Terms, DryKlin and/or
                  its licensors own all the intellectual property rights and
                  materials contained in this Website.
                </p>

                <h3>3. Restrictions</h3>
                <p>
                  You are specifically restricted from all of the following:
                  <ul>
                    <li>Publishing any Website material in any other media;</li>
                    <li>Selling, sublicensing, and/or otherwise commercializing any Website material;</li>
                    <li>Using this Website in any way that is or may be damaging to this Website;</li>
                    <li>Using this Website contrary to applicable laws and regulations.</li>
                  </ul>
                </p>

                <h3>4. Your Privacy</h3>
                <p>Please read our Privacy Policy.</p>

                <h3>5. Limitation of liability</h3>
                <p>
                  In no event shall DryKlin, nor any of its officers, directors,
                  and employees, be held liable for anything arising out of or in
                  any way connected with your use of this Website.
                </p>

                <h3>6. Governing Law & Jurisdiction</h3>
                <p>
                  These Terms will be governed by and interpreted in accordance
                  with the laws of the State of [Your State], and you submit to the
                  non-exclusive jurisdiction of the state and federal courts
                  located in [Your Location] for the resolution of any disputes.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;

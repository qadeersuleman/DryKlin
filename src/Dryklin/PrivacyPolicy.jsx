import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-container">
      <Row>
        <Col>
          <Card className="privacy-card">
            <Card.Body>
            <Link to="/">
              <button style={ {border : "none"} } className="bg-light text-orange my-3">
                <i className="fas fa-chevron-left pt-3 text-orange" ></i>
              </button>
            </Link>
            <span className="mx-3">Back</span>
              <Card.Title className="privacy-title">Privacy Policy</Card.Title>
              <Card.Text>
                <h3>1. Introduction</h3>
                <p>
                  Welcome to DryKlin's Privacy Policy. Your privacy is critically important to us.
                </p>

                <h3>2. Information We Collect</h3>
                <p>
                  We collect several different types of information for various purposes to provide and improve our service to you.
                </p>

                <h3>3. Use of Data</h3>
                <p>
                  DryKlin uses the collected data for various purposes:
                  <ul>
                    <li>To provide and maintain our Service;</li>
                    <li>To notify you about changes to our Service;</li>
                    <li>To allow you to participate in interactive features of our Service when you choose to do so;</li>
                    <li>To provide customer care and support;</li>
                    <li>To provide analysis or valuable information so that we can improve the Service;</li>
                    <li>To monitor the usage of the Service;</li>
                    <li>To detect, prevent, and address technical issues.</li>
                  </ul>
                </p>

                <h3>4. Data Security</h3>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>

                <h3>5. Your Data Protection Rights</h3>
                <p>
                  Depending on your location, you may have the following rights:
                  <ul>
                    <li>The right to access – You have the right to request copies of your personal data.</li>
                    <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                    <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                    <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                  </ul>
                </p>

                <h3>6. Changes to This Privacy Policy</h3>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>

                <h3>7. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                  <ul>
                    <li>By email: support@dryklin.com</li>
                    <li>By visiting this page on our website: www.dryklin.com/contact</li>
                  </ul>
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;

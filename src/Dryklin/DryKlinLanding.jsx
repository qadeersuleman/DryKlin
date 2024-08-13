import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./DryKlinLanding.css"; // Import CSS for styling

const DryKlinLanding = () => {
  return (
    <div className="landing-container">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <div className="image-section">
              <img
                src="/Dryklin/MOCKUPS/2.jpg"
                alt="Delivery Person"
                className="delivery-image"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text-section">
              <div className="text-block" style={{ backgroundColor: "#C2E9FA" }}>
                <span role="img" aria-label="Clock">⏰</span>
                <h3>Wash Away Your Worries</h3>
                <p>
                  With our convenient pick-up and delivery, you can focus on the
                  things you love while we handle the rest, ensuring your clothes are
                  spotless and fresh.
                </p>
              </div>
              <div className="text-block" style={{ backgroundColor: "#FAE0B2" }}>
                <span role="img" aria-label="Laundry">🧺</span>
                <h3>Laundry Made Effortless</h3>
                <p>
                  No more laundry day stress. We bring clean, crisp clothes straight
                  to your door, so you can enjoy more free time and less hassle.
                </p>
              </div>
              <div className="text-block" style={{ backgroundColor: "#D5FAD3" }}>
                <span role="img" aria-label="Money">💰</span>
                <h3>Quality Laundry, Budget-Friendly Prices</h3>
                <p>
                  Experience exceptional laundry services without the hefty price tag.
                  Our affordable plans are designed to keep your clothes fresh and
                  your wallet happy.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DryKlinLanding;

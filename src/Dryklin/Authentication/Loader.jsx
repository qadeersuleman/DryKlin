import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Loader.css';

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Container fluid className="d-flex align-items-center justify-content-center">
  <Row className="text-center">
    <Col>
      <Image src="/Dryklin/PNGS/12.png" className="loader-logo" alt="Logo" />
      {/* <h1 className="loader-text">
        Welcome to Dryklin!
        
      </h1> */}
      {/* <p>
      Loading Your Fresh & Clean Experience...<br></br>
      Get Ready to Discover the Best in Laundry Services
      </p> */}
    </Col>
  </Row>
</Container>

      </div>
    );
  }

  return <>{children}</>;
};

export default Loader;

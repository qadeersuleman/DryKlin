import React from 'react';
import { Button, Row, Col, Image } from 'react-bootstrap';
import './GetInTouch.css';

const GetInTouch = () => {
  return (
    <div className="get-in-touch-container text-center">
      <div className="image-stack">
        <div className="image-item mt-2">
          <Image
            src="/men.jpg"
            roundedCircle
            className="profile-pic"
          />
        </div>
        <div className="image-item">
          <Image
            src="/men.jpg"
            roundedCircle
            className="profile-pic"
          />
        </div>
        <div className="image-item mt-2">
          <Image
            src="men.jpg"
            roundedCircle
            className="profile-pic"
          />
        </div>
      </div>
      <h5>Still have questions?</h5>
      <p>Can’t find the answer you’re looking for? Please chat with our friendly team.</p>
      <Button variant="warning" className="get-in-touch-btn">
        Get in touch →
      </Button>
    </div>
  );
};

export default GetInTouch;

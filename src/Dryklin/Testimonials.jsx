import React from "react";
import Slider from "react-slick";
import "./Testimonials.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Row, Card, Image } from "react-bootstrap";

const testimonials = [
  {
    image: "/1.png",
    name: "Damilola Falodun",
    review:
      "DryKlin has been a game-changer for me! Their pick-up and delivery service is so convenient. My clothes have never looked and felt cleaner!",
    rating: 5,
  },
  {
    image: "/2.png",
    name: "Fu’ad Oladipupo",
    review:
      "DryKlin has been a game-changer for me! Their pick-up and delivery service is so convenient. My clothes have never looked and felt cleaner!",
    rating: 5,
  },
  // Add more testimonials as needed
];

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="testimonials-container">
      <div className="header">
        <div className="badge">1K+ HAPPY DRYKLIN USERS ⭐</div>
        <h2>
          What People are{" "}
          <span className="highlight" style={{ color: "#e86317" }}>
            Saying
          </span>{" "}
          <span role="img" aria-label="smile">
            🥰
          </span>
        </h2>
        <p> Check out reviews and what people are saying about our services.</p>
      </div>
      <div className="testimonial-slider">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-slide">
              <Row>
                <Col md={6}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-image"
                    style={{ maxHeight: "200px" }}
                  />
                </Col>
                <Col md={6}>
                  <div className="testimonial-content">
                    <div className="stars">
                      {"⭐".repeat(testimonial.rating)}
                    </div>
                    <p className="review-text">{testimonial.review}</p>
                    <strong>- {testimonial.name}</strong>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </Slider>
      </div>
      <div className="testimonial-mobile" style={{ display: "none" }}>
        <Card className="text-center p-3 testimonial-card">
          <Image
            src="./1.png"
            roundedCircle
            className="mx-auto mb-3 testimonial-image"
          />
          <div className="star-rating mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-orange">
                &#9733;
              </span>
            ))}
          </div>
          <Card.Text className="testimonial-text">
            DryKlin has been a game-changer for me! Their pick-up and delivery
            service is so convenient. My clothes have never looked and felt
            cleaner!
          </Card.Text>
          <Card.Text className="testimonial-author font-weight-bold">
            - Mazeedat Afape
          </Card.Text>
        </Card>
        <Card className="text-center p-3 testimonial-card">
          <Image
            src="./2.png"
            roundedCircle
            className="mx-auto mb-3 testimonial-image"
          />
          <div className="star-rating mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-orange">
                &#9733;
              </span>
            ))}
          </div>
          <Card.Text className="testimonial-text">
            DryKlin has been a game-changer for me! Their pick-up and delivery
            service is so convenient. My clothes have never looked and felt
            cleaner!
          </Card.Text>
          <Card.Text className="testimonial-author font-weight-bold">
            - Fu'ad Oladipupo
          </Card.Text>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;

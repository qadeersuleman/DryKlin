import React from "react";
import Slider from "react-slick";
import './ImageGrid.css'; // Ensure this is imported for CSS

const ImageGridMob = () => {
  const images = [
    '/Another.png',
    '/women.webp',
    '/Dryklin/MOCKUPS/3.jpg',
    '/download.jpeg',
    '/Dryklin/MOCKUPS/4.jpg',
  ];

  // Settings for React Slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Change slide every 1 second
    arrows: false, // Hide navigation arrows
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false, // Optional: Hide dots on mobile
        }
      }
    ]
  };

  return (
    <div className="image-grid">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageGridMob;

import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./ImageGrid.css"
import ImageGridMob from "./ImageGridMob";
const ImageGrid = () => {

    const imageStyle = {
        borderRadius : "15px",
        objectFit : "cover",
        width : "100%",
        height : "100%"
    }
  return (
    <>
      <Container className="pc-img-grid">
      <Row className="align-items-stretch">
        <Col md={4} lg={4} sm={4} className="mb-3 mb-md-0 col1">
          <div className="h-100">
            <Image
              src="/Another.png"
              alt="Image 1"
              className="img-fluid h-100 w-100 object-fit-cover"
                style={ { borderRadius : "15px"}}
            />
          </div>
        </Col>
        <Col md={8} lg={8} sm={8}>
          <div className="h-100">
            <Image
              src="/women.webp"
              alt="Image 2"
              className="img-fluid h-100 w-100 object-fit-cover box-shadow"
              style={{ maxHeight : "300px", borderRadius : "15px"}}
            />
          </div>
        </Col>
      </Row>
      <Row className="align-items-stretch mt-3">
        <Col md={3} sm={3} lg={3} className="mb-3 mb-md-0">
          <div className="h-100 rounded-image">
            <Image
              src="/Dryklin/MOCKUPS/3.jpg"
              alt="Image 1"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={imageStyle}
            />
          </div>
        </Col>
        <Col md={6} sm={6} lg={6}>
          <div className="h-100 ">
            <Image
              src="/download.jpeg"
              alt="Image 2"
              className="img-fluid h-100 w-100 object-fit-cover box-dhadow"
              style={imageStyle}
            />
          </div>
        </Col>
        <Col md={3} sm={3} lg={3}>
          <div className="h-100">
            <Image
              src="/Dryklin/MOCKUPS/4.jpg"
              alt="Image 2"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={imageStyle}
            />
          </div>
        </Col>
      </Row>
    </Container>

    <Container className="mob-img-grid" style={{display : "none"}}>
      <ImageGridMob />
    </Container>
    </>

    
  );
};

export default ImageGrid;

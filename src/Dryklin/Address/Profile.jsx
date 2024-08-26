import React, { useState, useEffect } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import EditProfile from "./EditProfile";
import "./Wallet.css"
const Profile = () => {
  // Through this we get data form django
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.warn(storedUser);
    }
  }, []);


  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleShow = () => setShowModal(true);

  // Function to close the modal
  const handleClose = () => setShowModal(false);
  return (
    <>
      <h2 className="mx-4 my-4">Account</h2>
      <Container>
        <Card style={{ width: "100%", borderRadius: "12px", padding: "20px" }}>
          <Card.Body>
            <div className="">
              <div className="d-flex">
                <img
                  src="./girls.jpeg" // Replace with actual image URL
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div>
                <Row className="mt-5">
                  <Col>
                  {user && (
                    <h5>{user.first_name} {user.last_name} </h5>
                  )}
                    
                    {user && (
                      <p className="my-2 profile-sec">
                      <i className="fas fa-envelope profile-sec px-1" />{" "}
                        {user.email}
                    </p>
                    )}
                    {user && (
                        <p className="my-2 profile-sec">
                        <i className="fas fa-phone profile-sec px-1" />{" "}
                        {user.phone_number}
                      </p>
                    )}
                    
                    
                  </Col>
                  <Col>
                    <h5>Location</h5>
                    <p className="mb-1 profile-sec py-2">
                      <i className="fas fa-map-marker-alt profile-sec" />{" "}
                      Ibadan, Nigeria
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center my-5">
              <div>
                <b>
                  <p>Password</p>
                </b>
                <p>********</p>
              </div>
              <Button
                variant="link"
                className="text-decoration-none text-orange profile-change-btn"
              >
                <i className="fas fa-edit profile-change-btn" /> Change
              </Button>
            </div>

            <div className="pc-view" >
            <Button variant="outline-warning mx-3 profile-btn btn1">
              <i className="fas fa-trash-alt" /> Delete account
            </Button>

            <Button
              variant="warning"
              className="text-white mx-5 profile-btn btn2"
              onClick={handleShow}
            >
            
              <i className="fas fa-edit" /> Edit details
            </Button>
            </div>
            <div className="mobile-view " style={{display : "none"}}>
            <Button variant="outline-warning profile-btn btn1 py-3 px-4" 
              style={{fontSize : "16px"}}
            >
              <i className="fas fa-trash-alt" /> Delete account
            </Button>

            <Button
              variant="warning"
              className="text-white profile-btn btn2 py-3 px-4" 
              style={{fontSize : "20px", marginLeft : "50px"}}
              onClick={handleShow}
            >
            
              <i className="fas fa-edit" /> Edit details
            </Button>
            </div>
            <EditProfile show={showModal} handleClose={handleClose} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;

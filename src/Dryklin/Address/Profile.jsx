import React, { useState, useEffect } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";
import "./Wallet.css";
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
      <div className="d-flex mx-5 my-4">
      <Link to="/">
                <button style={{ border: "none" }} className="bg-light">
                  <i className="fas fa-chevron-left pt-3"></i>
                </button>
              </Link>
              
              <h2 className="text-center text-orange my-2 mx-3">Account</h2>
      </div>
      
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
                      <h5 className="account-mob-head">
                        {user.first_name} {user.last_name}{" "}
                      </h5>
                    )}

                    {user && (
                      <p className="my-2 profile-sec">
                        <i className="fas fa-envelope profile-sec mx-2" />{" "}
                        {user.email}
                      </p>
                    )}
                    {user && (
                      <p className="my-2 profile-sec">
                        <i className="fas fa-phone profile-sec mx-2" />{" "}
                        {user.phone_number}
                      </p>
                    )}
                    { user && (
                      <p className="mb-1 profile-sec py-2 loc-mob" style={{display : "none"}}>
                      <i className="fas fa-map-marker-alt profile-sec mx-2" />{" "}
                      Ibadan, Nigeria
                    </p>
                    )}
                  </Col>
                  <Col className="loc-pc">
                    <h5 className="loc-mob-view mx-2 ">Location</h5>
                    <p className="mb-1 profile-sec py-2">
                      <i className="fas fa-map-marker-alt profile-sec mx-2" />{" "}
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
                className="text-decoration-none text-orange profile-change-btn mob-change-btn"
              >
                <i className="fas fa-edit profile-change-btn mob-change-btn" /> Change
              </Button>
            </div>

            <div className="pc-view">
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

            {/* That is mobile size */}
            <div className="mobile-view d-flex gap-2" >
              
                <Button
                variant="outline-warning btn-set-mob"
                style={{ fontSize: "11px" }}
              >
                <i className="fas fa-trash-alt" /> Delete account
              </Button>
                
                <Button
                variant="warning"
                className="text-white bg-orange"
                style={{ fontSize: "12px",marginLeft : "10px" }}
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

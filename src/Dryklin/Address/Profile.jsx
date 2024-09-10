import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, Alert } from "react-bootstrap";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Wallet.css";
import Swal from 'sweetalert2';


const Profile = () => {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // New state for success alert
  const baseUrl = "https://dryklin-e853d5ecea30.herokuapp.com"; // Adjust accordingly

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfResponse = await axios.get(`${baseUrl}/api/csrfs/`);
        setCsrfToken(csrfResponse.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF Token:', error);
      }
    };

    fetchCsrfToken();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setProfileImageUrl(`${baseUrl}${userData.profile_image}`); // Update with base URL
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && user) {
      const formData = new FormData();
      formData.append('profile_image', file);
      formData.append('email', user.email);
  
      try {
        const response = await axios.post(`${baseUrl}/api/upload-profile-image/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "X-CSRFToken": csrfToken,
          },
        });
  
        if (response.data.profile_image_url) {
          const updatedProfileImageUrl = `${baseUrl}${response.data.profile_image_url}`;
          setProfileImageUrl(updatedProfileImageUrl); // Update profile image URL
          
          // Update user in state and localStorage
          const updatedUser = { ...user, profile_image: response.data.profile_image_url };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
  
          // Display success alert using SweetAlert
          Swal.fire({
            title: 'Success!',
            text: 'Profile image uploaded successfully!',
            icon: 'success',
            customClass: {
              popup: 'my-swal',
            },
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const timestampedImageUrl = profileImageUrl ? `${profileImageUrl}?t=${new Date().getTime()}` : "./girls.jpeg";

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
            <div className="position-relative">
              <div className="d-flex">
                <div className="profile-image-wrapper" onClick={handleImageClick} style={{ position: 'relative', cursor: 'pointer' }}>
                  <img
                    src={timestampedImageUrl}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "20px",
                    }}
                  />
                  <div className="camera-icon-overlay d-flex justify-content-center align-items-center">
                    <i className="fas fa-camera text-light text-center" style={{ paddingRight: "25px" }}></i>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />

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

            <div className="pc-view d-flex justify-content-center align-items-center">
              <Button
                variant="warning"
                className="text-white mx-5 profile-btn btn2 text-align-center"
                onClick={handleShow}
                style={{ paddingInline: "300px" }}
              >
                <i className="fas fa-edit" /> Edit details
              </Button>
            </div>

            <div className="mobile-view d-flex gap-2">
              <Button
                variant="warning"
                className="text-white bg-orange"
                style={{ fontSize: "15px", paddingInline: "100px" }}
                onClick={handleShow}
              >
                <i className="fas fa-edit" /> Edit details
              </Button>
            </div>
            <EditProfile show={showModal} handleClose={handleClose} />
          </Card.Body>
        </Card>
      </Container>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="alert-wrapper">
          <Alert variant="success" className="text-center">
            Profile image updated successfully!
          </Alert>
        </div>
      )}
    </>
  );
};

export default Profile;

import { useState, useEffect } from "react";
import { Navbar,Container } from "react-bootstrap";
import { Link} from "react-router-dom";
import "./Navbar.css"; // Import your custom CSS for styling

const BottomNav = () => {
  const [user, setUser] = useState(null);

  // Fetch user data from localStorage once when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      {/* Static Bar for Not Logged-in Users */}
      {!user && (
        <Navbar
          fixed="bottom"
          variant="dark"
          className="justify-content-center bg-orange"
        >
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60px" }}
          >
            <Navbar.Text className="text-center" style={{ color: "white" }}>
              <i className="fas fa-user-circle mx-2"></i> {" "}
              <Link
                to="/signup"
                style={{ textDecoration: "none" }}
              >
                Request Quick Pickup
              </Link>{" "}
              
            </Navbar.Text>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default BottomNav;

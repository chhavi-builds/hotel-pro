import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const UserHome = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/rooms/getallrooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Failed to fetch rooms");
      }
    };
    fetchRooms();
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar bg="white" expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand className="fw-bold text-secondary">SB Hotel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              <span className="me-3 text-muted">Hi, {user.name}</span>
              <Nav.Link onClick={() => navigate("/mybookings")} className="me-2">My Bookings</Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {rooms.map(room => (
            <Col md={4} key={room._id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Img 
                  variant="top" 
                  src={room.photos[0] || "https://picsum.photos/400/300"} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                <Card.Body>
                  <Card.Title className="text-capitalize">Room Type: {room.type}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: "14px" }}>
                    Room Capacity: {room.count} People<br/>
                    Rent: ₹{room.rent} per day<br/>
                    <span className="text-capitalize">Type: {room.type}</span><br/>
                    Description: {room.description}
                  </Card.Text>
                  <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={() => navigate(`/book/${room._id}`, { state: { room } })}
                  >
                    BOOK NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UserHome;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, Card, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchBookings = async () => {
    try {
      const res = await axios.post("http://localhost:8001/api/bookings/getuserbookings", { userid: user.id });
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const cancelBooking = async (bookingid) => {
    try {
      await axios.post("http://localhost:8001/api/bookings/cancelbooking", { bookingid });
      alert("Booking cancelled successfully");
      fetchBookings(); // Refresh the list to show the new status
    } catch (error) {
      alert("Error cancelling booking");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar bg="white" expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand className="fw-bold text-secondary">SB Hotel</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center">
              <span className="me-3 text-muted">Hi, {user.name}</span>
              <Nav.Link onClick={() => navigate("/userhome")} className="me-2">Home</Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h3 className="mb-4 text-center">My Bookings</h3>
        <Row className="justify-content-center">
          {bookings.map(booking => (
            <Col md={8} key={booking._id} className="mb-3">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0 text-capitalize">{booking.type} Room</Card.Title>
                    <Badge bg={booking.status === 'cancelled' ? 'danger' : 'success'}>
                      {booking.status.toUpperCase()}
                    </Badge>
                  </div>
                  <hr />
                  <p className="mb-1"><strong>Booking ID:</strong> {booking._id}</p>
                  <p className="mb-1"><strong>From:</strong> {booking.fromdate} | <strong>To:</strong> {booking.todate}</p>
                  <p className="mb-1"><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                  
                  {booking.status !== 'cancelled' && (
                    <Button 
                      variant="outline-danger" 
                      className="w-100 mt-3"
                      onClick={() => cancelBooking(booking._id)}
                    >
                      CANCEL BOOKING
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
          {bookings.length === 0 && <h5 className="text-center mt-5 text-muted">You have no bookings yet.</h5>}
        </Row>
      </Container>
    </div>
  );
};

export default MyBookings;
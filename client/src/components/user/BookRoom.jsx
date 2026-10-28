import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, Card, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const BookRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({ cardholdername: "", cardnumber: "", cvvcode: "", expmonthyear: "" });

  if (!room) {
    return <Container className="mt-5 text-center"><h4>Room not found. <Button onClick={() => navigate("/userhome")}>Go Back</Button></h4></Container>;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    
    const start = new Date(fromdate);
    const end = new Date(todate);
    
    if (end <= start) return alert("Check-out date must be after check-in date!");

    const diffTime = Math.abs(end - start);
    const totaldays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalAmount = totaldays * room.rent;

    const bookingData = {
      roomid: room._id,
      type: room.type,
      userid: user.id,
      username: user.name,
      fromdate,
      todate,
      totalAmount,
      totaldays,
      phone: Number(phone),
      cardDetails: card
    };

    try {
      await axios.post("http://localhost:8001/api/bookings/bookroom", bookingData);
      alert("Room booked successfully!");
      navigate("/userhome");
    } catch (error) {
      alert("Booking failed. Please check console for details.");
      console.error(error);
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
              <Nav.Link onClick={handleLogout} className="text-danger">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Card className="shadow-sm border-0 mx-auto" style={{ maxWidth: "800px" }}>
          <Card.Header className="bg-primary text-white text-center">
            <h4 className="mb-0">Complete Your Booking</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5>Room Details</h5>
                <img src={room.photos[0] || "https://picsum.photos/400"} alt="room" className="img-fluid rounded mb-3" />
                <p><strong>Type:</strong> {room.type}</p>
                <p><strong>Capacity:</strong> {room.count} People</p>
                <p><strong>Rent:</strong> ₹{room.rent} / day</p>
              </Col>
              
              <Col md={6}>
                <Form onSubmit={handleBook}>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control type="date" required value={fromdate} onChange={(e) => setFromdate(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-out Date</Form.Label>
                    <Form.Control type="date" required value={todate} onChange={(e) => setTodate(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Form.Group>

                  <hr />
                  <h6 className="mb-3">Payment Details</h6>
                  <Form.Control type="text" name="cardholdername" placeholder="Cardholder Name" required className="mb-2" onChange={handleCardChange} />
                  <Form.Control type="number" name="cardnumber" placeholder="Card Number" required className="mb-2" onChange={handleCardChange} />
                  
                  <Row>
                    <Col>
                      <Form.Control type="text" name="expmonthyear" placeholder="MM/YY" required className="mb-3" onChange={handleCardChange} />
                    </Col>
                    <Col>
                      <Form.Control type="number" name="cvvcode" placeholder="CVV" required className="mb-3" onChange={handleCardChange} />
                    </Col>
                  </Row>

                  <Button variant="success" type="submit" className="w-100">CONFIRM & PAY</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default BookRoom;
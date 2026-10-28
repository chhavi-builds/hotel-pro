import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Row, Col, Card } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold text-primary">HotelPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link to="/login" className="nav-link text-dark fw-semibold">Login</Link>
              <Link to="/signup" className="nav-link text-dark fw-semibold">SignUp</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Carousel Section */}
      <Carousel showThumbs={false} autoPlay infiniteLoop transitionTime={500} showStatus={false}>
        <div style={{ height: "60vh" }}>
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80" alt="Hotel View" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          <div className="legend bg-dark bg-opacity-75 p-3 rounded">
            <h3>Welcome to HotelPro</h3>
            <p>Experience luxury and comfort at its finest.</p>
          </div>
        </div>
        <div style={{ height: "60vh" }}>
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80" alt="Room View" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          <div className="legend bg-dark bg-opacity-75 p-3 rounded">
            <h3>Premium Rooms</h3>
            <p>Book your perfect stay with our seamless system.</p>
          </div>
        </div>
      </Carousel>

      {/* About & Preview Section */}
      <Container className="mt-5 mb-5 text-center">
        <h2 className="mb-4 text-secondary">About Our Service</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
          HotelPro provides a robust backend infrastructure that powers efficient booking management, real-time availability tracking, and secure user authentication. Whether you're a boutique hotel looking to streamline operations or a large chain requiring a scalable solution, HotelPro delivers a trusted and seamless hotel management experience.
        </p>
        
        <Row className="mt-5">
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title>Secure Bookings</Card.Title>
                <Card.Text>End-to-end encryption ensures your payment and personal details are always safe.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title>24/7 Management</Card.Title>
                <Card.Text>Admins can track room inventory and manage guests at any time from the dashboard.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title>Instant Confirmations</Card.Title>
                <Card.Text>Real-time database updates mean no double-bookings and instant itinerary generation.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
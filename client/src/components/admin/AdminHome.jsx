import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Button, Form, Table, Card, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";

const AdminHome = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "", count: "", rent: "", type: "Delux", description: "", photo1: "", photo2: "", photo3: ""
  });
  
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const roomRes = await axios.get("http://localhost:8001/api/rooms/getallrooms");
      setRooms(roomRes.data);

      const bookingRes = await axios.get("http://localhost:8001/api/bookings/getallbookings");
      setBookings(bookingRes.data);

      const userRes = await axios.get("http://localhost:8001/api/auth/getallusers");
      setUsers(userRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const roomData = {
      roomNumber: Number(newRoom.roomNumber),
      count: Number(newRoom.count),
      rent: Number(newRoom.rent),
      type: newRoom.type,
      description: newRoom.description,
      photos: [newRoom.photo1, newRoom.photo2, newRoom.photo3]
    };

    try {
      await axios.post("http://localhost:8001/api/rooms/addroom", roomData);
      alert("Room added successfully");
      fetchData(); 
      setNewRoom({ roomNumber: "", count: "", rent: "", type: "Delux", description: "", photo1: "", photo2: "", photo3: "" });
    } catch (error) {
      alert("Error adding room");
    }
  };

  const cancelBooking = async (bookingid) => {
    try {
      await axios.post("http://localhost:8001/api/bookings/cancelbooking", { bookingid });
      alert("Booking cancelled successfully");
      fetchData(); 
    } catch (error) {
      alert("Error cancelling booking");
    }
  };

  return (
    <div>
      <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <h3 className="m-0">HotelPro Admin</h3>
        <div>
          <span className="me-3">Hi, {currentUser.name}</span>
          <Button variant="light" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="container mt-4">
        <Tabs defaultActiveKey="allBookings" className="mb-3">
          
          <Tab eventKey="allBookings" title="ALL BOOKINGS">
            <h4 className="text-center mt-3 mb-4">My Bookings</h4>
            <Row>
              {bookings.map(booking => (
                <Col md={6} key={booking._id} className="mb-4">
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0 text-capitalize">{booking.type} Room</Card.Title>
                        <Badge bg={booking.status === 'cancelled' ? 'danger' : 'success'}>
                          {booking.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="mb-1" style={{ fontSize: "14px" }}><strong>Booking ID:</strong> {booking._id}</p>
                      <p className="mb-1" style={{ fontSize: "14px" }}><strong>From:</strong> {booking.fromdate} | <strong>To:</strong> {booking.todate}</p>
                      <p className="mb-1" style={{ fontSize: "14px" }}><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                      <p className="mb-3" style={{ fontSize: "14px" }}><strong>Customer Phone:</strong> {booking.phone}</p>
                      {booking.status !== 'cancelled' && (
                        <Button variant="outline-danger" className="w-100" onClick={() => cancelBooking(booking._id)}>
                          CANCEL BOOKING
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <p className="text-center mt-3 fw-bold">Total Bookings: {bookings.length}</p>
          </Tab>

          <Tab eventKey="allRooms" title="ALL ROOMS">
            <h4 className="text-center mt-3 bg-primary text-white p-2">Hotel Room Booking History <br/><small>Total Rooms: {rooms.length}</small></h4>
            <Table striped bordered hover className="mt-3 text-center">
              <thead className="table-dark">
                <tr>
                  <th>Room ID</th>
                  <th>Room Number</th>
                  <th>Capacity</th>
                  <th>Rent / Day</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.count}</td>
                    <td>₹ {room.rent}</td>
                    <td><Badge bg="success">{room.type}</Badge></td>
                    <td>{room.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>

          <Tab eventKey="addRoom" title="ADD ROOM">
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "800px" }}>
              <h4 className="text-center text-white bg-primary p-2 rounded">Add a New Room</h4>
              <Form onSubmit={handleAddRoom}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control type="number" name="roomNumber" value={newRoom.roomNumber} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Form.Label>Max. Capacity</Form.Label>
                    <Form.Control type="number" name="count" value={newRoom.count} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Form.Label>Room Rent</Form.Label>
                    <Form.Control type="number" name="rent" value={newRoom.rent} onChange={handleChange} required />
                  </div>
                </div>

                <Form.Label>Room Photos</Form.Label>
                <Form.Control type="text" name="photo1" placeholder="Image 1 URL" value={newRoom.photo1} onChange={handleChange} className="mb-2" required />
                <Form.Control type="text" name="photo2" placeholder="Image 2 URL" value={newRoom.photo2} onChange={handleChange} className="mb-2" />
                <Form.Control type="text" name="photo3" placeholder="Image 3 URL" value={newRoom.photo3} onChange={handleChange} className="mb-3" />

                <Form.Label>Room Type</Form.Label>
                <div>
                  <Form.Check inline type="radio" label="Delux" name="type" value="Delux" checked={newRoom.type === "Delux"} onChange={handleChange} />
                  <Form.Check inline type="radio" label="Non-Delux" name="type" value="Non-Delux" checked={newRoom.type === "Non-Delux"} onChange={handleChange} />
                </div>

                <Form.Label className="mt-3">Room Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={newRoom.description} onChange={handleChange} required />

                <Button variant="primary" type="submit" className="mt-4 w-100">Add Room</Button>
              </Form>
            </div>
          </Tab>

          <Tab eventKey="allUsers" title="ALL USERS">
            <h4 className="text-center mt-3 bg-dark text-white p-2">All Registered Users <br/><small>Total Users: {users.length}</small></h4>
            <Table striped bordered hover className="mt-3 text-center">
              <thead className="table-dark">
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>
                      <Badge bg={u.userType === 'Admin' ? 'success' : 'primary'}>
                        {u.userType}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          
        </Tabs>
      </div>
    </div>
  );
};

export default AdminHome;
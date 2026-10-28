const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");

exports.bookRoom = async (req, res) => {
  try {
    const newBooking = new bookingModel(req.body);
    const booking = await newBooking.save();

    // Update the room's currentbooking array to track occupancy
    const room = await roomModel.findById(booking.roomid);
    room.currentbooking.push({
      bookingid: booking._id,
      fromdate: booking.fromdate,
      todate: booking.todate,
      userid: booking.userid,
      status: booking.status
    });
    await room.save();

    res.status(200).send({ msg: "Room booked successfully", booking });
  } catch (error) {
    res.status(500).send({ msg: "Booking failed", error });
  }
};

// ... existing bookRoom function ...

exports.getUserBookings = async (req, res) => {
  try {
    const { userid } = req.body;
    const bookings = await bookingModel.find({ userid });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ msg: "Failed to fetch bookings", error });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingid } = req.body;
    const booking = await bookingModel.findById(bookingid);
    
    if (!booking) {
      return res.status(404).send({ msg: "Booking not found" });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Note: In a complete production app, you would also remove the booking 
    // from the room's currentbooking array here to free up the dates.
    
    res.status(200).send({ msg: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Failed to cancel booking", error });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ msg: "Failed to fetch all bookings", error });
  }
};
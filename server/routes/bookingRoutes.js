const express = require("express");
const router = express.Router();
const { bookRoom, getUserBookings, cancelBooking, getAllBookings } = require("../controllers/bookingController");

router.post("/bookroom", bookRoom);
router.post("/getuserbookings", getUserBookings);
router.post("/cancelbooking", cancelBooking);
router.get("/getallbookings", getAllBookings); // NEW

module.exports = router;
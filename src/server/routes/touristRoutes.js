const { Router } = require("express");
const usersController = require("../controllers/usersController.js");
const searchController = require("../controllers/searchController.js");
const flightController = require("../controllers/FlightController.js");
const HotelController = require("../controllers/HotelController.js");
const commentActivity = require("../controllers/commentActivity.js");
const commentItinerary = require("../controllers/commentItinerary.js");
const commentTourguid = require("../controllers/commentTourguid.js");
const { cashInPoints } = require("../controllers/usersController.js");

const {
  getAllComplaints,
  updateComplaintById,
  getComplaintsBySubmitterId,
  createComplaint,
} = require("../controllers/userComplaintsController.js");

const {
  createBooking,
  bookHistoricalPlace,
  getBookings,
  cancelBookingHistoricalPlace,
  cancelBooking,
} = require("../controllers/bookingController.js");

const {
  checkout,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  cancelOrder,
} = require("../controllers/orderController.js");

const { sendReceiptEmail } = require('../controllers/SendEmailController');

const router = Router();
/*
    1-get/edit this Tourist details
    2-get (musseum, historicalPlace, activty, itinerary) details by (name, category, tag)
    3-get all (musseum, historicalPlace, activty, itinerary)
    4-get all activty by (price, date, category, rating) 
    5-get all (activty, itinerary) sorted by (price, rating) 
    6-get all itinerary by (price, date, tags, language) 
    7-get all historicalPLaces by tags 
    8-get all products
    9-get all products by name
    10-get all products by price
    11-get all products sorted by rating
*/

router.post("/BookedFlights", flightController.createBooking);
router.get("/getBookFlight/:touristId", flightController.getAllBookingsByid);
router.post("/BookHotel", HotelController.createHotelBooking);
router.get("/getBookHotel/:touristId", HotelController.getAllBookingsByid);
router.get("/profile", usersController.getSingleUser);
router.put("/profile/:id/cash-in-points", cashInPoints);
router.delete("/:id", usersController.deleteUser);
router.put("/update", usersController.updateUser);
// Route for creating a new profile
router.post("/create", usersController.createProfile);
router.put("/updateLoyaltyPoints/:id", usersController.updateLoyaltyPoints);
router.get("/search", searchController.search);
// Route for getting a profile by ID
router.get("/:id", usersController.getProfileById);

// Route for updating a profile by ID
router.put("/:id", usersController.updateProfileById);

router.get("/complaints", getAllComplaints);
router.put("/complaints/:id", updateComplaintById);
router.get("/complaints/:submitterId", getComplaintsBySubmitterId);
router.post("/complaints", createComplaint);

router.post("/bookings", createBooking);
router.post("/bookings/historicalPlace", bookHistoricalPlace);
router.get("/bookings/:touristId", getBookings);
router.put("/bookings/:id/cancel", cancelBooking);
router.put(
  "/bookings/:id/cancel/historicalPlace",
  cancelBookingHistoricalPlace
);

// Routes for Activity Comments
router.post("/comments/activity", commentActivity.createCommentForActivity);
router.get(
  "/comments/activity/:activityId",
  commentActivity.getCommentsByActivity
);

// Routes for Itinerary Comments
router.post("/comments/itinerary", commentItinerary.createCommentForItinerary);
router.get(
  "/comments/itinerary/:itineraryId",
  commentItinerary.getCommentsByItinerary
);

// Routes for Tour Guide Comments
router.post("/comments/tourguide", commentTourguid.createCommentForTourGuide);
router.get(
  "/comments/tourguide/:tourGuideId",
  commentTourguid.getCommentsByTourGuide
);

router.put("/updatewallet", usersController.updateWallet);
router.put("/cashInPoints", usersController.cashInPoints);
router.put("/delete_request/:id", usersController.updateDeleteAccount);

router.get(
  "/getUsersBySavedActivity/:activityId",
  usersController.getUsersBySavedActivity
);
router.get(
  "/getUsersBySavedItinerary/:itineraryId",
  usersController.getUsersBySavedItinerary
);

router.post("/order/checkout", checkout);
router.get("/order/getAllOrders", getAllOrders);
router.get("/order/getOrdersByUserId/:userId", getOrdersByUserId);
router.put("/order/cancel/:id", cancelOrder);

router.post('/bookings/send-receipt', async (req, res) => {
  try {
    await sendReceiptEmail(req.body);
    res.status(200).json({ message: 'Receipt email sent successfully' });
  } catch (error) {
    console.error('Error sending receipt email:', error);
    res.status(500).json({ message: 'Error sending receipt email' });
  }
});

module.exports = router;

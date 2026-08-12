const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { createBooking, getUserBookings } = require('../controllers/bookingController');

router.post('/', verifyToken, createBooking);
router.get('/my', verifyToken, getUserBookings);

module.exports = router;
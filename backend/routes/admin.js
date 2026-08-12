const express = require('express');
const router = express.Router();
const { verifyAdmin, verifyToken } = require('../middleware/authMiddleware');
const {
  getDashboardStats,
  getAllComplaints,
  updateComplaint,
  getAllBookings,
  updateBookingStatus,
  createAnnouncement,
  getAnnouncements
} = require('../controllers/adminController');

router.get('/stats', verifyAdmin, getDashboardStats);
router.get('/complaints', verifyAdmin, getAllComplaints);
router.put('/complaints/:id', verifyAdmin, updateComplaint);
router.get('/bookings', verifyAdmin, getAllBookings);
router.put('/bookings/:id', verifyAdmin, updateBookingStatus);
router.post('/announcement', verifyAdmin, createAnnouncement);
router.get('/announcements', verifyToken, getAnnouncements);

module.exports = router;
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// GET Admin Overview Statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });

    res.json({
      totalUsers,
      totalComplaints,
      pendingComplaints,
      resolvedComplaints
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats: ' + err.message });
  }
});

module.exports = router;
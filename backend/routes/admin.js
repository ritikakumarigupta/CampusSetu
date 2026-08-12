const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');

router.get('/overview', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });

    res.json({
      totalUsers,
      totalComplaints,
      pendingComplaints
    });
  } catch (err) {
    console.error('Admin Overview Error:', err);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

module.exports = router;
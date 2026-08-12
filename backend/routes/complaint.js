const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); // Model path verify karein

// 1. Submit Complaint
router.post('/', async (req, res) => {
  try {
    const { title, category, description, user } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Sabhi fields bharna zaroori hai!' });
    }

    const newComplaint = new Complaint({
      title,
      category,
      description,
      status: 'Pending',
      createdAt: new Date()
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint Raised Successfully!', complaint: newComplaint });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit: ' + err.message });
  }
});

// 2. Fetch All Complaints (To Show Data)
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch complaints: ' + err.message });
  }
});

module.exports = router;
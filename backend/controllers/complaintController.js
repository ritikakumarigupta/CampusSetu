const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newComplaint = new Complaint({
      title,
      category,
      description,
      status: 'Pending',
      createdAt: new Date()
    });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint raised successfully', complaint: newComplaint });
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};
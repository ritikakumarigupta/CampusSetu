const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { category, title, description, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const complaint = new Complaint({
      userId: req.user.id,
      category,
      title,
      description,
      location,
      image
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully!', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create complaint.', error: err.message });
  }
};

exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user complaints.', error: err.message });
  }
};
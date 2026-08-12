const Complaint = require('../models/Complaint');
const RoomBooking = require('../models/RoomBooking');
const Announcement = require('../models/Announcement');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In-Progress' });
    const totalBookings = await RoomBooking.countDocuments();
    const pendingBookings = await RoomBooking.countDocuments({ status: 'Pending' });
    const totalStudents = await User.countDocuments({ role: 'Student' });

    res.status(200).json({
      totalComplaints,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      totalBookings,
      pendingBookings,
      totalStudents
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin stats.', error: err.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name rollNo email').sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints.', error: err.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo },
      { new: true }
    );
    res.status(200).json({ message: 'Complaint updated successfully.', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Error updating complaint.', error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await RoomBooking.find().populate('bookedBy', 'name rollNo email').sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings.', error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await RoomBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Booking status updated successfully.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking status.', error: err.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const announcement = new Announcement({
      title,
      description,
      postedBy: req.user.id
    });
    await announcement.save();
    res.status(201).json({ message: 'Announcement posted successfully!', announcement });
  } catch (err) {
    res.status(500).json({ message: 'Error posting announcement.', error: err.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('postedBy', 'name').sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements.', error: err.message });
  }
};
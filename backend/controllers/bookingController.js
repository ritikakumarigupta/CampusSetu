const RoomBooking = require('../models/RoomBooking');

exports.createBooking = async (req, res) => {
  try {
    const { roomName, date, timeSlot, purpose } = req.body;
    if (!roomName || !date || !timeSlot) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
    const booking = new RoomBooking({ roomName, date, timeSlot, purpose });
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await RoomBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};
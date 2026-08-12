const RoomBooking = require('../models/RoomBooking');

exports.createBooking = async (req, res) => {
  try {
    const { roomName, date, startTime, endTime, purpose } = req.body;

    // Check for conflicting approved bookings
    const conflict = await RoomBooking.findOne({
      roomName,
      date,
      status: 'Approved',
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Room already booked for the selected time slot.' });
    }

    const booking = new RoomBooking({
      roomName,
      date,
      startTime,
      endTime,
      purpose,
      bookedBy: req.user.id
    });

    await booking.save();
    res.status(201).json({ message: 'Booking request submitted successfully!', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting booking.', error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await RoomBooking.find({ bookedBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings.', error: err.message });
  }
};
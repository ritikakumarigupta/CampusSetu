const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  purpose: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('roomBooking', roomBookingSchema);
const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' },
  assignedTo: { type: String, default: 'Unassigned' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
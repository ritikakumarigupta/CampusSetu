const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Lost', 'Found'], required: true },
  location: { type: String },
  status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);
const mongoose = require('mongoose');

const LostFoundSchema = new mongoose.Schema({
  type: { type: String, enum: ['Lost', 'Found'], required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: '' },
  contact: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('LostFound', LostFoundSchema);
const LostFound = require('../models/LostFound');

exports.createItem = async (req, res) => {
  try {
    const { title, description, type, location } = req.body;
    if (!title || !description || !type) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
    const item = new LostFound({ title, description, type, location });
    await item.save();
    res.status(201).json({ message: 'Item added successfully', item });
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await LostFound.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};
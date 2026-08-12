const LostFound = require('../models/LostFound');

exports.getAllItems = async (req, res) => {
  try {
    const items = await LostFound.find().populate('postedBy', 'name email').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items.', error: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { type, itemName, description, location, contact } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newItem = new LostFound({
      type,
      itemName,
      description,
      location,
      contact,
      image,
      postedBy: req.user.id
    });

    await newItem.save();
    res.status(201).json({ message: 'Lost/Found item posted successfully!', item: newItem });
  } catch (err) {
    res.status(500).json({ message: 'Error creating item post.', error: err.message });
  }
};

exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await LostFound.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({ message: 'Status updated successfully.', item });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status.', error: err.message });
  }
};
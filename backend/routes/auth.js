const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Check your User model path

// 1. REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Email Format Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Kripya sahi Email address darj karein!' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password kam se kam 6 characters ka hona chahiye!' });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) {
      return res.status(400).json({ message: 'Ye Email pehle se registered hai!' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'Student'
    });

    await user.save();

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// 2. LOGIN ROUTE (STRICT COMPARISON)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email aur Password dono bharein!' });
    }

    // Check user in Database
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Galat Email ya Password! Account nahi mila.' });
    }

    // Strict Password Checking
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Galat Email ya Password!' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

module.exports = router;
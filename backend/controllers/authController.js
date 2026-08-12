const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, rollNo } = req.body;

    // 1. Email ko lowercase aur trim karein taaki spacing/capitalization error na aaye
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    // 2. Query dynamic banayein taaki khali Roll No par duplicate error na bane
    const queryConditions = [{ email: cleanEmail }];
    if (rollNo && rollNo.trim() !== '') {
      queryConditions.push({ rollNo: rollNo.trim() });
    }

    const existingUser = await User.findOne({ $or: queryConditions });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or Roll/ID already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      email: cleanEmail, 
      password: hashedPassword, 
      role: role || 'Student', 
      rollNo: rollNo ? rollNo.trim() : 'N/A' 
    });

    await user.save();

    res.status(201).json({ message: 'Registration successful! Please login.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Login me bhi email lowercase karein
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    const user = await User.findOne({ email: cleanEmail });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'campussetu_super_secret_jwt_key_2026',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, rollNo: user.rollNo }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login.', error: err.message });
  }
};
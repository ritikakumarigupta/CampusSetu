const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    const adminExists = await User.findOne({ email: 'admin@campussetu.com' });
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      name: 'Campus Admin',
      email: 'admin@campussetu.com',
      password: hashedPassword,
      role: 'Admin'
    });

    await adminUser.save();
    console.log('Default Admin Created Successfully! (Email: admin@campussetu.com, Password: admin123)');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedAdmin();
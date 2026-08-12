const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Announcement = require('./models/Announcement');
require('dotenv').config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campussetu');
    console.log('Database Connected Successfully!');

    // Existing Data Delete Karein
    await User.deleteMany({});
    await Announcement.deleteMany({});

    // Agar Booking model exist karta hai toh use bhi delete karein
    try {
      // capital 'B' ya small 'b' dono try kar lega
      const Booking = require('./models/Booking'); 
      await Booking.deleteMany({});
    } catch (e) {
      try {
        const Booking = require('./models/booking');
        await Booking.deleteMany({});
      } catch (err) {
        console.log('Booking collection skipped (model not needed for basic seed)');
      }
    }

    // Passwords Hash
    const adminPass = await bcrypt.hash('admin123', 10);
    const studentPass = await bcrypt.hash('123456', 10);

    // 1. Admin Account
    const admin = await User.create({
      name: 'Campus Administrator',
      email: 'admin@campus.edu',
      password: adminPass,
      role: 'Admin',
      rollNo: 'ADMIN01'
    });

    // 2. Student Account
    const student = await User.create({
      name: 'Ritika Kumari',
      email: 'ritikakumarigupta372@gmail.com',
      password: studentPass,
      role: 'Student',
      rollNo: '2026CS101'
    });

    // 3. Sample Announcement
    await Announcement.create({
      title: 'Welcome to CampusSetu Portal',
      description: 'CampusSetu portal is live for classroom & lab bookings.',
      postedBy: admin._id
    });

    console.log('\n✅ Sample Data Seeded Successfully!');
    console.log('------------------------------------');
    console.log('🔑 Admin   : admin@campus.edu / admin123');
    console.log('🔑 Student : ritikakumarigupta372@gmail.com / 123456');
    console.log('------------------------------------\n');

    process.exit();
  } catch (error) {
    console.error('❌ Error Seeding Data:', error);
    process.exit(1);
  }
};

seedDB();
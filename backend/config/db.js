const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/complaintsdb';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');

  // Ensure an admin user exists
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'adminpass';
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(adminPass, salt);
      const admin = new User({ name: 'Admin', email: adminEmail, password: hash, role: 'admin' });
      await admin.save();
      console.log('Created default admin user:', adminEmail);
    }
  } catch (err) {
    console.error('Failed to ensure admin user', err);
  }
};

module.exports = connectDB;

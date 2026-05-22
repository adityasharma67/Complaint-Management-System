require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@demo.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin123', salt);
      const admin = new User({
        name: 'Admin User',
        email: 'admin@demo.com',
        password: hash,
        role: 'admin'
      });
      await admin.save();
      console.log('Default admin user created: admin@demo.com / admin123');
    }

    // Create demo user
    const userExists = await User.findOne({ email: 'user@demo.com' });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('password123', salt);
      const user = new User({
        name: 'Demo User',
        email: 'user@demo.com',
        password: hash,
        role: 'user'
      });
      await user.save();
      console.log('Demo user created: user@demo.com / password123');
    }
  } catch (err) {
    console.error('Error creating default users:', err);
  }
};

connectDB()
  .then(async () => {
    await createDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });

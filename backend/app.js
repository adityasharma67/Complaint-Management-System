const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const adminRoutes = require('./routes/admin');
const { signup, login } = require('./controllers/authController');
const { adminOnly } = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

// Provide root-level endpoints as required
app.post('/signup', signup);
app.post('/login', login);
app.use('/complaints', complaintRoutes);
app.use('/admin/complaints', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;

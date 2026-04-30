const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getAllComplaints } = require('../controllers/complaintController');

router.get('/complaints', protect, adminOnly, getAllComplaints);

module.exports = router;

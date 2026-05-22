const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getAllComplaints, updateStatus } = require('../controllers/complaintController');

router.get('/complaints', protect, adminOnly, getAllComplaints);
router.put('/complaints/:id', protect, adminOnly, updateStatus);

module.exports = router;

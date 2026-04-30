const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { createComplaint, getUserComplaints, updateStatus } = require('../controllers/complaintController');

router.post('/', protect, createComplaint);
router.get('/', protect, getUserComplaints);
// Only admins can update status via this endpoint
router.put('/:id', protect, adminOnly, updateStatus);

module.exports = router;

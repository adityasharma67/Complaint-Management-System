const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Missing fields' });

    const complaint = new Complaint({ title, description, userId: req.user.id });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    next(err);
  }
};

exports.getUserComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    next(err);
  }
};

exports.getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = status;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    next(err);
  }
};

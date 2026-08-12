const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const { createComplaint, getUserComplaints } = require('../controllers/complaintController');

router.post('/', verifyToken, upload.single('image'), createComplaint);
router.get('/my', verifyToken, getUserComplaints);

module.exports = router;
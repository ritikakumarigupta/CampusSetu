const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const { getAllItems, createItem, updateItemStatus } = require('../controllers/lostFoundController');

router.get('/', verifyToken, getAllItems);
router.post('/', verifyToken, upload.single('image'), createItem);
router.put('/:id/status', verifyToken, updateItemStatus);

module.exports = router;
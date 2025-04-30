const express = require('express');
const router = express.Router();
const { getFeed,savePost, reportPost, getDashboardData } = require('../controllers/feedController');

const authenticateUser = require('../middleware/authMiddleware');

router.get('/feed',authenticateUser, getFeed);
router.post('/save', authenticateUser, savePost);
router.post('/report', authenticateUser, reportPost);
router.get('/dashboard', authenticateUser, getDashboardData);

module.exports = router;

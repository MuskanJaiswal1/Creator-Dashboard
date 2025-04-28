const express = require('express');
const router = express.Router();
const { getFeed,savePost, reportPost, getDashboardData } = require('../controllers/feedController');

const authenticateUser = require('../middleware/authMiddleware');

router.get('/feed',authenticateUser, getFeed);
router.post('/save', authenticate, savePost);
router.post('/report', authenticate, reportPost);
router.get('/dashboard', authenticate, getDashboardData);

module.exports = router;

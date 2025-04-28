const express = require('express');
const router = express.Router();
const { awardDailyCredits, awardProfileCompletionCredits } = require('../controllers/creditController');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/award-daily-credits', authenticateUser ,awardDailyCredits);
router.post('/award-profile-credits', authenticateUser ,awardProfileCompletionCredits);

module.exports = router;

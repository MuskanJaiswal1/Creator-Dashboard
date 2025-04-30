const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', authenticateUser, getProfile);
router.put('/', authenticateUser, updateProfile);

module.exports = router;

const User = require('../models/User');

const addCredits = async (userId, points) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.credits += points;
  await user.save();
  return user.credits;
};

const awardDailyCredits = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const lastLoginDate = user.lastLogin ? user.lastLogin.toISOString().slice(0, 10) : null;

    if (today !== lastLoginDate) {
      user.credits = await addCredits(userId, 10); // Add 10 credits for login
      user.lastLogin = new Date();
      await user.save();
      return res.status(200).json({ message: 'Credits awarded for daily login', credits: user.credits });
    }

    res.status(400).json({ message: 'Credits already awarded today' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const awardProfileCompletionCredits = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.name && user.email && user.password) {
      user.credits = await addCredits(userId, 50); // Add 50 credits for profile completion
      await user.save();
      return res.status(200).json({ message: 'Credits awarded for profile completion', credits: user.credits });
    }

    res.status(400).json({ message: 'Profile is not complete' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { awardDailyCredits, awardProfileCompletionCredits };

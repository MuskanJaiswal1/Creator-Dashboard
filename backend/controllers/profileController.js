const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      ...user.toObject(),
      isProfileComplete: user.isProfileComplete,
      credits: user.credits,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const wasIncomplete = !user.isProfileComplete;

    Object.assign(user, updates);

    const nowComplete =
      user.bio &&
      user.profilePicture &&
      user.website &&
      user.twitter &&
      user.linkedin &&
      user.github;

    if (nowComplete && !user.isProfileComplete) {
      user.isProfileComplete = true;
      user.credits += 50;
    } else if (!nowComplete && user.isProfileComplete) {
      user.isProfileComplete = false;
    }
    await user.save();
    res.status(200).json({
      message:
        wasIncomplete && nowComplete
          ? 'Profile updated & credits awarded'
          : 'Profile updated',
      credits: user.credits,
      isProfileComplete: user.isProfileComplete,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = { getProfile, updateProfile };

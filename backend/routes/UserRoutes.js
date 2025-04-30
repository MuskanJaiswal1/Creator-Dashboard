const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const protect = require("../middleware/authMiddleware"); 

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name email credits lastLogin");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to get user profile", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

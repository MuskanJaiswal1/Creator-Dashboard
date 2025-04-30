const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 0 },
  lastLogin: { type: Date },

  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "" }, // URL or image filename
  website: { type: String, default: "" },
  twitter: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  isProfileComplete: { type: Boolean, default: false },

  savedPosts: [
    {
      title: String,
      url: String,
      author: String,
    }
  ],
  activities: [
    {
      action: String, 
      title: String,
      timestamp: Date,
    }
  ],
});

module.exports = mongoose.model("User", UserSchema);

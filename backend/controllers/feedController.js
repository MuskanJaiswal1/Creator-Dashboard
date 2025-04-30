const axios = require('axios');
const User = require('../models/User'); 

const savePost = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { title, url, author } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.savedPosts.push({ title, url, author });
    user.activities.push({ action: 'saved', title, timestamp: new Date() });
    user.credits += 10; 
    await user.save();
    res.status(201).json({ message: 'Post saved successfully', credits: user.credits });
  } catch (err) {
    console.error("Error in savePost:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const reportPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, url, author } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.activities.push({ action: 'reported', title, timestamp: new Date() });
    user.credits += 10; 
    await user.save();
    res.status(201).json({ message: 'Post reported successfully' });
  } catch (err) {
    console.error("Error in reportPost:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      credits: user.credits,
      savedPosts: user.savedPosts,
      activities: user.activities,
    });
  } catch (err) {
    console.error("Error in getDashboardData:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// const savePost = (req, res) => {
//   const { title, url, author } = req.body;
//   savedPosts.push({ title, url, author });
//   activities.push({ action: 'saved', title, timestamp: new Date().toISOString() });
//   res.status(201).json({ message: 'Post saved successfully' });
// };

// const reportPost = (req, res) => {
//   const { title, url, author } = req.body;
//   activities.push({ action: 'reported', title, timestamp: new Date().toISOString() });
//   res.status(201).json({ message: 'Post reported successfully' });
// };

// const getDashboardData = (req, res) => {
//   res.status(200).json({
//     credits: activities.length * 10, // Example: 10 credits per save
//     savedPosts,
//     activities,
//   });
// };

const getFeed = async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/programming/top.json?limit=30'); 
    const posts = response.data.data.children.map(post => ({
      title: post.data.title,
      url: post.data.url,
      author: post.data.author,
      created: new Date(post.data.created_utc * 1000).toLocaleString(),
    }));
    
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching feed from Reddit' });
  }
};

module.exports = { getFeed, savePost, reportPost, getDashboardData };

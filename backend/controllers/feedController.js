const axios = require('axios');

let savedPosts = []; 
let activities = []; 

const savePost = (req, res) => {
  const { title, url, author } = req.body;
  savedPosts.push({ title, url, author });
  activities.push({ action: 'saved', title, timestamp: new Date().toISOString() });
  res.status(201).json({ message: 'Post saved successfully' });
};

const reportPost = (req, res) => {
  const { title, url, author } = req.body;
  activities.push({ action: 'reported', title, timestamp: new Date().toISOString() });
  res.status(201).json({ message: 'Post reported successfully' });
};

const getDashboardData = (req, res) => {
  res.status(200).json({
    credits: savedPosts.length * 10, // Example: 10 credits per save
    savedPosts,
    activities,
  });
};

const getFeed = async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/programming/top.json?limit=15'); 
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

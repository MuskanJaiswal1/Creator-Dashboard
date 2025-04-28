import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/feed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          navigate('/login');
        }
      }
    };

    fetchFeed();
  }, [navigate]);

  const handleSave = async (post) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.post('http://localhost:5000/api/save', post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post saved!');
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch((err) => console.error('Could not copy link:', err));
  };

  const handleReport = async (post) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.post('http://localhost:5000/api/report', post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post reported!');
    } catch (error) {
      console.error('Error reporting post', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
      <LogoutButton />
      
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        {posts.map((post, index) => (
          <div key={index} className="p-4 border rounded shadow hover:bg-gray-100">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600">By: {post.author}</p>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Post</a>
            <div className="flex gap-4 mt-2">
              <button onClick={() => handleSave(post)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
              <button onClick={() => handleShare(post.url)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Share</button>
              <button onClick={() => handleReport(post)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;

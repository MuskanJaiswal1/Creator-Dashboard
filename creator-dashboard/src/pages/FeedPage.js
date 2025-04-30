import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          navigate('/login');
        } else {
          toast.error('Failed to load feed.');
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
      toast.success('Post saved! +10 credits!');
    } catch {
      toast.error('Could not save post.');
    }
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link.'));
  };

  const handleReport = async (post) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.post('http://localhost:5000/api/report', post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Post reported. +10 credits!');
    } catch {
      toast.error('Could not report post.');
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Feed</h2>

      <input
        type="text"
        placeholder="Search by title or author..."
        className="w-full mb-6 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="p-4 border rounded shadow-sm hover:bg-gray-50 transition">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">By: {post.author}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Post
              </a>
              <div className="flex flex-wrap gap-3 mt-3">
                <button onClick={() => handleSave(post)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
                  Save
                </button>
                <button onClick={() => handleShare(post.url)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                  Share
                </button>
                <button onClick={() => handleReport(post)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
                  Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Fetching posts!</p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;

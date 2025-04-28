import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [data, setData] = useState({ credits: 0, savedPosts: [], activities: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Credits: {data.credits}</h3>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Saved Posts</h3>
        <ul className="list-disc list-inside">
          {data.savedPosts.map((post, index) => (
            <li key={index}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{post.title}</a> by {post.author}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
        <ul className="list-disc list-inside">
          {data.activities.map((act, index) => (
            <li key={index}>
              {act.action.toUpperCase()} - {act.title} at {new Date(act.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;

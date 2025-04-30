import axios from '../axiosInstance';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const [data, setData] = useState({ credits: 0, savedPosts: [], activities: [] });
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h2>

        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-8 shadow">
          <h3 className="text-xl font-semibold text-blue-700">Credits: {data.credits}</h3>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Saved Posts</h3>
          {data.savedPosts.length > 0 ? (
            <ul className="space-y-2">
              {data.savedPosts.map((post, index) => (
                <li key={index} className="bg-white p-3 rounded shadow border">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {post.title}
                  </a>{" "}
                  <span className="text-gray-500">by {post.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No saved posts yet.</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Recent Activity</h3>
          {data.activities.length > 0 ? (
            <ul className="space-y-2">
              {data.activities.map((act, index) => (
                <li key={index} className="bg-white p-3 rounded shadow border text-sm">
                  <span className="font-medium text-gray-800">{act.action.toUpperCase()}</span> —{" "}
                  {act.title}{" "}
                  <span className="text-gray-500">
                    at {new Date(act.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

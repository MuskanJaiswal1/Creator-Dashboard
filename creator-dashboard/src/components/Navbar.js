import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/feed" className="text-xl font-bold text-blue-600">Creator-Dashboard</Link>
      <div className="space-x-4">
      <Link to="/profile" className="text-gray-700 hover:text-blue-500">Profile</Link>
      <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
        <Link to="/feed" className="text-gray-700 hover:text-blue-500">Feed</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

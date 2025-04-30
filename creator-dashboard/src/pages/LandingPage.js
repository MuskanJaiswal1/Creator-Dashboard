import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Welcome to Creator Dashboard</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

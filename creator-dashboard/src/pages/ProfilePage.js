import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Navbar from "../components/Navbar";
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: "",
  });
  const [credits, setCredits] = useState(0);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile");
        setFormData(res.data);
        setCredits(res.data.credits);
        setProfileComplete(res.data.isProfileComplete);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put("/profile", formData);
      setMessage(res.data.message);
      if (typeof res.data.credits === "number") {
        setCredits(res.data.credits);
        if (res.data.message?.includes("awarded")) {
          toast.success("🎉 You've earned 50 credits for completing your profile!");
        }
      }      
      setProfileComplete(res.data.isProfileComplete);
      
    } catch (err) {
      setMessage("Update failed");
      console.error(err);
    }
  };

  const calculateCompletion = () => {
    const requiredFields = [
      "bio",
      "profilePicture",
      "website",
      "twitter",
      "linkedin",
      "github",
    ];
    const filled = requiredFields.filter((f) => formData[f]);
    return Math.round((filled.length / requiredFields.length) * 100);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        {/* PROFILE CARD */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={formData.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-gray-600 mt-1">
              {formData.bio || "Add a short bio about yourself"}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-blue-600">
              {formData.website && (
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🌐 Website
                </a>
              )}
              {formData.github && (
                <a
                  href={formData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   🔗 GitHub
                </a>
              )}
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 LinkedIn
                </a>
              )}
              {formData.twitter && (
                <a
                  href={formData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Twitter
                </a>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Credits: <strong>{credits}</strong> · Profile Completion:{" "}
              {calculateCompletion()}%
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              {showForm ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* PROFILE COMPLETION BAR */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 h-3 rounded-lg overflow-hidden">
            <div
              className="bg-green-500 h-3 transition-all duration-300"
              style={{ width: `${calculateCompletion()}%` }}
            />
          </div>
          {profileComplete && (
            <p className="text-green-600 text-sm mt-2">
              ✅ Your profile is complete
            </p>
          )}
        </div>

        {/* EDIT FORM */}
        {showForm && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "name",
                "email",
                "bio",
                "profilePicture",
                "website",
                "twitter",
                "linkedin",
                "github",
              ].map((field) => (
                <div key={field} className="flex flex-col">
                  <label
                    htmlFor={field}
                    className="mb-1 text-sm font-medium capitalize text-gray-700"
                  >
                    {field === "profilePicture" ? "Profile Picture URL" : field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                handleUpdate();
                setShowForm(false);
              }}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Save Changes
            </button>

            {message && (
              <p className="mt-4 text-green-600 font-medium text-sm">
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

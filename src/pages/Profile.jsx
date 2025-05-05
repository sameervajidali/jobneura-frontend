import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaLinkedin, FaGlobe, FaUpload, FaDownload } from "react-icons/fa";
import API from "../services/axios";

export default function Profile() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const u = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        website: user.website || "",
        linkedin: user.linkedin || "",
        languages: user.languages || [],
        skills: user.skills || [],
        experience: user.experience || [],
        education: user.education || [],
        avatar: user.avatar || "",
        resume: user.resume || "",
      };
      setProfile(u);
      calculateCompletion(u);
    }
  }, [user]);

  const calculateCompletion = (u) => {
    const fields = [
      u.name,
      u.email,
      u.phone,
      u.location,
      u.skills.length,
      u.languages.length,
      u.experience.length,
      u.education.length,
      u.avatar,
      u.resume,
    ];
    const filled = fields.reduce((count, f) => f ? count + 1 : count, 0);
    setCompletion(Math.round((filled / fields.length) * 100));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, val]) => {
        formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
      });
      if (avatarFile) formData.append("avatar", avatarFile);
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await API.put("/auth/profile", formData);
      login(res.data.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={
                avatarFile
                  ? URL.createObjectURL(avatarFile)
                  : profile.avatar || "/default-avatar.png"
              }
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700">
              <FaUpload />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
            </label>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name || "Your Name"}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          {profile.phone && <p className="text-sm text-gray-500">{profile.phone}</p>}
          {profile.location && <p className="text-sm text-gray-500">{profile.location}</p>}
          <div className="flex space-x-4 mt-4">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                <FaGlobe size={20} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaLinkedin size={20} />
              </a>
            )}
          </div>
          <div className="w-full mt-6">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Profile Completion: {completion}%
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="email"
                value={profile.email}
                disabled
                className="border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 w-full"
              />
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Location"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              rows={3}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
              {resumeFile && <p className="text-sm mt-1">{resumeFile.name}</p>}
              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-indigo-600 hover:underline mt-2"
                >
                  <FaDownload className="mr-1" /> Download Current Resume
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            {message && (
              <p
                className={`text-sm text-center mt-2 ${
                  message.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

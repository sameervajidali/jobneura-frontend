// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaLinkedin,
  FaUpload,
  FaDownload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import API from "../services/axios";
import FileUploader from "../components/FileUploader";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/config.js";

export default function Profile() {
  useEffect(() => {
    // ensure Firebase Auth is initialized before any Storage calls
    signInAnonymously(auth)
      .then(() => console.log("✅ signed in anonymously"))
      .catch((err) => console.error("Auth failed:", err));
  }, []);

  const { user, login, loading: sessionLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // 1️⃣ Wait for session restore
  if (sessionLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading session…</div>
    );
  }

  // 2️⃣ Populate local form state when user loads
  useEffect(() => {
    if (!user) return;

    const u = {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
      website: user.website || "",
      linkedin: user.linkedin || "",
      skills: user.skills || [],
      languages: user.languages || [],
      experience: (user.experience || []).map((e) => ({
        ...e,
        from: e.from?.slice(0, 7) || "",
        to: e.to?.slice(0, 7) || "",
        current: !!e.current,
      })),
      education: (user.education || []).map((e) => ({
        ...e,
        from: e.from?.slice(0, 7) || "",
        to: e.to?.slice(0, 7) || "",
        current: !!e.current,
      })),
      avatar: user.avatar || "",
      resume: user.resume || "",
    };

    setProfile(u);
    calculateCompletion(u);
  }, [user]);

  // 3️⃣ Compute profile % complete
  const calculateCompletion = (u) => {
    let filled = 0;
    [
      "name",
      "email",
      "phone",
      "location",
      "skills",
      "languages",
      "experience",
      "education",
      "avatar",
      "resume",
    ].forEach((key) => {
      const val = u[key];
      if (Array.isArray(val) ? val.length : val) filled++;
    });
    setCompletion(Math.round((filled / 10) * 100));
  };

  // 4️⃣ Generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  // 5️⃣ Add/remove helpers for arrays
  const addItem = (field, value) => {
    if (!value.trim()) return;
    setProfile((p) => ({ ...p, [field]: [...p[field], value.trim()] }));
  };
  const removeItem = (field, idx) => {
    setProfile((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== idx),
    }));
  };

  // 6️⃣ Date-array helpers (experience/education)
  const updateArray = (field, idx, key, val) => {
    const arr = [...profile[field]];
    arr[idx] = { ...arr[idx], [key]: val };
    setProfile((p) => ({ ...p, [field]: arr }));
  };
  const toggleCurrent = (field, idx) => {
    const arr = [...profile[field]];
    arr[idx].current = !arr[idx].current;
    if (arr[idx].current) arr[idx].to = "";
    setProfile((p) => ({ ...p, [field]: arr }));
  };
  const appendEmpty = (field, template) => {
    setProfile((p) => ({ ...p, [field]: [...p[field], template] }));
  };

  // 7️⃣ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await API.put("/auth/profile", profile);
      const { data } = await API.get("/auth/me");
      login(data.user);
      setMessage({ type: "success", text: "Profile updated!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Update failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* — Sidebar */}
        <aside
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center 
                    lg:col-span-1 lg:max-w-xs xl:max-w-sm mx-auto"
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-indigo-100 shadow-md"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition">
              <FaUpload className="w-4 h-4" />
              <FileUploader
                accept="image/*"
                onUpload={({ url }) => {
                  setProfile((p) => ({ ...p, avatar: url }));
                  calculateCompletion({ ...profile, avatar: url });
                }}
              />
            </label>
          </div>

          {/* Name & Contact */}
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            {profile.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{profile.email}</p>
          {profile.phone && (
            <p className="mt-1 text-sm text-gray-500">{profile.phone}</p>
          )}
          {profile.location && (
            <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
          )}

          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600"
              >
                <FaGlobe size={20} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600"
              >
                <FaLinkedin size={20} />
              </a>
            )}
          </div>

          {/* Completion Bar */}
          <div className="w-full mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Profile Completion
            </p>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">{completion}% complete</p>
          </div>
        </aside>

        {/* — Main Form */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name / Email / Phone / Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "phone", "location"].map((f, i) => (
                <input
                  key={i}
                  name={f}
                  value={profile[f]}
                  onChange={handleChange}
                  placeholder={f[0].toUpperCase() + f.slice(1)}
                  className="border rounded px-3 py-2 w-full"
                />
              ))}
              <input
                name="email"
                value={profile.email}
                disabled
                className="border bg-gray-100 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Bio */}
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              rows={3}
              className="border rounded px-3 py-2 w-full"
            />

            {/* Skills & Languages */}
            {["skills", "languages"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field[0].toUpperCase() + field.slice(1)}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile[field].map((item, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
                    >
                      {item}
                      <FaTimes
                        className="ml-1 cursor-pointer"
                        onClick={() => removeItem(field, i)}
                      />
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Add ${field.slice(0, -1)}`}
                    className="flex-1 border rounded px-3 py-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addItem(field, e.target.value);
                        e.target.value = "";
                        calculateCompletion({
                          ...profile,
                          [field]: [...profile[field], e.target.value.trim()],
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        `input[placeholder="Add ${field.slice(0, -1)}"]`
                      );
                      addItem(field, input.value);
                      input.value = "";
                      calculateCompletion({
                        ...profile,
                        [field]: [...profile[field], input.value.trim()],
                      });
                    }}
                    className="bg-indigo-600 text-white px-3 py-2 rounded"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}

            {/* Experience & Education */}
            {["experience", "education"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field[0].toUpperCase() + field.slice(1)}
                </label>
                {profile[field].map((entry, i) => (
                  <div key={i} className="border rounded p-3 mb-2 relative">
                    <FaTimes
                      className="absolute top-2 right-2 cursor-pointer text-red-500"
                      onClick={() => {
                        updateArray(field, i, null, null);
                        calculateCompletion({
                          ...profile,
                          [field]: profile[field].filter((_, j) => j !== i),
                        });
                      }}
                    />
                    {Object.entries(entry).map(([key, val]) =>
                      ["title", "company", "degree", "institution"].includes(
                        key
                      ) ? (
                        <input
                          key={key}
                          value={entry[key]}
                          onChange={(e) =>
                            updateArray(field, i, key, e.target.value)
                          }
                          placeholder={key[0].toUpperCase() + key.slice(1)}
                          className="w-full mb-2 border rounded px-2 py-1"
                        />
                      ) : key === "description" ? (
                        <textarea
                          key={key}
                          value={entry.description}
                          onChange={(e) =>
                            updateArray(field, i, key, e.target.value)
                          }
                          placeholder="Description"
                          rows={2}
                          className="w-full mb-2 border rounded px-2 py-1"
                        />
                      ) : key === "from" || key === "to" ? (
                        <input
                          key={key}
                          type="month"
                          value={entry[key]}
                          disabled={key === "to" && entry.current}
                          onChange={(e) =>
                            updateArray(field, i, key, e.target.value)
                          }
                          className="flex-1 border rounded px-2 py-1 mb-2"
                        />
                      ) : key === "current" ? (
                        <label
                          key={key}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="checkbox"
                            checked={entry.current}
                            onChange={() => toggleCurrent(field, i)}
                          />
                          <span className="text-sm">Present</span>
                        </label>
                      ) : null
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendEmpty(
                      field,
                      field === "experience"
                        ? {
                            title: "",
                            company: "",
                            from: "",
                            to: "",
                            description: "",
                            current: false,
                          }
                        : {
                            degree: "",
                            institution: "",
                            from: "",
                            to: "",
                            description: "",
                            current: false,
                          }
                    )
                  }
                  className="flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  <FaPlus /> Add {field.slice(0, -1)}
                </button>
              </div>
            ))}

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume
              </label>
              <FileUploader
                accept=".pdf,.doc,.docx"
                onUpload={({ url }) => {
                  setProfile((p) => ({ ...p, resume: url }));
                  calculateCompletion({ ...profile, resume: url });
                }}
              />
              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:underline mt-2"
                >
                  <FaDownload className="mr-1" /> Download Current Resume
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700 transition"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </button>

            {message && (
              <p
                className={`text-center mt-2 ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
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

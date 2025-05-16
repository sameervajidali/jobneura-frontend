// src/pages/Profile.jsx
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaLinkedin, FaGlobe, FaPlus, FaTimes, FaUpload, FaDownload
} from "react-icons/fa";
import API from "../services/axios";
import FileUploader from "../components/FileUploader";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/config.js";

export default function Profile() {
  // Auth init for Firebase Storage
  useEffect(() => {
    signInAnonymously(auth)
      .then(() => console.log("✅ signed in anonymously"))
      .catch((err) => console.error("Auth failed:", err));
  }, []);

  const { user, login, loading: sessionLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Populate on mount
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

  // Calculate profile completeness
  const calculateCompletion = (u) => {
    let filled = 0;
    [
      "name", "email", "phone", "location",
      "skills", "languages", "experience",
      "education", "avatar", "resume"
    ].forEach((key) => {
      const val = u[key];
      if (Array.isArray(val) ? val.length : val) filled++;
    });
    setCompletion(Math.round((filled / 10) * 100));
  };

  // Input, chips, array helpers
  const handleChange = (e) => setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  const addItem = (field, value) => {
    if (!value.trim()) return;
    setProfile((p) => ({ ...p, [field]: [...p[field], value.trim()] }));
  };
  const removeItem = (field, idx) => setProfile((p) => ({
    ...p, [field]: p[field].filter((_, i) => i !== idx),
  }));
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
  const appendEmpty = (field, template) =>
    setProfile((p) => ({ ...p, [field]: [...p[field], template] }));

  // Submit
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

  if (sessionLoading || !profile) {
    return <div className="p-8 text-center text-gray-400">Loading profile…</div>;
  }

  // Responsive, premium, clean
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Sidebar / Profile Card --- */}
        <aside className="col-span-1 flex flex-col items-center bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 text-center">
          <div className="relative group">
            <img
              src={profile.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 dark:border-gray-700 shadow"
            />
            {/* Avatar upload overlay */}
            <div className="absolute bottom-1 right-0">
              <FileUploader
                accept="image/*"
                onUpload={({ url }) => {
                  setProfile((p) => ({ ...p, avatar: url }));
                  calculateCompletion({ ...profile, avatar: url });
                }}
                triggerClass="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-9 h-9 shadow transition cursor-pointer"
                icon={<FaUpload className="w-4 h-4" />}
              />
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-gray-50">{profile.name}</h2>
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">{profile.email}</div>
          {profile.phone && <div className="text-gray-500 dark:text-gray-400 text-sm">{profile.phone}</div>}
          {profile.location && <div className="text-gray-500 dark:text-gray-400 text-sm">{profile.location}</div>}
          <div className="flex space-x-4 mt-4 justify-center">
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-300"><FaGlobe size={20} /></a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400"><FaLinkedin size={20} /></a>
            )}
          </div>
          <div className="w-full mt-6">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Profile Completion</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all" style={{ width: `${completion}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">{completion}% complete</p>
          </div>
        </aside>

        {/* --- Main Profile Edit Form --- */}
        <section className="col-span-2 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-10 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Website</label>
                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Short Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={3}
                placeholder="A few lines about you…"
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            {/* Skills & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["skills", "languages"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    {field[0].toUpperCase() + field.slice(1)}
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile[field].map((item, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100 px-2 py-1 rounded-full flex items-center"
                      >
                        {item}
                        <FaTimes
                          className="ml-1 cursor-pointer"
                          onClick={() => removeItem(field, i)}
                        />
                      </span>
                    ))}
                  </div>
                  <ChipInput
                    placeholder={`Add ${field.slice(0, -1)}`}
                    onAdd={(val) => {
                      addItem(field, val);
                      calculateCompletion({
                        ...profile,
                        [field]: [...profile[field], val],
                      });
                    }}
                  />
                </div>
              ))}
            </div>
            {/* Experience & Education */}
            {[["experience", "Experience"], ["education", "Education"]].map(
              ([field, label], idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">{label}</label>
                  {profile[field].map((entry, i) => (
                    <div key={i} className="border rounded-xl p-4 mb-3 relative bg-gray-50 dark:bg-gray-800">
                      <FaTimes
                        className="absolute top-2 right-2 cursor-pointer text-red-500"
                        onClick={() =>
                          setProfile((p) => ({
                            ...p,
                            [field]: p[field].filter((_, j) => j !== i),
                          }))
                        }
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {field === "experience" ? (
                          <>
                            <input
                              value={entry.title}
                              onChange={(e) => updateArray(field, i, "title", e.target.value)}
                              placeholder="Job Title"
                              className="border rounded px-2 py-1"
                            />
                            <input
                              value={entry.company}
                              onChange={(e) => updateArray(field, i, "company", e.target.value)}
                              placeholder="Company"
                              className="border rounded px-2 py-1"
                            />
                          </>
                        ) : (
                          <>
                            <input
                              value={entry.degree}
                              onChange={(e) => updateArray(field, i, "degree", e.target.value)}
                              placeholder="Degree"
                              className="border rounded px-2 py-1"
                            />
                            <input
                              value={entry.institution}
                              onChange={(e) => updateArray(field, i, "institution", e.target.value)}
                              placeholder="Institution"
                              className="border rounded px-2 py-1"
                            />
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <input
                          type="month"
                          value={entry.from}
                          onChange={(e) => updateArray(field, i, "from", e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                        <input
                          type="month"
                          value={entry.to}
                          disabled={entry.current}
                          onChange={(e) => updateArray(field, i, "to", e.target.value)}
                          className={`border rounded px-2 py-1 ${entry.current ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                        />
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={entry.current}
                          onChange={() => toggleCurrent(field, i)}
                          className="mr-2"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Present</span>
                      </div>
                      <textarea
                        value={entry.description}
                        onChange={(e) => updateArray(field, i, "description", e.target.value)}
                        placeholder="Description"
                        rows={2}
                        className="w-full border rounded px-2 py-1 mt-2"
                      />
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
                    className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 hover:underline font-medium mt-2"
                  >
                    <FaPlus /> Add {label}
                  </button>
                </div>
              )
            )}
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Resume</label>
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
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-300 hover:underline mt-2"
                >
                  <FaDownload className="mr-1" /> Download Resume
                </a>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg py-3 font-semibold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 shadow"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </button>
            {message && (
              <div className={`text-center text-base mt-2 font-semibold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {message.text}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

// --- Custom chip input for skills/languages ---
function ChipInput({ placeholder, onAdd }) {
  const inputRef = useRef();
  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="flex-1 border rounded px-2 py-1"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            onAdd(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (inputRef.current.value.trim()) {
            onAdd(inputRef.current.value.trim());
            inputRef.current.value = "";
          }
        }}
        className="bg-indigo-600 dark:bg-indigo-700 text-white px-3 py-1 rounded"
      >
        <FaPlus />
      </button>
    </div>
  );
}

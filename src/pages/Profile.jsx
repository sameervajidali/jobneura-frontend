
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   FaUpload,
//   FaLinkedin,
//   FaGlobe,
//   FaTrash,
//   FaPlus,
// } from "react-icons/fa";
// import API from "../services/axios";

// export default function Profile() {
//   const { user, login } = useAuth();
//   const [profile, setProfile] = useState({
//     skills: [],
//     languages: [],
//     experience: [],
//     education: [],
//   });
  
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [completion, setCompletion] = useState(0);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Init profile state from context
//   useEffect(() => {
//     if (user) {
//       setProfile({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         location: user.location || "",
//         bio: user.bio || "",
//         website: user.website || "",
//         linkedin: user.linkedin || "",
//         languages: user.languages || [],
//         skills: user.skills || [],
//         experience: user.experience || [],
//         education: user.education || [],
//         avatar: user.avatar || "",
//         resume: user.resume || "",
//       });
//       calculateCompletion(user);
//     }
//   }, [user]);

//   const calculateCompletion = (u) => {
//     let total = 10;
//     let completed = 0;
//     if (u.name) completed++;
//     if (u.email) completed++;
//     if (u.phone) completed++;
//     if (u.location) completed++;
//     if ((u.skills || []).length > 0) completed++;
//     if ((u.languages || []).length > 0) completed++;
//     if ((u.experience || []).length > 0) completed++;
//     if ((u.education || []).length > 0) completed++;
//     if (u.avatar) completed++;
//     if (u.resume) completed++;
//     setCompletion(Math.round((completed / total) * 100));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddTag = (e, key) => {
//     if (e.key === "Enter" && e.target.value.trim()) {
//       e.preventDefault();
//       setProfile((prev) => ({
//         ...prev,
//         [key]: [...prev[key], e.target.value.trim()],
//       }));
//       e.target.value = "";
//     }
//   };

//   const handleRemoveTag = (tag, key) => {
//     setProfile((prev) => ({
//       ...prev,
//       [key]: prev[key].filter((t) => t !== tag),
//     }));
//   };

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (e.target.name === "avatar") setAvatarFile(file);
//     if (e.target.name === "resume") setResumeFile(file);
//   };

//   const handleDownloadResume = () => {
//     if (resumeFile) {
//       const url = URL.createObjectURL(resumeFile);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = resumeFile.name;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } else if (profile.resume) {
//       window.open(profile.resume, "_blank");
//     } else {
//       alert("No resume available to download.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);
//     try {
//       const formData = new FormData();
//       for (const key in profile) {
//         const val = profile[key];
//         formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
//       }
//       if (avatarFile) formData.append("avatar", avatarFile);
//       if (resumeFile) formData.append("resume", resumeFile);
//       const res = await API.put("/auth/profile", formData);
//       login(res.data.user);
//       setMessage({ type: "success", text: "Profile updated!" });
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Update failed",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow">
//       <h1 className="text-3xl font-bold mb-4">Profile</h1>

//       <div className="mb-6">
//         <p className="text-gray-700 font-semibold">
//           Profile Completion: {completion}%
//         </p>
//         <div className="h-2 bg-gray-200 rounded-full mt-1">
//           <div
//             className="h-full bg-indigo-600 rounded-full transition-all"
//             style={{ width: `${completion}%` }}
//           ></div>
//         </div>
//       </div>

//       {message && (
//         <div
//           className={`mb-4 p-3 rounded ${
//             message.type === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" className="input" />
//           <input name="email" value={profile.email} disabled className="input bg-gray-100" />
//           <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" className="input" />
//           <input name="location" value={profile.location} onChange={handleChange} placeholder="Location" className="input" />
//         </div>

//         <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Short Bio" className="input w-full" rows={3} />

//         <div className="grid grid-cols-2 gap-4">
//           <div className="relative flex items-center">
//             <FaGlobe className="absolute left-3 text-gray-400" />
//             <input name="website" value={profile.website} onChange={handleChange} placeholder="Website" className="input pl-10" />
//           </div>
//           <div className="relative flex items-center">
//             <FaLinkedin className="absolute left-3 text-blue-600" />
//             <input name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="LinkedIn" className="input pl-10" />
//           </div>
//         </div>

//         {/* Skills & Languages */}
//         <div>
//           <h2 className="font-medium">Skills</h2>
//           <div className="flex flex-wrap gap-2 mb-2">
//             {profile.skills.map((s, i) => (
//               <span key={i} className="tag">{s} <button type="button" onClick={() => handleRemoveTag(s, "skills")}>×</button></span>
//             ))}
//           </div>
//           <input onKeyDown={(e) => handleAddTag(e, "skills")} placeholder="Add skill & press Enter" className="input" />
//         </div>

//         <div>
//           <h2 className="font-medium">Languages</h2>
//           <div className="flex flex-wrap gap-2 mb-2">
//             {profile.languages.map((l, i) => (
//               <span key={i} className="tag">{l} <button type="button" onClick={() => handleRemoveTag(l, "languages")}>×</button></span>
//             ))}
//           </div>
//           <input onKeyDown={(e) => handleAddTag(e, "languages")} placeholder="Add language & press Enter" className="input" />
//         </div>

//         {/* Avatar & Resume */}
//         <div className="flex gap-6 items-center">
//           <div>
//             <img src={avatarFile ? URL.createObjectURL(avatarFile) : profile.avatar || "/default-avatar.png"} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
//             <label className="flex items-center gap-2 mt-2 text-indigo-600 cursor-pointer">
//               <FaUpload /> Upload Avatar
//               <input type="file" name="avatar" className="hidden" onChange={handleFile} />
//             </label>
//           </div>

//           <div>
//             <input type="file" name="resume" onChange={handleFile} className="input" />
//             <button type="button" onClick={handleDownloadResume} className="btn mt-2">
//               Download Resume
//             </button>
//             {resumeFile && <p className="text-sm text-gray-500 mt-1">{resumeFile.name}</p>}
//           </div>
//         </div>

//         <button type="submit" className="w-full btn bg-indigo-600 text-white" disabled={loading}>
//           {loading ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaLinkedin,
  FaGlobe,
  FaUpload,
  FaDownload,
} from "react-icons/fa";
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
      setProfile({
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
      });
      calculateCompletion(user);
    }
  }, [user]);

  const calculateCompletion = (u) => {
    let total = 10;
    let completed = 0;
    if (u.name) completed++;
    if (u.email) completed++;
    if (u.phone) completed++;
    if (u.location) completed++;
    if ((u.skills || []).length > 0) completed++;
    if ((u.languages || []).length > 0) completed++;
    if ((u.experience || []).length > 0) completed++;
    if ((u.education || []).length > 0) completed++;
    if (u.avatar) completed++;
    if (u.resume) completed++;
    setCompletion(Math.round((completed / total) * 100));
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
      for (const key in profile) {
        const val = profile[key];
        formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
      }
      if (avatarFile) formData.append("avatar", avatarFile);
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await API.put("/auth/profile", formData);
      login(res.data.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : profile.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <label className="text-indigo-600 cursor-pointer text-sm flex items-center gap-1 mb-4">
            <FaUpload /> Upload Avatar
            <input type="file" name="avatar" className="hidden" onChange={(e) => setAvatarFile(e.target.files[0])} />
          </label>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          <p className="text-sm text-gray-500">{profile.phone}</p>
          <p className="text-sm text-gray-500">{profile.location}</p>
          <div className="mt-4 space-x-2">
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600"><FaGlobe /></a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600"><FaLinkedin /></a>
            )}
          </div>
          <div className="mt-6 w-full">
            <p className="text-sm font-medium mb-1">Profile Completion: {completion}%</p>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${completion}%` }}></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" className="input" />
              <input name="email" value={profile.email} disabled className="input bg-gray-100" />
              <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" className="input" />
              <input name="location" value={profile.location} onChange={handleChange} placeholder="Location" className="input" />
            </div>
            <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Short Bio" className="input w-full" rows={3} />

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Upload Resume</label>
              <input type="file" name="resume" onChange={(e) => setResumeFile(e.target.files[0])} className="input" />
              {resumeFile && <p className="text-sm mt-1">{resumeFile.name}</p>}
              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-indigo-600 text-sm"
                >
                  <FaDownload className="mr-1" /> Download Current Resume
                </a>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            {message && (
              <p
                className={`text-sm text-center mt-2 ${
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

// // src/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   FaLinkedin,
//   FaUpload,
//   FaDownload,
//   FaPlus,
//   FaTimes,
// } from "react-icons/fa";
// import API from "../services/axios";
// import FileUploader from "../components/FileUploader";
// import { signInAnonymously } from "firebase/auth";
// import { auth } from "../firebase/config.js";

// export default function Profile() {
//   useEffect(() => {
//     // ensure Firebase Auth is initialized before any Storage calls
//     signInAnonymously(auth)
//       .then(() => console.log("✅ signed in anonymously"))
//       .catch((err) => console.error("Auth failed:", err));
//   }, []);

//   const { user, login, loading: sessionLoading } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [completion, setCompletion] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);

//   // 1️⃣ Wait for session restore
//   if (sessionLoading) {
//     return (
//       <div className="p-8 text-center text-gray-500">Loading session…</div>
//     );
//   }

//   // 2️⃣ Populate local form state when user loads
//   useEffect(() => {
//     if (!user) return;

//     const u = {
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       location: user.location || "",
//       bio: user.bio || "",
//       website: user.website || "",
//       linkedin: user.linkedin || "",
//       skills: user.skills || [],
//       languages: user.languages || [],
//       experience: (user.experience || []).map((e) => ({
//         ...e,
//         from: e.from?.slice(0, 7) || "",
//         to: e.to?.slice(0, 7) || "",
//         current: !!e.current,
//       })),
//       education: (user.education || []).map((e) => ({
//         ...e,
//         from: e.from?.slice(0, 7) || "",
//         to: e.to?.slice(0, 7) || "",
//         current: !!e.current,
//       })),
//       avatar: user.avatar || "",
//       resume: user.resume || "",
//     };

//     setProfile(u);
//     calculateCompletion(u);
//   }, [user]);

//   // 3️⃣ Compute profile % complete
//   const calculateCompletion = (u) => {
//     let filled = 0;
//     [
//       "name",
//       "email",
//       "phone",
//       "location",
//       "skills",
//       "languages",
//       "experience",
//       "education",
//       "avatar",
//       "resume",
//     ].forEach((key) => {
//       const val = u[key];
//       if (Array.isArray(val) ? val.length : val) filled++;
//     });
//     setCompletion(Math.round((filled / 10) * 100));
//   };

//   // 4️⃣ Generic input handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((p) => ({ ...p, [name]: value }));
//   };

//   // 5️⃣ Add/remove helpers for arrays
//   const addItem = (field, value) => {
//     if (!value.trim()) return;
//     setProfile((p) => ({ ...p, [field]: [...p[field], value.trim()] }));
//   };
//   const removeItem = (field, idx) => {
//     setProfile((p) => ({
//       ...p,
//       [field]: p[field].filter((_, i) => i !== idx),
//     }));
//   };

//   // 6️⃣ Date-array helpers (experience/education)
//   const updateArray = (field, idx, key, val) => {
//     const arr = [...profile[field]];
//     arr[idx] = { ...arr[idx], [key]: val };
//     setProfile((p) => ({ ...p, [field]: arr }));
//   };
//   const toggleCurrent = (field, idx) => {
//     const arr = [...profile[field]];
//     arr[idx].current = !arr[idx].current;
//     if (arr[idx].current) arr[idx].to = "";
//     setProfile((p) => ({ ...p, [field]: arr }));
//   };
//   const appendEmpty = (field, template) => {
//     setProfile((p) => ({ ...p, [field]: [...p[field], template] }));
//   };

//   // 7️⃣ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage(null);

//     try {
//       await API.put("/auth/profile", profile);
//       const { data } = await API.get("/auth/me");
//       login(data.user);
//       setMessage({ type: "success", text: "Profile updated!" });
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Update failed",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!profile) return null;

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* — Sidebar */}
//         <aside
//           className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center
//                     lg:col-span-1 lg:max-w-xs xl:max-w-sm mx-auto"
//         >
//           {/* Avatar */}
//           <div className="relative">
//             <img
//               src={profile.avatar || "/default-avatar.png"}
//               alt="Avatar"
//               className="w-36 h-36 rounded-full object-cover border-4 border-indigo-100 shadow-md"
//             />
//             <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition">
//               <FaUpload className="w-4 h-4"
//                 accept="image/*"
//                 onUpload={({ url }) => {
//                   setProfile((p) => ({ ...p, avatar: url }));
//                   calculateCompletion({ ...profile, avatar: url });
//                 }}
//               />
//             </label>
//           </div>

//           {/* Name & Contact */}
//           <h2 className="mt-6 text-2xl font-bold text-gray-800">
//             {profile.name}
//           </h2>
//           <p className="mt-1 text-sm text-gray-500">{profile.email}</p>
//           {profile.phone && (
//             <p className="mt-1 text-sm text-gray-500">{profile.phone}</p>
//           )}
//           {profile.location && (
//             <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
//           )}

//           {/* Social Links */}
//           <div className="flex space-x-4 mt-4">
//             {profile.website && (
//               <a
//                 href={profile.website}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="hover:text-indigo-600"
//               >
//                 <FaGlobe size={20} />
//               </a>
//             )}
//             {profile.linkedin && (
//               <a
//                 href={profile.linkedin}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="hover:text-blue-600"
//               >
//                 <FaLinkedin size={20} />
//               </a>
//             )}
//           </div>

//           {/* Completion Bar */}
//           <div className="w-full mt-6">
//             <p className="text-sm font-medium text-gray-700 mb-2">
//               Profile Completion
//             </p>
//             <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-indigo-600 transition-all"
//                 style={{ width: `${completion}%` }}
//               />
//             </div>
//             <p className="mt-1 text-sm text-gray-600">{completion}% complete</p>
//           </div>
//         </aside>

//         {/* — Main Form */}
//         <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
//           <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name / Email / Phone / Location */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {["name", "phone", "location"].map((f, i) => (
//                 <input
//                   key={i}
//                   name={f}
//                   value={profile[f]}
//                   onChange={handleChange}
//                   placeholder={f[0].toUpperCase() + f.slice(1)}
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               ))}
//               <input
//                 name="email"
//                 value={profile.email}
//                 disabled
//                 className="border bg-gray-100 rounded px-3 py-2 w-full"
//               />
//             </div>

//             {/* Bio */}
//             <textarea
//               name="bio"
//               value={profile.bio}
//               onChange={handleChange}
//               placeholder="Short Bio"
//               rows={3}
//               className="border rounded px-3 py-2 w-full"
//             />

//             {/* Skills & Languages */}
//             {["skills", "languages"].map((field, idx) => (
//               <div key={idx}>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {field[0].toUpperCase() + field.slice(1)}
//                 </label>
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {profile[field].map((item, i) => (
//                     <span
//                       key={i}
//                       className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
//                     >
//                       {item}
//                       <FaTimes
//                         className="ml-1 cursor-pointer"
//                         onClick={() => removeItem(field, i)}
//                       />
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     placeholder={`Add ${field.slice(0, -1)}`}
//                     className="flex-1 border rounded px-3 py-2"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         addItem(field, e.target.value);
//                         e.target.value = "";
//                         calculateCompletion({
//                           ...profile,
//                           [field]: [...profile[field], e.target.value.trim()],
//                         });
//                       }
//                     }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const input = document.querySelector(
//                         `input[placeholder="Add ${field.slice(0, -1)}"]`
//                       );
//                       addItem(field, input.value);
//                       input.value = "";
//                       calculateCompletion({
//                         ...profile,
//                         [field]: [...profile[field], input.value.trim()],
//                       });
//                     }}
//                     className="bg-indigo-600 text-white px-3 py-2 rounded"
//                   >
//                     <FaPlus />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Experience & Education */}
//             {["experience", "education"].map((field, idx) => (
//               <div key={idx}>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {field[0].toUpperCase() + field.slice(1)}
//                 </label>
//                 {profile[field].map((entry, i) => (
//                   <div key={i} className="border rounded p-3 mb-2 relative">
//                     <FaTimes
//                       className="absolute top-2 right-2 cursor-pointer text-red-500"
//                       onClick={() => {
//                         updateArray(field, i, null, null);
//                         calculateCompletion({
//                           ...profile,
//                           [field]: profile[field].filter((_, j) => j !== i),
//                         });
//                       }}
//                     />
//                     {Object.entries(entry).map(([key, val]) =>
//                       ["title", "company", "degree", "institution"].includes(
//                         key
//                       ) ? (
//                         <input
//                           key={key}
//                           value={entry[key]}
//                           onChange={(e) =>
//                             updateArray(field, i, key, e.target.value)
//                           }
//                           placeholder={key[0].toUpperCase() + key.slice(1)}
//                           className="w-full mb-2 border rounded px-2 py-1"
//                         />
//                       ) : key === "description" ? (
//                         <textarea
//                           key={key}
//                           value={entry.description}
//                           onChange={(e) =>
//                             updateArray(field, i, key, e.target.value)
//                           }
//                           placeholder="Description"
//                           rows={2}
//                           className="w-full mb-2 border rounded px-2 py-1"
//                         />
//                       ) : key === "from" || key === "to" ? (
//                         <input
//                           key={key}
//                           type="month"
//                           value={entry[key]}
//                           disabled={key === "to" && entry.current}
//                           onChange={(e) =>
//                             updateArray(field, i, key, e.target.value)
//                           }
//                           className="flex-1 border rounded px-2 py-1 mb-2"
//                         />
//                       ) : key === "current" ? (
//                         <label
//                           key={key}
//                           className="flex items-center gap-2 mb-2"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={entry.current}
//                             onChange={() => toggleCurrent(field, i)}
//                           />
//                           <span className="text-sm">Present</span>
//                         </label>
//                       ) : null
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendEmpty(
//                       field,
//                       field === "experience"
//                         ? {
//                             title: "",
//                             company: "",
//                             from: "",
//                             to: "",
//                             description: "",
//                             current: false,
//                           }
//                         : {
//                             degree: "",
//                             institution: "",
//                             from: "",
//                             to: "",
//                             description: "",
//                             current: false,
//                           }
//                     )
//                   }
//                   className="flex items-center gap-1 text-indigo-600 hover:underline"
//                 >
//                   <FaPlus /> Add {field.slice(0, -1)}
//                 </button>
//               </div>
//             ))}

//             {/* Resume Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Resume
//               </label>
//               <FileUploader
//                 accept=".pdf,.doc,.docx"
//                 onUpload={({ url }) => {
//                   setProfile((p) => ({ ...p, resume: url }));
//                   calculateCompletion({ ...profile, resume: url });
//                 }}
//               />
//               {profile.resume && (
//                 <a
//                   href={profile.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center text-indigo-600 hover:underline mt-2"
//                 >
//                   <FaDownload className="mr-1" /> Download Current Resume
//                 </a>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700 transition"
//             >
//               {submitting ? "Saving…" : "Save Changes"}
//             </button>

//             {message && (
//               <p
//                 className={`text-center mt-2 ${
//                   message.type === "success" ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {message.text}
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaLinkedin, FaUpload, FaDownload, FaPlus, FaTimes, FaGlobe
} from "react-icons/fa";
import API from "../services/axios";
import FileUploader from "../components/FileUploader";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/config.js";

export default function Profile() {
  useEffect(() => {
    signInAnonymously(auth).catch((err) => console.error("Auth failed:", err));
  }, []);

  const { user, login, loading: sessionLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Loading...
  if (sessionLoading)
    return <div className="p-8 text-center text-gray-500">Loading session…</div>;

  // Populate on user load
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

  // Completion logic
  const calculateCompletion = (u) => {
    let filled = 0;
    [
      "name", "email", "phone", "location", "skills", "languages",
      "experience", "education", "avatar", "resume",
    ].forEach((key) => {
      const val = u[key];
      if (Array.isArray(val) ? val.length : val) filled++;
    });
    setCompletion(Math.round((filled / 10) * 100));
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  // Array field helpers
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

  // Experience/Education helpers
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

  // Submit handler
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

  // =================== UI START ===================
  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar Card --- */}
        <aside className="w-full lg:w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center p-8 transition-all">
          <div className="relative group mb-2">
            <img
              src={profile.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 dark:border-gray-700 shadow"
            />
            {/* Avatar Upload (shows on hover/focus) */}
            <div className="absolute bottom-2 right-2">
              <FileUploader
                accept="image/*"
                onUpload={({ url }) => {
                  setProfile((p) => ({ ...p, avatar: url }));
                  calculateCompletion({ ...profile, avatar: url });
                }}
                renderTrigger={({ open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full border-2 border-white dark:border-gray-900 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label="Upload avatar"
                  >
                    <FaUpload />
                  </button>
                )}
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h2>
          <div className="text-gray-500 dark:text-gray-400 text-sm">{profile.email}</div>
          {profile.phone && <div className="text-gray-500 dark:text-gray-400 text-sm">{profile.phone}</div>}
          {profile.location && <div className="text-gray-400 dark:text-gray-500 text-xs">{profile.location}</div>}
          {/* Social links */}
          <div className="flex gap-4 mt-4">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                title="Website"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <FaGlobe size={22} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="hover:text-blue-700 dark:hover:text-blue-400"
              >
                <FaLinkedin size={22} />
              </a>
            )}
          </div>
          {/* Completion Bar */}
          <div className="w-full mt-8">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Profile Completion
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-400 dark:text-gray-500 mt-1">
              {completion}% complete
            </div>
          </div>
        </aside>

        {/* --- Main Edit Form --- */}
        <section className="flex-1 min-w-0 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-10 transition-all">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Edit Profile</h3>
            {/* Name, Email, Phone, Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input
                  name="email"
                  value={profile.email}
                  disabled
                  className="input-field bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />
              </div>
            </div>
            {/* Website & LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Website</label>
                <input
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">LinkedIn</label>
                <input
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="input-field"
                />
              </div>
            </div>
            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Short Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="A few lines about you"
                rows={3}
                className="input-field resize-none"
              />
            </div>
            {/* Skills & Languages */}
            {["skills", "languages"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize mb-1">
                  {field}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile[field].map((item, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-2 py-1 rounded-full flex items-center"
                    >
                      {item}
                      <button type="button" className="ml-1 focus:outline-none" onClick={() => removeItem(field, i)}>
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Add ${field.slice(0, -1)}`}
                    className="flex-1 input-field"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        e.preventDefault();
                        addItem(field, e.target.value);
                        e.target.value = "";
                        calculateCompletion({ ...profile, [field]: [...profile[field], e.target.value.trim()] });
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    onClick={(e) => {
                      const input = e.target.parentNode.querySelector("input");
                      if (input.value.trim()) {
                        addItem(field, input.value);
                        input.value = "";
                        calculateCompletion({ ...profile, [field]: [...profile[field], input.value.trim()] });
                      }
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
            {/* Experience & Education */}
            {["experience", "education"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize mb-1">
                  {field}
                </label>
                {profile[field].map((entry, i) => (
                  <div key={i} className="border dark:border-gray-700 rounded-xl p-3 mb-3 relative bg-gray-50 dark:bg-gray-800">
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                      onClick={() => removeItem(field, i)}
                      aria-label="Remove"
                    >
                      <FaTimes />
                    </button>
                    {/* Render form fields */}
                    {Object.entries(entry).map(([key, val]) => {
                      if (["title", "company", "degree", "institution"].includes(key))
                        return (
                          <input
                            key={key}
                            value={val}
                            onChange={(e) => updateArray(field, i, key, e.target.value)}
                            placeholder={key[0].toUpperCase() + key.slice(1)}
                            className="input-field my-1"
                          />
                        );
                      if (key === "description")
                        return (
                          <textarea
                            key={key}
                            value={val}
                            onChange={(e) => updateArray(field, i, key, e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className="input-field my-1"
                          />
                        );
                      if (key === "from" || key === "to")
                        return (
                          <input
                            key={key}
                            type="month"
                            value={val}
                            disabled={key === "to" && entry.current}
                            onChange={(e) => updateArray(field, i, key, e.target.value)}
                            className="input-field my-1"
                          />
                        );
                      if (key === "current")
                        return (
                          <label key={key} className="inline-flex items-center gap-2 ml-1">
                            <input
                              type="checkbox"
                              checked={entry.current}
                              onChange={() => toggleCurrent(field, i)}
                              className="accent-indigo-600"
                            />
                            <span className="text-xs">Present</span>
                          </label>
                        );
                      return null;
                    })}
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
                  className="flex items-center gap-1 text-indigo-600 hover:underline mt-1"
                >
                  <FaPlus /> Add {field.slice(0, -1)}
                </button>
              </div>
            ))}
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Resume
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
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg py-3 font-semibold text-lg shadow-xl transition-all"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </button>
            {message && (
              <p
                className={`text-center mt-2 ${
                  message.type === "success"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </section>
      </div>
      {/* Responsive gap */}
      <style>{`
        .input-field {
          @apply w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition;
        }
      `}</style>
    </div>
  );
}

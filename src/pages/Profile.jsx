// // src/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   FaLinkedin,
//   FaGlobe,
//   FaUpload,
//   FaDownload,
//   FaPlus,
//   FaTimes,
// } from "react-icons/fa";
// import API from "../services/axios";

// export default function Profile() {
//   // 1) pull sessionLoading from context *and* login/setUser
//   const { user, login, setUser, loading: sessionLoading } = useAuth();

//   // 2) local state
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     bio: "",
//     website: "",
//     linkedin: "",
//     skills: [],
//     languages: [],
//     experience: [],
//     education: [],
//     avatar: "",
//     resume: "",
//   });
//   const [newSkill, setNewSkill] = useState("");
//   const [newLanguage, setNewLanguage] = useState("");
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [completion, setCompletion] = useState(0);
//   const [message, setMessage] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   // 3) only show spinner on *initial* load if we truly have no user
//   if (sessionLoading && !user) {
//     return (
//       <div className="p-8 text-center text-gray-500">
//         Loading session…
//       </div>
//     );
//   }

//   // 4) initialize form once we get `user`
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
//       experience: user.experience || [],
//       education: user.education || [],
//       avatar: user.avatar || "",
//       resume: user.resume || "",
//     };
//     setProfile(u);
//     calculateCompletion(u);
//   }, [user]);

//   // 5) profile‐completion
//   const calculateCompletion = (u) => {
//     const total = 10;
//     let filled = 0;
//     if (u.name) filled++;
//     if (u.email) filled++;
//     if (u.phone) filled++;
//     if (u.location) filled++;
//     if (u.skills.length) filled++;
//     if (u.languages.length) filled++;
//     if (u.experience.length) filled++;
//     if (u.education.length) filled++;
//     if (u.avatar) filled++;
//     if (u.resume) filled++;
//     setCompletion(Math.round((filled / total) * 100));
//   };

//   // 6) generic text input handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((p) => ({ ...p, [name]: value }));
//   };

//   // 7) skills + languages
//   const addSkill = () => {
//     if (!newSkill.trim()) return;
//     setProfile((p) => ({ ...p, skills: [...p.skills, newSkill.trim()] }));
//     setNewSkill("");
//   };
//   const removeSkill = (i) =>
//     setProfile((p) => ({
//       ...p,
//       skills: p.skills.filter((_, idx) => idx !== i),
//     }));

//   const addLanguage = () => {
//     if (!newLanguage.trim()) return;
//     setProfile((p) => ({
//       ...p,
//       languages: [...p.languages, newLanguage.trim()],
//     }));
//     setNewLanguage("");
//   };
//   const removeLanguage = (i) =>
//     setProfile((p) => ({
//       ...p,
//       languages: p.languages.filter((_, idx) => idx !== i),
//     }));

//   // 8) experience
//   const handleExperienceChange = (i, field, val) => {
//     const arr = [...profile.experience];
//     arr[i] = { ...arr[i], [field]: val };
//     setProfile((p) => ({ ...p, experience: arr }));
//   };
//   const addExperience = () =>
//     setProfile((p) => ({
//       ...p,
//       experience: [
//         ...p.experience,
//         { title: "", company: "", from: "", to: "", description: "" },
//       ],
//     }));
//   const removeExperience = (i) =>
//     setProfile((p) => ({
//       ...p,
//       experience: p.experience.filter((_, idx) => idx !== i),
//     }));

//   // 9) education
//   const handleEducationChange = (i, field, val) => {
//     const arr = [...profile.education];
//     arr[i] = { ...arr[i], [field]: val };
//     setProfile((p) => ({ ...p, education: arr }));
//   };
//   const addEducation = () =>
//     setProfile((p) => ({
//       ...p,
//       education: [
//         ...p.education,
//         { degree: "", institution: "", from: "", to: "", description: "" },
//       ],
//     }));
//   const removeEducation = (i) =>
//     setProfile((p) => ({
//       ...p,
//       education: p.education.filter((_, idx) => idx !== i),
//     }));

//   // 10) form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage(null);

//     try {
//       const formData = new FormData();
//       // append all fields (arrays → JSON)
//       Object.entries(profile).forEach(([k, v]) => {
//         formData.append(k, Array.isArray(v) ? JSON.stringify(v) : v);
//       });
//       if (avatarFile) formData.append("avatar", avatarFile);
//       if (resumeFile) formData.append("resume", resumeFile);

//       const res = await API.put("/auth/profile", formData);
//       // 11) push into context so everything (navbar, /me, profile) updates immediately
//       setUser(res.data.user);
//       setProfile((_) => ({
//         ...res.data.user,
//         skills: res.data.user.skills || [],
//         languages: res.data.user.languages || [],
//         experience: res.data.user.experience || [],
//         education: res.data.user.education || [],
//       }));
//       calculateCompletion(res.data.user);

//       // also call login() if you rely on its side-effects
//       login(res.data.user);

//       setMessage({ type: "success", text: "Profile updated successfully!" });
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Update failed",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // 12) render
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Sidebar */}
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
//           <div className="relative">
//             <img
//               src={
//                 avatarFile
//                   ? URL.createObjectURL(avatarFile)
//                   : profile.avatar || "/default-avatar.png"
//               }
//               alt="Avatar"
//               className="w-32 h-32 rounded-full object-cover"
//             />
//             <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700">
//               <FaUpload />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => setAvatarFile(e.target.files[0])}
//               />
//             </label>
//           </div>
//           <h2 className="mt-4 text-xl font-semibold text-gray-800">
//             {profile.name || "Your Name"}
//           </h2>
//           <p className="text-sm text-gray-500">{profile.email}</p>
//           {profile.phone && (
//             <p className="text-sm text-gray-500">{profile.phone}</p>
//           )}
//           {profile.location && (
//             <p className="text-sm text-gray-500">{profile.location}</p>
//           )}
//           <div className="flex space-x-4 mt-4">
//             {profile.website && (
//               <a
//                 href={profile.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-indigo-600"
//               >
//                 <FaGlobe size={20} />
//               </a>
//             )}
//             {profile.linkedin && (
//               <a
//                 href={profile.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-blue-600"
//               >
//                 <FaLinkedin size={20} />
//               </a>
//             )}
//           </div>
//           <div className="w-full mt-6">
//             <p className="text-sm font-medium text-gray-700 mb-1">
//               Profile Completion: {completion}%
//             </p>
//             <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-indigo-600"
//                 style={{ width: `${completion}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Form */}
//         <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
//           <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             className="space-y-6"
//           >
//             {/* Basic fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 value={profile.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 name="email"
//                 value={profile.email}
//                 disabled
//                 className="border bg-gray-100 rounded px-3 py-2 w-full"
//               />
//               <input
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 name="location"
//                 value={profile.location}
//                 onChange={handleChange}
//                 placeholder="Location"
//                 className="border rounded px-3 py-2 w-full"
//               />
//             </div>

//             <textarea
//               name="bio"
//               value={profile.bio}
//               onChange={handleChange}
//               placeholder="Short Bio"
//               rows={3}
//               className="border rounded px-3 py-2 w-full"
//             />

//             {/* Skills */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Skills
//               </label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {profile.skills.map((s, i) => (
//                   <span
//                     key={i}
//                     className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
//                   >
//                     {s}{" "}
//                     <FaTimes
//                       className="ml-1 cursor-pointer"
//                       onClick={() => removeSkill(i)}
//                     />
//                   </span>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   placeholder="Add skill"
//                   className="flex-1 border rounded px-3 py-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={addSkill}
//                   className="bg-indigo-600 text-white px-3 py-2 rounded"
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//             </div>

//             {/* Languages */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Languages
//               </label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {profile.languages.map((l, i) => (
//                   <span
//                     key={i}
//                     className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
//                   >
//                     {l}{" "}
//                     <FaTimes
//                       className="ml-1 cursor-pointer"
//                       onClick={() => removeLanguage(i)}
//                     />
//                   </span>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   value={newLanguage}
//                   onChange={(e) => setNewLanguage(e.target.value)}
//                   placeholder="Add language"
//                   className="flex-1 border rounded px-3 py-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={addLanguage}
//                   className="bg-indigo-600 text-white px-3 py-2 rounded"
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//             </div>

//             {/* Experience */}
//             {/* …same as above… */}

//             {/* Education */}
//             {/* …same as above… */}

//             {/* Resume */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Resume
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setResumeFile(e.target.files[0])}
//                 className="border rounded px-3 py-2 w-full"
//               />
//               {resumeFile && (
//                 <p className="mt-1 text-sm">{resumeFile.name}</p>
//               )}
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
//               {submitting ? "Saving..." : "Save Changes"}
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




// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaLinkedin,
  FaGlobe,
  FaUpload,
  FaDownload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import API from "../services/axios";

export default function Profile() {
  // 1️⃣ Pull sessionLoading (renamed), login(), and user out of context
  const {
    user,
    login,
    loading: sessionLoading,
  } = useAuth();

  // 2️⃣ Local state for the form
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    website: "",
    linkedin: "",
    skills: [],
    languages: [],
    experience: [],
    education: [],
    avatar: "",
    resume: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 3️⃣ Show “Loading session…” ONLY while we're restoring a session and have no user yet
  if (sessionLoading && !user) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading session…
      </div>
    );
  }

  // 4️⃣ Whenever `user` changes (login, refresh, or post-update), re-populate the form
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
      experience: user.experience || [],
      education: user.education || [],
      avatar: user.avatar || "",
      resume: user.resume || "",
    };
    setProfile(u);
    calculateCompletion(u);
    // wipe out any lingering file‐inputs
    setAvatarFile(null);
    setResumeFile(null);
  }, [user]);

  // 5️⃣ Compute the “profile completion” bar
  const calculateCompletion = (u) => {
    let filled = 0;
    if (u.name) filled++;
    if (u.email) filled++;
    if (u.phone) filled++;
    if (u.location) filled++;
    if (u.skills.length) filled++;
    if (u.languages.length) filled++;
    if (u.experience.length) filled++;
    if (u.education.length) filled++;
    if (u.avatar) filled++;
    if (u.resume) filled++;
    setCompletion(Math.round((filled / 10) * 100));
  };

  // 6️⃣ Generic text‐input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  // 7️⃣ Skills + Languages helpers
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile((p) => ({
      ...p,
      skills: [...p.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };
  const removeSkill = (i) =>
    setProfile((p) => ({
      ...p,
      skills: p.skills.filter((_, idx) => idx !== i),
    }));

  const addLanguage = () => {
    if (!newLanguage.trim()) return;
    setProfile((p) => ({
      ...p,
      languages: [...p.languages, newLanguage.trim()],
    }));
    setNewLanguage("");
  };
  const removeLanguage = (i) =>
    setProfile((p) => ({
      ...p,
      languages: p.languages.filter((_, idx) => idx !== i),
    }));

  // 8️⃣ Experience helpers
  const handleExperienceChange = (i, field, val) => {
    const arr = [...profile.experience];
    arr[i] = { ...arr[i], [field]: val };
    setProfile((p) => ({ ...p, experience: arr }));
  };
  const addExperience = () =>
    setProfile((p) => ({
      ...p,
      experience: [
        ...p.experience,
        { title: "", company: "", from: "", to: "", description: "" },
      ],
    }));
  const removeExperience = (i) =>
    setProfile((p) => ({
      ...p,
      experience: p.experience.filter((_, idx) => idx !== i),
    }));

  // 9️⃣ Education helpers
  const handleEducationChange = (i, field, val) => {
    const arr = [...profile.education];
    arr[i] = { ...arr[i], [field]: val };
    setProfile((p) => ({ ...p, education: arr }));
  };
  const addEducation = () =>
    setProfile((p) => ({
      ...p,
      education: [
        ...p.education,
        { degree: "", institution: "", from: "", to: "", description: "" },
      ],
    }));
  const removeEducation = (i) =>
    setProfile((p) => ({
      ...p,
      education: p.education.filter((_, idx) => idx !== i),
    }));

  // 🔟 Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      // append all fields, JSON‐stringify arrays
      Object.entries(profile).forEach(([k, v]) =>
        formData.append(k, Array.isArray(v) ? JSON.stringify(v) : v)
      );
      if (avatarFile) formData.append("avatar", avatarFile);
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await API.put("/auth/profile", formData);

      // immediately push the new user into context…
      // login() calls setUser() under the hood and persists hasSession
      login(res.data.user);

      setMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Update failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ✔️ Render
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

          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {profile.name || "Your Name"}
          </h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          {profile.phone && (
            <p className="text-sm text-gray-500">{profile.phone}</p>
          )}
          {profile.location && (
            <p className="text-sm text-gray-500">{profile.location}</p>
          )}

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
        <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Edit Profile
          </h3>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Name / Email / Phone / Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                name="email"
                value={profile.email}
                disabled
                className="border bg-gray-100 rounded px-3 py-2 w-full"
              />
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Location"
                className="border rounded px-3 py-2 w-full"
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

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
                  >
                    {s}{" "}
                    <FaTimes
                      className="ml-1 cursor-pointer"
                      onClick={() => removeSkill(i)}
                    />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill"
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-indigo-600 text-white px-3 py-2 rounded"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.languages.map((l, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
                  >
                    {l}{" "}
                    <FaTimes
                      className="ml-1 cursor-pointer"
                      onClick={() => removeLanguage(i)}
                    />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add language"
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="bg-indigo-600 text-white px-3 py-2 rounded"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Experience & Education (same pattern) */}
            {/* … */}

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume
              </label>
              <input
                type="file"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="border rounded px-3 py-2 w-full"
              />
              {resumeFile && (
                <p className="mt-1 text-sm">{resumeFile.name}</p>
              )}
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
              {submitting ? "Saving..." : "Save Changes"}
            </button>

            {message && (
              <p
                className={`text-center mt-2 ${
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

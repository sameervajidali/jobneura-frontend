// // import React, { useEffect, useState } from "react";
// // import { useAuth } from "../contexts/AuthContext";
// // import { FaLinkedin, FaGlobe, FaUpload, FaDownload } from "react-icons/fa";
// // import API from "../services/axios";

// // export default function Profile() {
// //   const { user, login } = useAuth();
// //   const [profile, setProfile] = useState({});
// //   const [avatarFile, setAvatarFile] = useState(null);
// //   const [resumeFile, setResumeFile] = useState(null);
// //   const [completion, setCompletion] = useState(0);
// //   const [message, setMessage] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (user) {
// //       const u = {
// //         name: user.name || "",
// //         email: user.email || "",
// //         phone: user.phone || "",
// //         location: user.location || "",
// //         bio: user.bio || "",
// //         website: user.website || "",
// //         linkedin: user.linkedin || "",
// //         languages: user.languages || [],
// //         skills: user.skills || [],
// //         experience: user.experience || [],
// //         education: user.education || [],
// //         avatar: user.avatar || "",
// //         resume: user.resume || "",
// //       };
// //       setProfile(u);
// //       calculateCompletion(u);
// //     }
// //   }, [user]);

// //   const calculateCompletion = (u) => {
// //     const fields = [
// //       u.name,
// //       u.email,
// //       u.phone,
// //       u.location,
// //       u.skills.length,
// //       u.languages.length,
// //       u.experience.length,
// //       u.education.length,
// //       u.avatar,
// //       u.resume,
// //     ];
// //     const filled = fields.reduce((count, f) => f ? count + 1 : count, 0);
// //     setCompletion(Math.round((filled / fields.length) * 100));
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfile((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage(null);
// //     try {
// //       const formData = new FormData();
// //       Object.entries(profile).forEach(([key, val]) => {
// //         formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
// //       });
// //       if (avatarFile) formData.append("avatar", avatarFile);
// //       if (resumeFile) formData.append("resume", resumeFile);

// //       const res = await API.put("/auth/profile", formData);
// //       login(res.data.user);
// //       setMessage({ type: "success", text: "Profile updated successfully!" });
// //     } catch (err) {
// //       setMessage({ type: "error", text: err.response?.data?.message || "Update failed" });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 space-y-8">
// //       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //         {/* Sidebar */}
// //         <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
// //           <div className="relative">
// //             <img
// //               src={
// //                 avatarFile
// //                   ? URL.createObjectURL(avatarFile)
// //                   : profile.avatar || "/default-avatar.png"
// //               }
// //               alt="Avatar"
// //               className="w-32 h-32 rounded-full object-cover"
// //             />
// //             <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700">
// //               <FaUpload />
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 className="hidden"
// //                 onChange={(e) => setAvatarFile(e.target.files[0])}
// //               />
// //             </label>
// //           </div>
// //           <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name || "Your Name"}</h2>
// //           <p className="text-sm text-gray-500">{profile.email}</p>
// //           {profile.phone && <p className="text-sm text-gray-500">{profile.phone}</p>}
// //           {profile.location && <p className="text-sm text-gray-500">{profile.location}</p>}
// //           <div className="flex space-x-4 mt-4">
// //             {profile.website && (
// //               <a
// //                 href={profile.website}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="hover:text-indigo-600"
// //               >
// //                 <FaGlobe size={20} />
// //               </a>
// //             )}
// //             {profile.linkedin && (
// //               <a
// //                 href={profile.linkedin}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="hover:text-blue-600"
// //               >
// //                 <FaLinkedin size={20} />
// //               </a>
// //             )}
// //           </div>
// //           <div className="w-full mt-6">
// //             <p className="text-sm font-medium text-gray-700 mb-1">
// //               Profile Completion: {completion}%
// //             </p>
// //             <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
// //               <div
// //                 className="h-full bg-indigo-600"
// //                 style={{ width: `${completion}%` }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Form */}
// //         <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
// //           <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <input
// //                 name="name"
// //                 value={profile.name}
// //                 onChange={handleChange}
// //                 placeholder="Full Name"
// //                 className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               />
// //               <input
// //                 name="email"
// //                 value={profile.email}
// //                 disabled
// //                 className="border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 w-full"
// //               />
// //               <input
// //                 name="phone"
// //                 value={profile.phone}
// //                 onChange={handleChange}
// //                 placeholder="Phone"
// //                 className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               />
// //               <input
// //                 name="location"
// //                 value={profile.location}
// //                 onChange={handleChange}
// //                 placeholder="Location"
// //                 className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               />
// //             </div>
// //             <textarea
// //               name="bio"
// //               value={profile.bio}
// //               onChange={handleChange}
// //               placeholder="Short Bio"
// //               rows={3}
// //               className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //             />

// //             {/* Resume Upload */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Upload Resume
// //               </label>
// //               <input
// //                 type="file"
// //                 name="resume"
// //                 onChange={(e) => setResumeFile(e.target.files[0])}
// //                 className="border border-gray-300 rounded-lg px-3 py-2 w-full"
// //               />
// //               {resumeFile && <p className="text-sm mt-1">{resumeFile.name}</p>}
// //               {profile.resume && (
// //                 <a
// //                   href={profile.resume}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="inline-flex items-center text-sm text-indigo-600 hover:underline mt-2"
// //                 >
// //                   <FaDownload className="mr-1" /> Download Current Resume
// //                 </a>
// //               )}
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
// //             >
// //               {loading ? "Saving..." : "Save Changes"}
// //             </button>

// //             {message && (
// //               <p
// //                 className={`text-sm text-center mt-2 ${
// //                   message.type === "success"
// //                     ? "text-green-600"
// //                     : "text-red-600"
// //                 }`}
// //               >
// //                 {message.text}
// //               </p>
// //             )}
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


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
//   const { user, login } = useAuth();

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
//   const [loading, setLoading] = useState(false);

//   const { setUser } = useAuth()



//   // ONLY show the “Loading session…” screen if we truly have
// // no user yet _and_ we’re still waiting on the initial fetch.
// if (loading && !user) {
//   return (
//     <div className="p-8 text-center text-gray-500">
//       Loading session…
//     </div>
//   )
// }

//   // Load and initialize profile
//   useEffect(() => {
//     console.log("[Profile] useEffect - user:", user);
//     if (user) {
//       const u = {
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         location: user.location || "",
//         bio: user.bio || "",
//         website: user.website || "",
//         linkedin: user.linkedin || "",
//         skills: user.skills || [],
//         languages: user.languages || [],
//         experience: user.experience || [],
//         education: user.education || [],
//         avatar: user.avatar || "",
//         resume: user.resume || "",
//       };
//       console.log("[Profile] Setting profile:", u);
//       setProfile(u);
//       calculateCompletion(u);
//     }
//   }, [user]);

//   // Calculate profile completion percentage
//    const calculateCompletion = (u) => {
//       const total = 10;
//         let filled = 0;
//         if (u.name) filled++;
//         if (u.email) filled++;
//         if (u.phone) filled++;
//         if (u.location) filled++;
//         if ((u.skills || []).length > 0) filled++;
//         if ((u.languages || []).length > 0) filled++;
//         if ((u.experience || []).length > 0) filled++;
//         if ((u.education || []).length > 0) filled++;
//         if (u.avatar) filled++;
//         if (u.resume) filled++;
//         setCompletion(Math.round((filled / total) * 100));
//       };

//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("[Profile] handleChange -", name, value);
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   // Skills handlers
//   const addSkill = () => {
//     console.log("[Profile] addSkill -", newSkill);
//     if (newSkill.trim()) {
//       setProfile((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
//       setNewSkill("");
//     }
//   };
//   const removeSkill = (idx) => {
//     console.log("[Profile] removeSkill -", idx);
//     setProfile((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
//   };

//   // Languages handlers
//   const addLanguage = () => {
//     console.log("[Profile] addLanguage -", newLanguage);
//     if (newLanguage.trim()) {
//       setProfile((prev) => ({ ...prev, languages: [...prev.languages, newLanguage.trim()] }));
//       setNewLanguage("");
//     }
//   };
//   const removeLanguage = (idx) => {
//     console.log("[Profile] removeLanguage -", idx);
//     setProfile((prev) => ({ ...prev, languages: prev.languages.filter((_, i) => i !== idx) }));
//   };

//   // Experience handlers
//   const handleExperienceChange = (idx, field, value) => {
//     console.log("[Profile] handleExperienceChange -", idx, field, value);
//     const updated = [...profile.experience];
//     updated[idx] = { ...updated[idx], [field]: value };
//     setProfile((prev) => ({ ...prev, experience: updated }));
//   };
//   const addExperience = () => {
//     console.log("[Profile] addExperience");
//     setProfile((prev) => ({
//       ...prev,
//       experience: [...prev.experience, { title: "", company: "", from: "", to: "", description: "" }],
//     }));
//   };
//   const removeExperience = (idx) => {
//     console.log("[Profile] removeExperience -", idx);
//     setProfile((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }));
//   };

//   // Education handlers
//   const handleEducationChange = (idx, field, value) => {
//     console.log("[Profile] handleEducationChange -", idx, field, value);
//     const updated = [...profile.education];
//     updated[idx] = { ...updated[idx], [field]: value };
//     setProfile((prev) => ({ ...prev, education: updated }));
//   };
//   const addEducation = () => {
//     console.log("[Profile] addEducation");
//     setProfile((prev) => ({
//       ...prev,
//       education: [...prev.education, { degree: "", institution: "", from: "", to: "", description: "" }],
//     }));
//   };
//   const removeEducation = (idx) => {
//     console.log("[Profile] removeEducation -", idx);
//     setProfile((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));
//   };

//   // Form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("[Profile] handleSubmit - profile:", profile);
//     console.log("[Profile] avatarFile:", avatarFile, "resumeFile:", resumeFile);
//     setLoading(true);
//     setMessage(null);
//     try {
//       const formData = new FormData();
//       Object.entries(profile).forEach(([key, val]) => {
//         formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
//       });
//       if (avatarFile) {
//         console.log("[Profile] appending avatarFile");
//         formData.append("avatar", avatarFile);
//       }
//       if (resumeFile) {
//         console.log("[Profile] appending resumeFile");
//         formData.append("resume", resumeFile);
//       }

//       console.log('🛠️ API baseURL:', API.defaults.baseURL);

//       console.log("[Profile] Sending PUT request...");
//       const res = await API.put("/auth/profile", formData, { withCredentials: true });
//       setUser(res.data.user)                // ← this makes navbar, etc. update instantly
//       console.log("[Profile] PUT response:", res.data);
//       login(res.data.user);
//       setMessage({ type: "success", text: "Profile updated successfully!" });
//       calculateCompletion(res.data.user);
//     } catch (err) {
//       console.error("[Profile] handleSubmit error:", err);
//       setMessage({ type: "error", text: err.response?.data?.message || "Update failed" });
//     } finally {
//       setLoading(false);
//       console.log("[Profile] handleSubmit completed");
//     }
//   };

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
//                 onChange={(e) => { console.log("[Profile] avatar selected:", e.target.files[0]); setAvatarFile(e.target.files[0]); }}
//               />
//             </label>
//           </div>
//           <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name || "Your Name"}</h2>
//           <p className="text-sm text-gray-500">{profile.email}</p>
//           {profile.phone && <p className="text-sm text-gray-500">{profile.phone}</p>}
//           {profile.location && <p className="text-sm text-gray-500">{profile.location}</p>}
//           <div className="flex space-x-4 mt-4">
//             {profile.website && (
//               <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
//                 <FaGlobe size={20} />
//               </a>
//             )}
//             {profile.linkedin && (
//               <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
//                 <FaLinkedin size={20} />
//               </a>
//             )}
//           </div>
//           <div className="w-full mt-6">
//             <p className="text-sm font-medium text-gray-700 mb-1">Profile Completion: {completion}%</p>
//             <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//               <div className="h-full bg-indigo-600" style={{ width: `${completion}%` }} />
//             </div>
//           </div>
//         </div>

//         {/* Main Form */}
//         <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
//           <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
//           <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" className="border rounded px-3 py-2 w-full" />
//               <input name="email" value={profile.email} disabled className="border bg-gray-100 rounded px-3 py-2 w-full" />
//               <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2 w-full" />
//               <input name="location" value={profile.location} onChange={handleChange} placeholder="Location" className="border rounded px-3 py-2 w-full" />
//             </div>

//             <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Short Bio" rows={3} className="border rounded px-3 py-2 w-full" />

//             {/* Skills */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {profile.skills.map((s, i) => (
//                   <span key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
//                     {s} <FaTimes className="ml-1 cursor-pointer" onClick={() => removeSkill(i)} />
//                   </span>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill" className="flex-1 border rounded px-3 py-2" />
//                 <button type="button" onClick={addSkill} className="bg-indigo-600 text-white px-3 py-2 rounded">
//                   <FaPlus />
//                 </button>
//               </div>
//             </div>

//             {/* Languages */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {profile.languages.map((l, i) => (
//                   <span key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
//                     {l} <FaTimes className="ml-1 cursor-pointer" onClick={() => removeLanguage(i)} />
//                   </span>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} placeholder="Add language" className="flex-1 border rounded px-3 py-2" />
//                 <button type="button" onClick={addLanguage} className="bg-indigo-600 text-white px-3 py-2 rounded">
//                   <FaPlus />
//                 </button>
//               </div>
//             </div>

//             {/* Experience */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
//               {profile.experience.map((exp, i) => (
//                 <div key={i} className="border rounded p-3 mb-2 relative">
//                   <FaTimes className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={() => removeExperience(i)} />
//                   <input value={exp.title} onChange={(e) => handleExperienceChange(i, 'title', e.target.value)} placeholder="Job Title" className="w-full mb-2 border rounded px-2 py-1" />
//                   <input value={exp.company} onChange={(e) => handleExperienceChange(i, 'company', e.target.value)} placeholder="Company" className="w-full mb-2 border rounded px-2 py-1" />
//                   <div className="flex gap-2 mb-2">
//                     <input type="month" value={exp.from} onChange={(e) => handleExperienceChange(i, 'from', e.target.value)} className="flex-1 border rounded px-2 py-1" />
//                     <input type="month" value={exp.to} onChange={(e) => handleExperienceChange(i, 'to', e.target.value)} className="flex-1 border rounded px-2 py-1" />
//                   </div>
//                   <textarea value={exp.description} onChange={(e) => handleExperienceChange(i, 'description', e.target.value)} placeholder="Description" rows={2} className="w-full border rounded px-2 py-1" />
//                 </div>
//               ))}
//               <button type="button" onClick={addExperience} className="flex items-center gap-1 text-indigo-600 hover:underline">
//                 <FaPlus /> Add Experience
//               </button>
//             </div>

//             {/* Education */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
//               {profile.education.map((ed, i) => (
//                 <div key={i} className="border rounded p-3 mb-2 relative">
//                   <FaTimes className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={() => removeEducation(i)} />
//                   <input value={ed.degree} onChange={(e) => handleEducationChange(i, 'degree', e.target.value)} placeholder="Degree" className="w-full mb-2 border rounded px-2 py-1" />
//                   <input value={ed.institution} onChange={(e) => handleEducationChange(i, 'institution', e.target.value)} placeholder="Institution" className="w-full mb-2 border rounded px-2 py-1" />
//                   <div className="flex gap-2 mb-2">
//                     <input type="month" value={ed.from} onChange={(e) => handleEducationChange(i, 'from', e.target.value)} className="flex-1 border rounded px-2 py-1" />
//                     <input type="month" value={ed.to} onChange={(e) => handleEducationChange(i, 'to', e.target.value)} className="flex-1 border rounded px-2 py-1" />
//                   </div>
//                   <textarea value={ed.description} onChange={(e) => handleEducationChange(i, 'description', e.target.value)} placeholder="Description" rows={2} className="w-full	border rounded px-2 py-1" />
//                 </div>
//               ))}
//               <button type="button" onClick={addEducation} className="flex items-center gap-1 text-indigo-600 hover:underline">
//                 <FaPlus /> Add Education
//               </button>
//             </div>

//             {/* Resume Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
//               <input type="file" onChange={(e) => { console.log("[Profile] resume selected:", e.target.files[0]); setResumeFile(e.target.files[0]); }} className="border rounded px-3 py-2 w-full" />
//               {resumeFile && <p className="mt-1 text-sm">{resumeFile.name}</p>}
//               {profile.resume && (
//                 <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:underline mt-2">
//                   <FaDownload className="mr-1" /> Download Current Resume
//                 </a>
//               )}
//             </div>

//             <button type="submit" disabled={loading} className="w-full	bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700 transition">
//               {loading ? "Saving..." : "Save Changes"}
//             </button>

//             {message && (
//               <p className={`text-center mt-2 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>
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
  // 1) pull sessionLoading from context *and* login/setUser
  const { user, login, setUser, loading: sessionLoading } = useAuth();

  // 2) local state
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

  // 3) only show spinner on *initial* load if we truly have no user
  if (sessionLoading && !user) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading session…
      </div>
    );
  }

  // 4) initialize form once we get `user`
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
  }, [user]);

  // 5) profile‐completion
  const calculateCompletion = (u) => {
    const total = 10;
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
    setCompletion(Math.round((filled / total) * 100));
  };

  // 6) generic text input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  // 7) skills + languages
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile((p) => ({ ...p, skills: [...p.skills, newSkill.trim()] }));
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

  // 8) experience
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

  // 9) education
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

  // 10) form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      // append all fields (arrays → JSON)
      Object.entries(profile).forEach(([k, v]) => {
        formData.append(k, Array.isArray(v) ? JSON.stringify(v) : v);
      });
      if (avatarFile) formData.append("avatar", avatarFile);
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await API.put("/auth/profile", formData);
      // 11) push into context so everything (navbar, /me, profile) updates immediately
      setUser(res.data.user);
      setProfile((_) => ({
        ...res.data.user,
        skills: res.data.user.skills || [],
        languages: res.data.user.languages || [],
        experience: res.data.user.experience || [],
        education: res.data.user.education || [],
      }));
      calculateCompletion(res.data.user);

      // also call login() if you rely on its side-effects
      login(res.data.user);

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Update failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // 12) render
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
          <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Basic fields */}
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

            {/* Experience */}
            {/* …same as above… */}

            {/* Education */}
            {/* …same as above… */}

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

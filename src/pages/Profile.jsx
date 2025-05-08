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
// import FileUploader from "../components/FileUploader";

// export default function Profile() {
//   // 1️⃣ pull sessionLoading, user, and login() from context
//   const { user, login, loading: sessionLoading } = useAuth();

//   const [loading, setLoading] = useState(true);

//   // 2️⃣ local state for the form
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
//   const [completion, setCompletion] = useState(0);
//   const [message, setMessage] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   // 3️⃣ show a loading screen while restoring session
//   if (sessionLoading && !user) {
//     return (
//       <div className="p-8 text-center text-gray-500">Loading session…</div>
//     );
//   }


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
//         from: e.from ? e.from.slice(0, 7) : "",
//         to: e.to ? e.to.slice(0, 7) : "",
//         current: !!e.current,
//       })),
//       education: (user.education || []).map((e) => ({
//         ...e,
//         from: e.from ? e.from.slice(0, 7) : "",
//         to: e.to ? e.to.slice(0, 7) : "",
//         current: !!e.current,
//       })),
//       avatar: user.avatar || "", // Ensure avatar is set properly
//       resume: user.resume || "",
//     };

//     setProfile(u); // Update profile state
//     calculateCompletion(u); // Recalculate profile completion
//     setAvatarFile(null);
//     setResumeFile(null);
//   }, [user]); // This hook will be triggered when the user context changes

//   // 5️⃣ compute profile completion
//   const calculateCompletion = (u) => {
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
//     setCompletion(Math.round((filled / 10) * 100));
//   };

//   // 6️⃣ generic text‐input handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((p) => ({ ...p, [name]: value }));
//   };

//   // 7️⃣ Skills & Languages
//   const addSkill = () => {
//     if (!newSkill.trim()) return;
//     setProfile((p) => ({
//       ...p,
//       skills: [...p.skills, newSkill.trim()],
//     }));
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

//   // 8️⃣ Experience (with “Present” toggle)
//   const handleExperienceChange = (i, field, val) => {
//     const arr = [...profile.experience];
//     arr[i] = { ...arr[i], [field]: val };
//     setProfile((p) => ({ ...p, experience: arr }));
//   };
//   const toggleExperienceCurrent = (i) => {
//     const arr = [...profile.experience];
//     arr[i].current = !arr[i].current;
//     if (arr[i].current) arr[i].to = "";
//     setProfile((p) => ({ ...p, experience: arr }));
//   };
//   const addExperience = () =>
//     setProfile((p) => ({
//       ...p,
//       experience: [
//         ...p.experience,
//         {
//           title: "",
//           company: "",
//           from: "",
//           to: "",
//           description: "",
//           current: false,
//         },
//       ],
//     }));
//   const removeExperience = (i) =>
//     setProfile((p) => ({
//       ...p,
//       experience: p.experience.filter((_, idx) => idx !== i),
//     }));

//   // 9️⃣ Education (with “Present” toggle)
//   const handleEducationChange = (i, field, val) => {
//     const arr = [...profile.education];
//     arr[i] = { ...arr[i], [field]: val };
//     setProfile((p) => ({ ...p, education: arr }));
//   };
//   const toggleEducationCurrent = (i) => {
//     const arr = [...profile.education];
//     arr[i].current = !arr[i].current;
//     if (arr[i].current) arr[i].to = "";
//     setProfile((p) => ({ ...p, education: arr }));
//   };
//   const addEducation = () =>
//     setProfile((p) => ({
//       ...p,
//       education: [
//         ...p.education,
//         {
//           degree: "",
//           institution: "",
//           from: "",
//           to: "",
//           description: "",
//           current: false,
//         },
//       ],
//     }));
//   const removeEducation = (i) =>
//     setProfile((p) => ({
//       ...p,
//       education: p.education.filter((_, idx) => idx !== i),
//     }));


//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage(null);
//     try {
//       // build plain object (no FormData)
//       const payload = {
//         ...profile,
//         // skills, languages, experience, education are already arrays/objects
//       };
//       const res = await API.put('/auth/profile', payload);
//       // refresh context
//       const { data } = await API.get('/auth/me');
//       login(data.user);
//       setMessage({ type:'success', text:'Profile updated!' });
//     } catch (err) {
//       setMessage({
//         type:'error',
//         text: err.response?.data?.message || 'Update failed'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };
  


//   // 🎨 render
//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* — Sidebar */}
//         <aside className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
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
//               <FileUploader
//                 accept="image/*"
//                 onUpload={(fileInfo) => {
//                   // fileInfo = { path, url }
//                   setProfile((p) => ({ ...p, avatar: fileInfo.url }));
//                 }}
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
//         </aside>

//         {/* — Main Form */}
//         <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
//           <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>

//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             className="space-y-6"
//           >
//             {/* Name / Email / Phone / Location */}
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

//             {/* Bio */}
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
//                     {s}
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
//               {
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Languages
//                 </label>
//               }

            
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {profile.languages.map((l, i) => (
//                   <span
//                     key={i}
//                     className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center"
//                   >
//                     {l}
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
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Experience
//               </label>
//               {profile.experience.map((exp, i) => (
//                 <div key={i} className="border rounded p-3 mb-2 relative">
//                   <FaTimes
//                     className="absolute top-2 right-2 cursor-pointer text-red-500"
//                     onClick={() => removeExperience(i)}
//                   />
//                   <input
//                     value={exp.title}
//                     onChange={(e) =>
//                       handleExperienceChange(i, "title", e.target.value)
//                     }
//                     placeholder="Job Title"
//                     className="w-full mb-2 border rounded px-2 py-1"
//                   />
//                   <input
//                     value={exp.company}
//                     onChange={(e) =>
//                       handleExperienceChange(i, "company", e.target.value)
//                     }
//                     placeholder="Company"
//                     className="w-full mb-2 border rounded px-2 py-1"
//                   />
//                   <div className="flex gap-2 mb-2">
//                     <input
//                       type="month"
//                       value={exp.from}
//                       onChange={(e) =>
//                         handleExperienceChange(i, "from", e.target.value)
//                       }
//                       className="flex-1 border rounded px-2 py-1"
//                     />
//                     <input
//                       type="month"
//                       value={exp.to}
//                       disabled={exp.current}
//                       onChange={(e) =>
//                         handleExperienceChange(i, "to", e.target.value)
//                       }
//                       className={`flex-1 border rounded px-2 py-1 ${
//                         exp.current ? "bg-gray-100" : ""
//                       }`}
//                     />
//                   </div>

//                   <label className="flex items-center gap-2 mb-2">
//                     <input
//                       type="checkbox"
//                       checked={exp.current}
//                       onChange={() => toggleExperienceCurrent(i)}
//                     />
//                     <span className="text-sm">Present</span>
//                   </label>
//                   <textarea
//                     value={exp.description}
//                     onChange={(e) =>
//                       handleExperienceChange(i, "description", e.target.value)
//                     }
//                     placeholder="Description"
//                     rows={2}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addExperience}
//                 className="flex items-center gap-1 text-indigo-600 hover:underline"
//               >
//                 <FaPlus /> Add Experience
//               </button>
//             </div>

//             {/* Education */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Education
//               </label>
//               {profile.education.map((ed, i) => (
//                 <div key={i} className="border rounded p-3 mb-2 relative">
//                   <FaTimes
//                     className="absolute top-2 right-2 cursor-pointer text-red-500"
//                     onClick={() => removeEducation(i)}
//                   />
//                   <input
//                     value={ed.degree}
//                     onChange={(e) =>
//                       handleEducationChange(i, "degree", e.target.value)
//                     }
//                     placeholder="Degree"
//                     className="w-full mb-2 border rounded px-2 py-1"
//                   />
//                   <input
//                     value={ed.institution}
//                     onChange={(e) =>
//                       handleEducationChange(i, "institution", e.target.value)
//                     }
//                     placeholder="Institution"
//                     className="w-full mb-2 border rounded px-2 py-1"
//                   />
//                   <div className="flex gap-2 mb-2">
//                     <input
//                       type="month"
//                       value={ed.from}
//                       onChange={(e) =>
//                         handleEducationChange(i, "from", e.target.value)
//                       }
//                       className="flex-1 border rounded px-2 py-1"
//                     />
//                     <input
//                       type="month"
//                       value={ed.to}
//                       disabled={ed.current}
//                       onChange={(e) =>
//                         handleEducationChange(i, "to", e.target.value)
//                       }
//                       className={`flex-1 border rounded px-2 py-1 ${
//                         ed.current ? "bg-gray-100" : ""
//                       }`}
//                     />
//                   </div>
//                   <label className="flex items-center gap-2 mb-2">
//                     <input
//                       type="checkbox"
//                       checked={ed.current}
//                       onChange={() => toggleEducationCurrent(i)}
//                     />
//                     <span className="text-sm">Present</span>
//                   </label>
//                   <textarea
//                     value={ed.description}
//                     onChange={(e) =>
//                       handleEducationChange(i, "description", e.target.value)
//                     }
//                     placeholder="Description"
//                     rows={2}
//                     className="w-full border rounded px-2 py-1"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addEducation}
//                 className="flex items-center gap-1 text-indigo-600 hover:underline"
//               >
//                 <FaPlus /> Add Education
//               </button>
//             </div>

//             {/* Resume Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Resume
//               </label>
//               {/* <input
//                 type="file"
//                 onChange={(e) => setResumeFile(e.target.files[0])}
//                 className="border rounded px-3 py-2 w-full"
//               /> */}
//               <FileUploader
//                 accept=".pdf,.doc,.docx"
//                 onUpload={(fileInfo) => {
//                   setProfile((p) => ({ ...p, resume: fileInfo.url }));
//                 }}
//               />
//               {resumeFile && <p className="mt-1 text-sm">{resumeFile.name}</p>}
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



// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  FaLinkedin,
  FaGlobe,
  FaDownload,
  FaPlus,
  FaTimes,
} from 'react-icons/fa';
import API from '../services/axios';
import FileUploader from '../components/FileUploader';
import { getAuth, signInAnonymously } from 'firebase/auth';
import app from '../firebase/config.js';

export default function Profile() {
  const { user, login, loading: sessionLoading } = useAuth();
  const [profile, setProfile]   = useState(null);
  const [completion, setCompletion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage]   = useState(null);

  // 1️⃣ Wait for session restore
  if (sessionLoading) {
    return <div className="p-8 text-center text-gray-500">Loading session…</div>;
  }

 
    useEffect(() => {
      // ensure Firebase Auth is initialized before any Storage calls
      signInAnonymously(auth)
        .then(() => console.log('✅ signed in anonymously'))
        .catch(err => console.error('Auth failed', err));
    }, []);

  // 2️⃣ Populate local form state when user loads
  useEffect(() => {
    if (!user) return;

    const u = {
      name:     user.name || '',
      email:    user.email || '',
      phone:    user.phone || '',
      location: user.location || '',
      bio:      user.bio || '',
      website:  user.website || '',
      linkedin: user.linkedin || '',
      skills:     user.skills || [],
      languages:  user.languages || [],
      experience: (user.experience || []).map(e => ({
        ...e,
        from:   e.from?.slice(0,7) || '',
        to:     e.to?.slice(0,7)   || '',
        current: !!e.current,
      })),
      education: (user.education || []).map(e => ({
        ...e,
        from:   e.from?.slice(0,7) || '',
        to:     e.to?.slice(0,7)   || '',
        current: !!e.current,
      })),
      avatar: user.avatar || '',
      resume: user.resume || '',
    };

    setProfile(u);
    calculateCompletion(u);
  }, [user]);

  // 3️⃣ Compute profile % complete
  const calculateCompletion = (u) => {
    let filled = 0;
    ;[
      'name','email','phone','location',
      'skills','languages','experience','education',
      'avatar','resume'
    ].forEach(key => {
      const val = u[key];
      if (Array.isArray(val) ? val.length : val) filled++;
    });
    setCompletion(Math.round((filled / 10) * 100));
  };

  // 4️⃣ Generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  };

  // 5️⃣ Add/remove helpers for arrays
  const addItem = (field, value) => {
    if (!value.trim()) return;
    setProfile(p => ({ ...p, [field]: [...p[field], value.trim()] }));
  };
  const removeItem = (field, idx) => {
    setProfile(p => ({ ...p, [field]: p[field].filter((_,i) => i!==idx) }));
  };

  // 6️⃣ Date-array helpers (experience/education)
  const updateArray = (field, idx, key, val) => {
    const arr = [...profile[field]];
    arr[idx] = { ...arr[idx], [key]: val };
    setProfile(p => ({ ...p, [field]: arr }));
  };
  const toggleCurrent = (field, idx) => {
    const arr = [...profile[field]];
    arr[idx].current = !arr[idx].current;
    if (arr[idx].current) arr[idx].to = '';
    setProfile(p => ({ ...p, [field]: arr }));
  };
  const appendEmpty = (field, template) => {
    setProfile(p => ({ ...p, [field]: [...p[field], template] }));
  };

  // 7️⃣ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await API.put('/auth/profile', profile);
      const { data } = await API.get('/auth/me');
      login(data.user);
      setMessage({ type:'success', text:'Profile updated!' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Update failed'
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
        <aside className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              src={profile.avatar || '/default-avatar.png'}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="mt-2">
              <FileUploader
                accept="image/*"
                onUpload={({url}) => {
                  setProfile(p => ({ ...p, avatar: url }));
                  calculateCompletion({ ...profile, avatar: url });
                }}
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {profile.name || 'Your Name'}
          </h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          {profile.phone && <p className="text-sm text-gray-500">{profile.phone}</p>}
          {profile.location && <p className="text-sm text-gray-500">{profile.location}</p>}

          <div className="flex space-x-4 mt-4">
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                <FaGlobe size={20} className="hover:text-indigo-600"/>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} className="hover:text-blue-600"/>
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
        </aside>

        {/* — Main Form */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name / Email / Phone / Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name','phone','location'].map((f,i) => (
                <input
                  key={i}
                  name={f}
                  value={profile[f]}
                  onChange={handleChange}
                  placeholder={f[0].toUpperCase()+f.slice(1)}
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
            {['skills','languages'].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field[0].toUpperCase()+field.slice(1)}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile[field].map((item,i) => (
                    <span key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
                      {item}
                      <FaTimes className="ml-1 cursor-pointer" onClick={() => removeItem(field, i)} />
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Add ${field.slice(0,-1)}`}
                    className="flex-1 border rounded px-3 py-2"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem(field, e.target.value);
                        e.target.value = '';
                        calculateCompletion({ ...profile, [field]: [...profile[field], e.target.value.trim()] });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="Add ${field.slice(0,-1)}"]`);
                      addItem(field, input.value);
                      input.value = '';
                      calculateCompletion({ ...profile, [field]: [...profile[field], input.value.trim()] });
                    }}
                    className="bg-indigo-600 text-white px-3 py-2 rounded"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}

            {/* Experience & Education */}
            {['experience','education'].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field[0].toUpperCase()+field.slice(1)}
                </label>
                {profile[field].map((entry,i) => (
                  <div key={i} className="border rounded p-3 mb-2 relative">
                    <FaTimes
                      className="absolute top-2 right-2 cursor-pointer text-red-500"
                      onClick={() => {
                        updateArray(field, i, null, null);
                        calculateCompletion({ ...profile, [field]: profile[field].filter((_,j)=>j!==i) });
                      }}
                    />
                    {Object.entries(entry).map(([key,val]) => (
                      ['title','company','degree','institution'].includes(key) ? (
                        <input
                          key={key}
                          value={entry[key]}
                          onChange={e => updateArray(field, i, key, e.target.value)}
                          placeholder={key[0].toUpperCase()+key.slice(1)}
                          className="w-full mb-2 border rounded px-2 py-1"
                        />
                      ) : key === 'description' ? (
                        <textarea
                          key={key}
                          value={entry.description}
                          onChange={e => updateArray(field, i, key, e.target.value)}
                          placeholder="Description"
                          rows={2}
                          className="w-full mb-2 border rounded px-2 py-1"
                        />
                      ) : key === 'from' || key === 'to' ? (
                        <input
                          key={key}
                          type="month"
                          value={entry[key]}
                          disabled={key==='to' && entry.current}
                          onChange={e => updateArray(field, i, key, e.target.value)}
                          className="flex-1 border rounded px-2 py-1 mb-2"
                        />
                      ) : key === 'current' ? (
                        <label key={key} className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={entry.current}
                            onChange={() => toggleCurrent(field, i)}
                          />
                          <span className="text-sm">Present</span>
                        </label>
                      ) : null
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendEmpty(field, field==='experience'
                    ? { title:'',company:'',from:'',to:'',description:'',current:false }
                    : { degree:'',institution:'',from:'',to:'',description:'',current:false }
                  )}
                  className="flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  <FaPlus /> Add {field.slice(0,-1)}
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
                onUpload={({url}) => {
                  setProfile(p => ({ ...p, resume: url }));
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
              {submitting ? 'Saving…' : 'Save Changes'}
            </button>

            {message && (
              <p className={`text-center mt-2 ${message.type==='success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

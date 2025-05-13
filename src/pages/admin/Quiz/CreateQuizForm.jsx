// // src/pages/admin/Quiz/CreateQuizForm.jsx
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useNavigate } from "react-router-dom";
// import { createQuiz, bulkUploadQuizzes } from "../../../services/quizService";

// export default function CreateQuizForm() {
//   const navigate = useNavigate();

//   // ─── Mode Toggle ─────────────────────────────────────────────────────
//   const modes = ["manual", "bulk"];
//   const [mode, setMode] = useState("manual");
//   const [cats, setCats] = useState([]);
//   const [topics, setTopics] = useState([]);

//   // ─── Manual Quiz State ───────────────────────────────────────────────
//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     topic: "",
//     level: "Beginner", // match backend enum: easy, medium, hard
//     duration: 10,
//     totalMarks: 0,
//     isActive: true,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // on mount
//   useEffect(() => {
//     categoryService.getAllCategories().then(setCats);
//     topicService.getAllTopics().then(setTopics);
//     if (isEdit) {
//       quizService.getQuizById(id).then((q) =>
//         setForm({
//           title: q.title,
//           category: q.category._id,
//           topic: q.topic._id,
//           level: q.level,
//           // ...
//         })
//       );
//     }
//   }, [isEdit, id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? checked : type === "number" ? +value : value,
//     }));
//   };

//   // Handle manual quiz creation
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const quiz = await createQuiz(form);
//       // navigate to edit page for new quiz
//       navigate(`/admin/quizzes/${quiz._id}/edit`, { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── Bulk Upload State ───────────────────────────────────────────────
//   const [fileError, setFileError] = useState("");
//   const onDrop = useCallback(
//     async (files) => {
//       if (!files.length) return;
//       const file = files[0];
//       setLoading(true);
//       setFileError("");
//       try {
//         await bulkUploadQuizzes(file); // uploads multiple quizzes via CSV/XLSX
//         navigate("/admin/quizzes", { replace: true });
//       } catch (err) {
//         setFileError(
//           err.response?.data?.message || err.message || "Upload failed"
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [navigate]
//   );

//   // Dropzone setup for CSV/XLSX
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "text/csv": [".csv"],
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
//         ".xlsx",
//       ],
//     },
//     multiple: false,
//     onDrop,
//   });

//   return (
//     <div className="p-3 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

//       {/* Mode Tabs */}
//       <div className="flex space-x-4 mb-6 border-b">
//         {modes.map((m) => (
//           <button
//             key={m}
//             onClick={() => setMode(m)}
//             className={`px-4 py-2 -mb-px font-medium ${
//               mode === m
//                 ? "border-b-2 border-indigo-600 text-indigo-600"
//                 : "text-gray-600 hover:text-indigo-500"
//             }`}
//           >
//             {m === "manual" ? "Manual Entry" : "Bulk Upload"}
//           </button>
//         ))}
//       </div>

//       {mode === "manual" ? (
//         // Manual entry form
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-white p-6 rounded-lg shadow"
//         >
//           {error && <p className="text-red-500">{error}</p>}

//           {/* Title, Category, Topic */}
//           {["title", "category", "topic"].map((field) => (
//             <div key={field}>
//               <label className="block mb-1 font-medium">
//                 {field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <input
//                 name={field}
//                 type="text"
//                 value={form[field]}
//                 onChange={handleChange}
//                 required
//                 disabled={loading}
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//           ))}

//           {/* Level & Duration */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-medium">Level</label>
//               <select
//                 name="level"
//                 value={form.level}
//                 onChange={handleChange}
//                 disabled={loading}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="" disabled>
//                   Select level...
//                 </option>
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Expert">Expert</option>
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Duration (min)</label>
//               <input
//                 name="duration"
//                 type="number"
//                 min="1"
//                 value={form.duration}
//                 onChange={handleChange}
//                 disabled={loading}
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//           </div>

//           {/* Total Marks */}
//           <div>
//             <label className="block mb-1 font-medium">Total Marks</label>
//             <input
//               name="totalMarks"
//               type="number"
//               min="0"
//               value={form.totalMarks}
//               onChange={handleChange}
//               disabled={loading}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           {/* Active toggle */}
//           <div className="flex items-center">
//             <input
//               name="isActive"
//               type="checkbox"
//               checked={form.isActive}
//               onChange={handleChange}
//               disabled={loading}
//               className="mr-2"
//             />{" "}
//             Active
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition"
//           >
//             {loading ? "Creating…" : "Create Quiz"}
//           </button>
//         </form>
//       ) : (
//         // Bulk upload dropzone
//         <div
//           {...getRootProps()}
//           className="border-2 border-dashed rounded-lg p-12 text-center text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition"
//         >
//           <input {...getInputProps()} disabled={loading} />
//           {isDragActive ? (
//             <p>Drop CSV/XLSX file here to create quizzes…</p>
//           ) : (
//             <p>Drag & drop a CSV/XLSX file, or click to select one</p>
//           )}
//           {fileError && <p className="mt-2 text-red-500">{fileError}</p>}
//           <p className="mt-1 text-sm text-gray-400">
//             Expected columns:{" "}
//             <code>title,category,topic,level,duration,totalMarks,isActive</code>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { createQuiz, bulkUploadQuizzes } from '../../../services/quizService';
import categoryService from '../../../services/categoryService';
import topicService from '../../../services/topicService';

export default function CreateQuizForm() {
  const navigate = useNavigate();

  // Fetch categories & topics
  const [cats, setCats]     = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    categoryService.getAllCategories().then(setCats);
    topicService.getAllTopics().then(setTopics);
  }, []);

  // Mode toggle
  const modes = ['manual', 'bulk'];
  const [mode, setMode] = useState('manual');

  // Manual form state
  const [form, setForm] = useState({
    title:      '',
    category:   '',
    topic:      '',
    level:      '',
    duration:   10,
    totalMarks: 0,
    isActive:   true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : type === 'number'
          ? +value
          : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createQuiz(form);
      navigate('/admin/quizzes', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Bulk upload
  const [fileError, setFileError] = useState('');
  const onDrop = useCallback(async files => {
    if (!files.length) return;
    const file = files[0];
    setLoading(true);
    setFileError('');
    try {
      await bulkUploadQuizzes(file);
      navigate('/admin/quizzes', { replace: true });
    } catch (err) {
      setFileError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
    onDrop
  });

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      {/* Mode Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        {modes.map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 -mb-px font-medium ${
              mode === m ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
            }`}
          >
            {m === 'manual' ? 'Manual Entry' : 'Bulk Upload'}
          </button>
        ))}
      </div>

      {mode === 'manual' ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          {error && <p className="text-red-500">{error}</p>}

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a category</option>
              {cats.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block mb-1 font-medium">Topic</label>
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              required
              disabled={loading || !form.category}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a topic</option>
              {topics
                .filter(t => t.category._id === form.category)
                .map(t => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
            </select>
          </div>

          {/* Level & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select level...</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Duration (min)</label>
              <input
                name="duration"
                type="number"
                min="1"
                value={form.duration}
                onChange={handleChange}
                disabled={loading}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Total Marks */}
          <div>
            <label className="block mb-1 font-medium">Total Marks</label>
            <input
              name="totalMarks"
              type="number"
              min="0"
              value={form.totalMarks}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Active toggle */}
          <div className="flex items-center">
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
              disabled={loading}
              className="mr-2"
            /> Active
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? 'Creating…' : 'Create Quiz'}
          </button>
        </form>
      ) : (
        // Bulk upload
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-12 text-center text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition"
        >
          <input {...getInputProps()} disabled={loading} />
          {isDragActive
            ? <p>Drop CSV/XLSX file here to create quizzes…</p>
            : <p>Drag & drop a CSV/XLSX file, or click to select one</p>
          }
          {fileError && <p className="mt-2 text-red-500">{fileError}</p>}
          <p className="mt-1 text-sm text-gray-400">Expected columns: <code>title,category,topic,level,duration,totalMarks,isActive</code></p>
        </div>
      )}
    </div>
  );
}

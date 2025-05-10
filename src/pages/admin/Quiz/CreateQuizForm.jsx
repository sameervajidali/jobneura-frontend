// // src/pages/admin/Quiz/CreateQuizForm.jsx
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { createQuiz, bulkUploadQuestionsFile } from '../../../services/quizService'
// import { useDropzone } from 'react-dropzone'
// import { FaUpload, FaPlus } from 'react-icons/fa'

// export default function CreateQuizForm() {
//   const navigate = useNavigate()
//   const [form, setForm] = useState({
//     title: '',
//     category: '',
//     topic: '',
//     level: 'Beginner',
//     duration: 10,
//     totalMarks: 0,
//     isActive: true,
//   })
//   const [quizId, setQuizId] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [bulkFile, setBulkFile] = useState(null)
//   const [error, setError] = useState('')
//   const [bulkError, setBulkError] = useState('')
//   const [bulkLoading, setBulkLoading] = useState(false)

//   const onDrop = files => {
//     // Only take the first file
//     setBulkFile(files[0])
//     setBulkError('')
//   }
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'text/csv': ['.csv'],
//       'application/json': ['.json']
//     },
//     multiple: false
//   })

//   const handleChange = e => {
//     const { name, value, type, checked } = e.target
//     setForm(f => ({
//       ...f,
//       [name]: type === 'checkbox' ? checked
//                : type === 'number'   ? +value
//                : value
//     }))
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
//     try {
//       const quiz = await createQuiz(form)
//       setQuizId(quiz._id)
//       navigate(`/admin/quizzes/${quiz._id}/edit`)
//     } catch (err) {
//       setError(err.response?.data?.message || err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBulkUpload = async () => {
//     if (!quizId) {
//       setBulkError('Please create the quiz first.')
//       return
//     }
//     if (!bulkFile) {
//       setBulkError('Select a CSV or JSON file first.')
//       return
//     }
//     setBulkLoading(true)
//     setBulkError('')
//     try {
//       await bulkUploadQuestionsFile(quizId, bulkFile)
//       // after upload, navigate into the question list
//       navigate(`/admin/quizzes/${quizId}/questions`)
//     } catch (err) {
//       setBulkError(err.response?.data?.message || err.message)
//     } finally {
//       setBulkLoading(false)
//     }
//   }

//   return (
//     <div className="p-6 max-w-lg mx-auto space-y-8">
//       <h2 className="text-2xl font-semibold">Create New Quiz</h2>

//       {/* — Quiz Metadata Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         {[
//           { label: 'Title', name: 'title', type: 'text' },
//           { label: 'Category', name: 'category', type: 'text' },
//           { label: 'Topic', name: 'topic', type: 'text' }
//         ].map(({ label, name, type }) => (
//           <div key={name}>
//             <label className="block text-sm font-medium">{label}</label>
//             <input
//               name={name}
//               type={type}
//               value={form[name]}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full border rounded px-3 py-2"
//             />
//           </div>
//         ))}

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium">Level</label>
//             <select
//               name="level"
//               value={form.level}
//               onChange={handleChange}
//               className="mt-1 block w-full border rounded px-3 py-2"
//             >
//               <option>Beginner</option>
//               <option>Intermediate</option>
//               <option>Expert</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Duration (min)</label>
//             <input
//               name="duration"
//               type="number"
//               min="1"
//               value={form.duration}
//               onChange={handleChange}
//               className="mt-1 block w-full border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="flex items-center gap-2">
//             <input
//               name="isActive"
//               type="checkbox"
//               checked={form.isActive}
//               onChange={handleChange}
//             />
//             <span className="text-sm">Active</span>
//           </label>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-50 transition"
//         >
//           <FaPlus /> {loading ? 'Creating…' : 'Create Quiz'}
//         </button>
//       </form>

//       {/* — Bulk Upload Section */}
//       {quizId && (
//         <div className="border-t pt-6 space-y-4">
//           <h3 className="text-lg font-medium">Or Bulk Upload Questions</h3>
//           <div
//             {...getRootProps()}
//             className={`cursor-pointer p-6 border-2 border-dashed rounded ${
//               isDragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'
//             }`}
//           >
//             <input {...getInputProps()} />
//             {bulkFile
//               ? <p className="text-gray-800">{bulkFile.name}</p>
//               : <p className="text-gray-500">Drag & drop a CSV/JSON here, or click to select</p>
//             }
//           </div>
//           {bulkError && <p className="text-red-600 text-sm">{bulkError}</p>}

//           <button
//             onClick={handleBulkUpload}
//             disabled={bulkLoading}
//             className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50 transition"
//           >
//             <FaUpload /> {bulkLoading ? 'Uploading…' : 'Upload Questions'}
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }




// src/pages/admin/Quiz/CreateQuizForm.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { createQuiz, bulkUploadQuizzesFile } from '../../../services/quizService';

export default function CreateQuizForm() {
  const navigate = useNavigate();

  // ─── Mode Toggle ─────────────────────────────────────────────────────
  const modes = ['manual', 'bulk'];
  const [mode, setMode] = useState('manual');

  // ─── Manual Quiz State ───────────────────────────────────────────────
  const [form, setForm] = useState({
    title: '',
    category: '',
    topic: '',
    level: 'Beginner',
    duration: 10,
    totalMarks: 0,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked
             : type === 'number'   ? +value
             : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const quiz = await createQuiz(form);
      navigate(`/admin/quizzes/${quiz._id}/edit`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Bulk Upload State ───────────────────────────────────────────────
  const [fileError, setFileError] = useState('');
  const onDrop = useCallback(async files => {
    if (!files.length) return;
    const file = files[0];
    setLoading(true);
    setFileError('');
    try {
      await bulkUploadQuizzesFile(file);
      navigate('/admin/quizzes');
    } catch (err) {
      setFileError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.csv, .xlsx',
    multiple: false,
    onDrop
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      {/* ─── Mode Tabs ───────────────────────────────────────── */}
      <div className="flex space-x-4 mb-6 border-b">
        {modes.map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 -mb-px font-medium ${
              mode === m
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-500'
            }`}
          >
            {m === 'manual' ? 'Manual Entry' : 'Bulk Upload'}
          </button>
        ))}
      </div>

      {mode === 'manual' ? (
        // ─── Manual Entry Form ───────────────────────────────
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          {error && <p className="text-red-500">{error}</p>}

          {[
            { name: 'title',    label: 'Title',    type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'topic',    label: 'Topic',    type: 'text' },
          ].map(field => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
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
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                name="isActive"
                type="checkbox"
                checked={form.isActive}
                onChange={handleChange}
                className="mr-2"
              />
              Active
            </label>
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
        // ─── Bulk Upload Dropzone ─────────────────────────────
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-12 text-center text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition"
        >
          <input {...getInputProps()} />
          {isDragActive
            ? <p>Drop your CSV/XLSX file here to upload quizzes…</p>
            : <p>Drag &amp; drop a CSV/XLSX file, or click to select one</p>
          }
          {fileError && <p className="mt-2 text-red-500">{fileError}</p>}
          <p className="mt-1 text-sm text-gray-400">
            Expected columns: <code>title,category,topic,level,duration,totalMarks,isActive</code>
          </p>
        </div>
      )}
    </div>
  );
}

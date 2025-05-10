// src/pages/admin/Quiz/CreateQuizForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuiz, bulkUploadQuestionsFile } from '../../../services/quizService'
import { useDropzone } from 'react-dropzone'
import { FaUpload, FaPlus } from 'react-icons/fa'

export default function CreateQuizForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    category: '',
    topic: '',
    level: 'Beginner',
    duration: 10,
    totalMarks: 0,
    isActive: true,
  })
  const [quizId, setQuizId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bulkFile, setBulkFile] = useState(null)
  const [error, setError] = useState('')
  const [bulkError, setBulkError] = useState('')
  const [bulkLoading, setBulkLoading] = useState(false)

  const onDrop = files => {
    // Only take the first file
    setBulkFile(files[0])
    setBulkError('')
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    multiple: false
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked
               : type === 'number'   ? +value
               : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const quiz = await createQuiz(form)
      setQuizId(quiz._id)
      navigate(`/admin/quizzes/${quiz._id}/edit`)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBulkUpload = async () => {
    if (!quizId) {
      setBulkError('Please create the quiz first.')
      return
    }
    if (!bulkFile) {
      setBulkError('Select a CSV or JSON file first.')
      return
    }
    setBulkLoading(true)
    setBulkError('')
    try {
      await bulkUploadQuestionsFile(quizId, bulkFile)
      // after upload, navigate into the question list
      navigate(`/admin/quizzes/${quizId}/questions`)
    } catch (err) {
      setBulkError(err.response?.data?.message || err.message)
    } finally {
      setBulkLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-8">
      <h2 className="text-2xl font-semibold">Create New Quiz</h2>

      {/* — Quiz Metadata Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Category', name: 'category', type: 'text' },
          { label: 'Topic', name: 'topic', type: 'text' }
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Duration (min)</label>
            <input
              name="duration"
              type="number"
              min="1"
              value={form.duration}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span className="text-sm">Active</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-50 transition"
        >
          <FaPlus /> {loading ? 'Creating…' : 'Create Quiz'}
        </button>
      </form>

      {/* — Bulk Upload Section */}
      {quizId && (
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-medium">Or Bulk Upload Questions</h3>
          <div
            {...getRootProps()}
            className={`cursor-pointer p-6 border-2 border-dashed rounded ${
              isDragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {bulkFile
              ? <p className="text-gray-800">{bulkFile.name}</p>
              : <p className="text-gray-500">Drag & drop a CSV/JSON here, or click to select</p>
            }
          </div>
          {bulkError && <p className="text-red-600 text-sm">{bulkError}</p>}

          <button
            onClick={handleBulkUpload}
            disabled={bulkLoading}
            className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50 transition"
          >
            <FaUpload /> {bulkLoading ? 'Uploading…' : 'Upload Questions'}
          </button>
        </div>
      )}
    </div>
  )
}

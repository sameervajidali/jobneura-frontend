import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import quizService from '../../../services/quizService';

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: '',
    topic: '',
    level: 'Beginner',
    duration: 0,
    totalMarks: 0,
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await quizService.getQuizById(quizId);
        setForm({
          title: data.title,
          category: data.category,
          topic: data.topic,
          level: data.level,
          duration: data.duration,
          totalMarks: data.totalMarks,
          isActive: data.isActive,
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? +value : value),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const updated = await quizService.updateQuiz(quizId, form);
      setMessage('Quiz updated successfully.');
      // Optionally navigate or just refresh
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading quiz data…</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Quiz</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            name="category"
            value={form.category?.name}
            onChange={handleChange}
            type="text"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Topic</label><input
            name="topic"
            value={form.topic?.name}
            onChange={handleChange}
            type="text"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Level</label>
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
            <label className="block mb-1">Duration (min)</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              type="number"
              min="1"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Total Marks</label>
          <input
            name="totalMarks"
            value={form.totalMarks}
            onChange={handleChange}
            type="number"
            min="0"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center">
          <input
            name="isActive"
            id="isActive"
            checked={form.isActive}
            onChange={handleChange}
            type="checkbox"
            className="mr-2"
          />
          <label htmlFor="isActive">Active</label>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link
            to={`/admin/quizzes/${quizId}/bulk-upload`}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Bulk Upload Questions
          </Link>
        </div>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Back to Quizzes
      </button>
    </div>
  );
}

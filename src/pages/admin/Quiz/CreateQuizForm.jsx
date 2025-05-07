import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../../services/quizService';

export default function CreateQuizForm() {
  const navigate = useNavigate();
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
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? +value : value),
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

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Quiz</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
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
            value={form.category}
            onChange={handleChange}
            type="text"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Topic</label>
          <input
            name="topic"
            value={form.topic}
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
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
}

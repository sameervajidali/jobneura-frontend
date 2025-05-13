// src/pages/admin/Quiz/EditQuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import quizService from '../../../services/quizService';

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate    = useNavigate();

  const [form, setForm]               = useState({/* … */});
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState('');
  const [message, setMessage]         = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [topicName, setTopicName]       = useState('');

  useEffect(() => {
    async function fetchQuiz() {
      try {
        // 1) call service
        const data = await quizService.getQuizById(quizId);
        // 2) handle both shapes: raw-quiz or { quiz }
        const quiz = data.quiz || data;

        // 3) seed your form state
        setForm({
          title:      quiz.title,
          category:   quiz.category._id,
          topic:      quiz.topic._id,
          level:      quiz.level,
          duration:   quiz.duration,
          totalMarks: quiz.totalMarks,
          isActive:   quiz.isActive,
        });
        // 4) store the display names
        setCategoryName(quiz.category.name);
        setTopicName(quiz.topic.name);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        // 5) turn off the spinner
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return <p className="p-6">Loading quiz data…</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* … your form header, error/message … */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title, Level, etc. */}

        {/* Category (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <p className="w-full border rounded px-3 py-2 bg-gray-100">
            {categoryName || '—'}
          </p>
        </div>

        {/* Topic (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Topic</label>
          <p className="w-full border rounded px-3 py-2 bg-gray-100">
            {topicName || '—'}
          </p>
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

// src/services/quizService.js
import API from "./axios";

export function getQuizById(id) {
  return API.get(`/quizzes/admin/quizzes/${id}`)
    .then(res => {
      // expect { quiz: {...} }
      if (res.data.quiz) return res.data.quiz;
      // else maybe raw quiz
      return res.data;
    });
}

// src/pages/admin/Quiz/EditQuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import quizService from '../../../services/quizService';

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // load all categories & topics for display
  const [cats, setCats]     = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    import('../../services/categoryService').then(m => m.getAllCategories()).then(setCats);
    import('../../services/topicService').then(m => m.getAllTopics()).then(setTopics);
  }, []);


  const { quizId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title:      '',
    category:   '',
    topic:      '',
    level:      'Beginner',
    duration:   0,
    totalMarks: 0,
    isActive:   true,
  });
  const [categoryName, setCategoryName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const quiz = await quizService.getQuizById(quizId);
        console.log('Loaded quiz:', quiz);

        setForm({
          title:      quiz.title,
          category:   quiz.category._id,
          topic:      quiz.topic._id,
          level:      quiz.level,
          duration:   quiz.duration,
          totalMarks: quiz.totalMarks,
          isActive:   quiz.isActive,
        });
        setCategoryName(quiz.category?.name || '—');
        setTopicName(quiz.topic?.name || '—');
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : type === 'number'
          ? +value
          : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await quizService.updateQuiz(quizId, form);
      setMessage('Quiz updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading quiz data…</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Quiz</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Category (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <p className="w-full border rounded px-3 py-2 bg-gray-100">
            {categoryName}
          </p>
        </div>

        {/* Topic (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Topic</label>
          <p className="w-full border rounded px-3 py-2 bg-gray-100">
            {topicName}
          </p>
        </div>

        {/* Level & Duration */}
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

        {/* Total Marks */}
        <div>
          <label className="block mb-1 font-medium">Total Marks</label>
          <input
            name="totalMarks"
            type="number"
            min="0"
            value={form.totalMarks}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isActive" className="font-medium">Active</label>
        </div>

        {/* Actions */}
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

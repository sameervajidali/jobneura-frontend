// src/pages/admin/Quiz/EditQuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import quizService from '../../../services/quizService';
import categoryService from '../../../services/categoryService';
import topicService    from '../../../services/topicService';

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate   = useNavigate();

  const [form, setForm]           = useState({
    title:      '',
    category:   '',
    topic:      '',
    level:      'Beginner',
    duration:   0,
    totalMarks: 0,
    isActive:   true,
  });
  const [categories, setCategories] = useState([]);
  const [topics, setTopics]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');
  const [message, setMessage]       = useState('');

  useEffect(() => {
    async function loadAll() {
      try {
        // 1. Fetch quiz + master lists in parallel
        const [quizRes, catList, topicList] = await Promise.all([
          quizService.getQuizById(quizId),
          categoryService.getAllCategories(),
          topicService.getAllTopics(),
        ]);

        // Support both { quiz } shape or raw quiz object
        const quiz = quizRes.quiz || quizRes;

        // 2. Merge quiz.category into catList if missing
        const mergedCats = catList.some(c => c._id === quiz.category._id)
          ? catList
          : [quiz.category, ...catList];

        // 3. Merge quiz.topic into topicList if missing
        const mergedTopics = topicList.some(t => t._id === quiz.topic._id)
          ? topicList
          : [quiz.topic, ...topicList];

        setCategories(mergedCats);
        setTopics(mergedTopics);

        // 4. Seed form state with quiz values
        setForm({
          title:      quiz.subTopic.name,
          category:   quiz.category._id,
          topic:      quiz.topic._id,
          level:      quiz.level,
          duration:   quiz.duration,
          totalMarks: quiz.totalMarks,
          isActive:   quiz.isActive,
        });
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [quizId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox'
        ? checked
        : type === 'number'
          ? +value
          : value
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
      console.error(err);
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
      {error   && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            required
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
            disabled={saving}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">Select a category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Topic (filtered by selected category) */}
        <div>
          <label className="block mb-1 font-medium">Topic</label>
          <select
            name="topic"
            value={form.topic}
            onChange={handleChange}
            disabled={saving || !form.category}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">Select a topic</option>
            {topics
              .filter(t => t.category._id === form.category)
              .map(t => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))
            }
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
              value={form.duration}
              onChange={handleChange}
              type="number"
              min="1"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Total Marks */}
        <div>
          <label className="block mb-1 font-medium">Total Marks</label>
          <input
            name="totalMarks"
            value={form.totalMarks}
            onChange={handleChange}
            type="number"
            min="0"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            name="isActive"
            id="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isActive">Active</label>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link
            to={`/admin/quizzes/${quizId}/bulk-upload`}
            className="flex-1 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
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

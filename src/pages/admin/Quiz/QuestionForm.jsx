import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questionService from '../../../services/questionService.js';

export default function QuestionForm() {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(questionId);

  const [form, setForm] = useState({
    text: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    topicTag: '',
    explanation: '',
    difficulty: 'medium',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Load existing question if editing
  useEffect(() => {
    if (!isEdit) return;
    questionService.getQuestionsByQuizId(quizId)
      .then(data => {
        const q = data.find(q => q._id === questionId);
        if (!q) throw new Error('Question not found');
        setForm({
          text: q.text,
          options: q.options,
          correctIndex: q.correctIndex,
          topicTag: q.topicTag || '',
          explanation: q.explanation || '',
          difficulty: q.difficulty || 'medium',
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [quizId, questionId, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleOptionChange = (idx, value) => {
    setForm(f => {
      const opts = [...f.options];
      opts[idx] = value;
      return { ...f, options: opts };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await questionService.updateQuestion(quizId, questionId, form);
      } else {
        await questionService.createQuestion(quizId, form);
      }
      navigate(`/admin/quizzes/${quizId}/questions`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading question…</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? 'Edit Question' : 'New Question'}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Question Text</label>
          <textarea
            name="text"
            value={form.text}
            onChange={e => handleChange(e)}
            rows={3}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Options</label>
          {form.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={e => handleOptionChange(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="w-full border rounded px-2 py-1 mb-1"
              required
            />
          ))}
        </div>
        <div>
          <label className="block mb-1">Correct Answer</label>
          <select
            name="correctIndex"
            value={form.correctIndex}
            onChange={e => handleChange({ target: { name: 'correctIndex', value: Number(e.target.value) } })}
            className="w-full border rounded px-2 py-1"
          >
            {form.options.map((_, i) => (
              <option key={i} value={i}>Option {i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Topic Tag</label>
          <input
            name="topicTag"
            value={form.topicTag}
            onChange={handleChange}
            type="text"
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Explanation</label>
          <textarea
            name="explanation"
            value={form.explanation}
            onChange={handleChange}
            rows={2}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : isEdit ? 'Update Question' : 'Create Question'}
        </button>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Back to Questions
      </button>
    </div>
  );
}

// src/pages/QuizStartPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/axios';
import { useToast } from '../contexts/ToastContext.jsx';

export default function QuizStartPage() {
  const { quizId } = useParams();
  const navigate   = useNavigate();
  const toast      = useToast();

  const [quiz, setQuiz]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [answers, setAnswers]     = useState({}); // { questionId: selectedIndex }
  const [current, setCurrent]     = useState(0);
  const [timeLeft, setTimeLeft]   = useState(0);   // seconds
  const timerRef                  = useRef(null);

  // 1️⃣ Load quiz
  useEffect(() => {
    API.get(`/quizzes/${quizId}`)
      .then(res => {
        setQuiz(res.data);
        setTimeLeft(res.data.duration * 60);
      })
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [quizId]);

  // 2️⃣ Countdown
  useEffect(() => {
    if (!quiz) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();          // auto-submit when time runs out
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [quiz]);

  // 3️⃣ Handlers
  const selectOption = idx => {
    const qid = quiz.questions[current]._id;
    setAnswers(a => ({ ...a, [qid]: idx }));
  };

  const handlePrev = () => setCurrent(c => Math.max(c - 1, 0));
  const handleNext = () => setCurrent(c => Math.min(c + 1, quiz.questions.length - 1));

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    const payload = {
      quizId,
      timeTaken: quiz.duration * 60 - timeLeft,
      answers
    };
    try {
      const res = await API.post('/quizzes/submit', payload);
      const { attempt } = res.data;
      toast.success(`You scored ${attempt.score} / ${attempt.totalQuestions}`);
      navigate(`/quiz/${quizId}/result/${attempt._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // 4️⃣ Render states
  if (loading) return <p className="p-6 text-center">Loading quiz…</p>;
  if (error)   return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!quiz || !quiz.questions.length) {
    return <p className="p-6 text-center">No questions found for this quiz.</p>;
  }

  const q = quiz.questions[current];
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <div className="text-lg font-mono">
          ⏱ {mm}:{ss}
        </div>
      </div>

      {/* Question Pagination */}
      <div className="flex gap-2 overflow-x-auto">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`px-2 py-1 rounded ${
              i === current
                ? 'bg-indigo-600 text-white'
                : answers[quiz.questions[i]._id] != null
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="mb-4">
          <span className="font-semibold">Question {current + 1}:</span> {q.text}
        </p>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className={`block p-3 rounded border cursor-pointer ${
                answers[q._id] === idx
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`q-${q._id}`}
                checked={answers[q._id] === idx}
                onChange={() => selectOption(idx)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Navigation & Submit */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Previous
        </button>
        {current < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

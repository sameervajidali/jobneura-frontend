// ✅ Phase 2: Frontend UI - Quiz Page (1 question per screen)
// File: frontend/src/pages/QuizPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/axios";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quiz/${quizId}`);
        setQuiz(data);
        setTimeLeft(data.duration * 60); // in seconds
      } catch (err) {
        console.error("Failed to load quiz", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft <= 0) handleSubmit();
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = async () => {
    const payload = {
      quizId,
      answers,
      timeTaken: quiz.duration * 60 - timeLeft,
    };
    try {
      const { data } = await API.post("/quiz/submit", payload);
      navigate(`/quiz/${quizId}/result`, { state: data });
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!quiz) return <div className="p-6 text-center text-red-500">Quiz not found</div>;

  const current = quiz.questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow p-6 rounded-xl">
      <div className="text-right text-sm text-gray-500 mb-2">
        Time left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
      </div>
      <h2 className="text-lg font-semibold mb-2">
        Q{currentIndex + 1}: {current.question}
      </h2>
      <div className="space-y-2">
        {current.options.map((opt, idx) => (
          <label key={idx} className="block border p-2 rounded hover:bg-gray-50">
            <input
              type="radio"
              name={`q-${current._id}`}
              value={opt}
              checked={answers[current._id] === opt}
              onChange={() => handleOptionChange(current._id, opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          className="px-4 py-1 border rounded"
        >
          Previous
        </button>
        {currentIndex + 1 < quiz.questions.length ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="px-4 py-1 bg-indigo-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-green-600 text-white rounded"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

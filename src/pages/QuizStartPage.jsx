// ✅ Phase 1: Frontend UI - Quiz Start Page
// File: frontend/src/pages/QuizStartPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/axios";

export default function QuizStartPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quiz/${quizId}`);
        setQuiz(data);
      } catch (err) {
        console.error("Failed to load quiz", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleStart = () => {
    navigate(`/quiz/${quizId}/start`);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!quiz) return <div className="p-6 text-center text-red-500">Quiz not found</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-8 rounded-xl">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">{quiz.title}</h1>
      <p className="text-sm text-gray-600 mb-2">Category: {quiz.category}</p>
      <p className="text-sm text-gray-600 mb-2">Level: {quiz.level}</p>
      <p className="text-sm text-gray-600 mb-2">Questions: {quiz.questions.length}</p>
      <p className="text-sm text-gray-600 mb-6">Time Limit: {quiz.duration} mins</p>
      <button
        onClick={handleStart}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
      >
        Start Quiz
      </button>
    </div>
  );
}

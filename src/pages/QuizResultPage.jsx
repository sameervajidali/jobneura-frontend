// src/pages/QuizResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/axios';

export default function QuizResultPage() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    API.get(`/quizzes/attempts/${attemptId}`)
      .then(res => setAttempt(res.data))
      .catch(console.error);
  }, [attemptId]);

  if (!attempt) return <p>Loading result…</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Score: {attempt.score} / {attempt.totalQuestions}</h1>
      {/* render details… */}
    </div>
  );
}

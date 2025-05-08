// QuizResultPage.jsx (simplified)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../services/quizService';

export default function QuizResultPage() {
  const { quizId, attemptId } = useParams();
  const [attempt, setAttempt]     = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // 1️⃣ Load attempt details
    quizService.getAttemptById(attemptId)
      .then(setAttempt)
      .catch(console.error);

    // 2️⃣ Load fresh leaderboard
    quizService.getQuizById(quizId)
      .then(quiz => {
        return quizService.getLeaderboard({
          category: quiz.category,
          topic:    quiz.topic,
          level:    quiz.level,
          timePeriod: 'all-time'
        });
      })
      .then(setLeaderboard)
      .catch(console.error);
  }, [quizId, attemptId]);

  if (!attempt) return <p>Loading result…</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Your Score: {attempt.score}/{attempt.totalQuestions}</h2>

      {/* … your existing attempt breakdown … */}

      <section>
        <h3 className="text-xl font-semibold">Leaderboard</h3>
        <ul className="mt-2 space-y-1">
          {leaderboard.map((entry, i) => (
            <li key={entry._id} className="flex justify-between">
              <span>{i+1}. {entry.user.name}</span>
              <span>{entry.score} pts</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

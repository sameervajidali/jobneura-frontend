// ✅ Phase 3: Frontend UI - Quiz Result Page
// File: frontend/src/pages/QuizResultPage.jsx

import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function QuizResultPage() {
  const { state } = useLocation();
  const { score, total, rank, suggestions, leaderboard } = state || {};

  if (!state)
    return <div className="p-6 text-center text-red-500">Result not found</div>;

  const shareText = encodeURIComponent(
    `I scored ${score}/${total} on JobNeura Quiz! 🧠 Try it now at https://jobneura.tech`
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">🎉 Congratulations!</h1>
      <p className="text-gray-700 mb-4">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>
      <p className="text-gray-700 mb-4">Your Rank: <strong>#{rank}</strong></p>

      <div className="my-4">
        <p className="text-sm text-gray-600 font-semibold mb-2">📉 Topics to Improve:</p>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {suggestions?.length > 0 ? (
            suggestions.map((topic, i) => (
              <li key={i}>
                <Link
                  to={`/resources/${topic}`}
                  className="text-indigo-600 hover:underline"
                >
                  {topic}
                </Link>
              </li>
            ))
          ) : (
            <li>You're doing great! ✅</li>
          )}
        </ul>
      </div>

      <div className="my-4">
        <p className="text-sm text-gray-600 font-semibold mb-2">📢 Share your result:</p>
        <div className="flex gap-3">
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noreferrer"
            className="text-green-600 hover:underline"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            X (Twitter)
          </a>
          <a
            href={`mailto:?subject=My Quiz Result&body=${shareText}`}
            className="text-indigo-600 hover:underline"
          >
            Email
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">🏆 Leaderboard</h3>
        <ul className="text-sm space-y-1">
          {leaderboard?.map((entry, i) => (
            <li key={entry.user?._id || i}>
              #{i + 1} - {entry.user?.name || "Anonymous"} - {entry.score} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

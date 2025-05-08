// src/components/quizzes/QuizLeaderboard.jsx
import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService.js';

export default function QuizLeaderboard({ filters }) {
  const { category, topic, level, timePeriod, page: initialPage, limit: initialLimit } = filters;

  // 1️⃣ State
  const [entries, setEntries] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(initialPage);
  const [limit,   setLimit]   = useState(initialLimit);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  // 2️⃣ Load whenever filters/page/limit change
  useEffect(() => {
    setLoading(true);
    setError('');

    quizService.getLeaderboard({ category, topic, level, timePeriod, page, limit })
      .then(data => {
        // If your service returns { items, total, page, limit }:
        setEntries(data.items);
        setTotal(data.total);
        setPage(data.page);
        setLimit(data.limit);
      })
      .catch(err => {
        console.error('Leaderboard load error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load leaderboard');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, topic, level, timePeriod, page, limit]);

  if (loading) return <p className="p-4 text-center">Loading leaderboard…</p>;
  if (error)   return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!entries.length) return <p className="p-4 text-center">No entries yet.</p>;

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Weekly Leaderboard</h3>

      <ol className="list-decimal pl-5 space-y-2">
        {entries.map((e, i) => (
          <li key={e._id} className="flex justify-between">
            <span>{i + 1}. {e.user.name}</span>
            <span className="font-mono">{e.score} pts</span>
          </li>
        ))}
      </ol>

      {/* Simple pagination controls */}
      <div className="flex justify-between items-center text-sm">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page <= 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {Math.ceil(total / limit)}</span>
        <button
          onClick={() => setPage(p => (p * limit < total ? p + 1 : p))}
          disabled={page * limit >= total}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

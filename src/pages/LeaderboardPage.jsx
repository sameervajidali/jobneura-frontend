import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/quizService.js';

export default function LeaderboardPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', topic: '', level: '', timePeriod: 'all-time' });

  useEffect(() => {
    setLoading(true);
    getLeaderboard(filters)
      .then(data => setEntries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Quiz Leaderboard</h2>

      {/* Filter controls */}
      <div className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          className="border px-2 py-1"
        />
        <input
          type="text"
          placeholder="Topic"
          value={filters.topic}
          onChange={e => setFilters(f => ({ ...f, topic: e.target.value }))}
          className="border px-2 py-1"
        />
        <select
          value={filters.level}
          onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
          className="border px-2 py-1"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
        <select
          value={filters.timePeriod}
          onChange={e => setFilters(f => ({ ...f, timePeriod: e.target.value }))}
          className="border px-2 py-1"
        >
          <option value="all-time">All-Time</option>
          <option value="week">This Week</option>
        </select>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2">Score</th>
                <th className="p-2">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e._id} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2 flex items-center space-x-2">
                    <img src={e.user.avatar} className="w-6 h-6 rounded-full" alt="avatar" />
                    <span>{e.user.name}</span>
                  </td>
                  <td className="p-2">{e.score}</td>
                  <td className="p-2">{e.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
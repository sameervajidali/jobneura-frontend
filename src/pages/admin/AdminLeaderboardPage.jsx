// src/pages/admin/AdminLeaderboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../services/quizService.js';

export default function AdminLeaderboardPage() {
  const [entries, setEntries]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [filters, setFilters]     = useState({
    category: '', topic: '', level: '', timePeriod: 'all-time'
  });
  const [page, setPage]           = useState(1);
  const [pageSize, setPageSize]   = useState(10);

  // Fetch leaderboard whenever filters or page change
  useEffect(() => {
    setLoading(true);
    getLeaderboard(filters)
      .then(data => setEntries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Leaderboard</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Category"
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        />
        <input
          className="border p-2 rounded"
          placeholder="Topic"
          value={filters.topic}
          onChange={e => setFilters(f => ({ ...f, topic: e.target.value }))}
        />
        <select
          className="border p-2 rounded"
          value={filters.level}
          onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
        <select
          className="border p-2 rounded"
          value={filters.timePeriod}
          onChange={e => setFilters(f => ({ ...f, timePeriod: e.target.value }))}
        >
          <option value="all-time">All Time</option>
          <option value="week">This Week</option>
        </select>
        <button
          className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
          onClick={() => setFilters({ ...filters })}
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading ? (
          <p className="p-6 text-center">Loading leaderboard…</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">{error}</p>
        ) : entries.length === 0 ? (
          <p className="p-6 text-center">No entries found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Rank','User','Score','Attempts','Category','Topic','Level'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {entries.map((e, i) => (
                <tr key={e._id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 text-sm text-gray-700">{i+1}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    {e.user.avatar && (
                      <img src={e.user.avatar} className="w-6 h-6 rounded-full" alt="" />
                    )}
                    <span className="text-gray-800 font-medium">{e.user.name}</span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.score}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.attempts}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.topic}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

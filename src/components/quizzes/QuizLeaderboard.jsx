// src/components/quizzes/QuizLeaderboard.jsx
import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService.js';
import { Award } from 'lucide-react';

const TAB_OPTIONS = [
  { key: 'week',  label: 'Weekly'  },
  { key: 'month', label: 'Monthly' },
];

const RANK_ICONS = [
  <Award className="w-6 h-6 text-yellow-500" aria-label="Gold Trophy" />,
  <Award className="w-6 h-6 text-gray-400"  aria-label="Silver Trophy" />,
  <Award className="w-6 h-6 text-amber-700" aria-label="Bronze Trophy"/>,
];

export default function QuizLeaderboard({ filters = {} }) {
  const { category, topic, level } = filters;
  const [tab,     setTab]     = useState('week');
  const [entries, setEntries] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [limit]   = useState(50);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    const params = { timePeriod: tab, page, limit };
    if (category) params.category = category;
    if (topic)    params.topic    = topic;
    if (level)    params.level    = level;

    quizService.getLeaderboard(params)
      .then(({ items, total: tot }) => {
        if (!mounted) return;
        setEntries(Array.isArray(items) ? items : []);
        setTotal(typeof tot === 'number' ? tot : 0);
      })
      .catch(err => {
        console.error('Leaderboard fetch error:', err);
        if (mounted) setError(err.response?.data?.message || err.message || 'Failed to load leaderboard.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [category, topic, level, tab, page, limit]);

  return (
    <aside className="
      hidden md:flex md:flex-col md:w-60
      bg-white border-l shadow-sm p-3
      sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto
      space-y-4
    ">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-800">Leaderboard</h3>

      {/* Tabs */}
      <div className="flex space-x-2">
        {TAB_OPTIONS.map(opt => (
          <button
            key={opt.key}
            onClick={() => { setTab(opt.key); setPage(1); }}
            className={`
              flex-1 py-1 text-sm font-medium rounded
              ${tab === opt.key
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50'}
              transition
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500 py-4">Loading…</p>}
      {error   && <p className="text-center text-red-500 py-4">{error}</p>}

      {/* Entries */}
      {!loading && !error && entries.length > 0 && (
        <ol className="space-y-3">
          {entries.map((e, i) => (
            <li
              key={e._id || i}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center text-base">
                  {i < 3
                    ? RANK_ICONS[i]
                    : <span className="text-gray-400 font-medium">{i + 1}</span>}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{e.user?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">
                    {e.attempts ?? 1} attempt{(e.attempts ?? 1) > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-sm font-mono text-indigo-600">{e.score ?? 0} pts</div>
            </li>
          ))}
        </ol>
      )}

      {/* Empty */}
      {!loading && !error && entries.length === 0 && (
        <p className="text-center text-gray-500 py-4">No results yet.</p>
      )}

      {/* Pagination */}
      {!loading && total > limit && (
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Prev
          </button>
          <span>Page {page} / {Math.ceil(total / limit)}</span>
          <button
            onClick={() => setPage(p => (p * limit < total ? p + 1 : p))}
            disabled={page * limit >= total}
            className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </aside>
  );
}

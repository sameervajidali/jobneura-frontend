
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
    let isMounted = true;

    async function fetchLeaderboard() {
      setLoading(true);
      setError('');

      // only include non-empty filters
      const params = { timePeriod: tab, page, limit };
      if (category) params.category = category;
      if (topic)    params.topic    = topic;
      if (level)    params.level    = level;

      try {
        const { items, total: tot } = await quizService.getLeaderboard(params);
        if (!isMounted) return;
        setEntries(Array.isArray(items) ? items : []);
        setTotal(typeof tot === 'number' ? tot : 0);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Failed to load leaderboard.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLeaderboard();
    return () => { isMounted = false; };
  }, [category, topic, level, tab, page, limit]);

  return (
    <aside className="w-72 bg-white border-l shadow-sm p-6 font-sans sticky top-20 h-[calc(100vh-5rem)] overflow-auto space-y-4">
      <h3 className="text-base font-bold text-gray-800">Leaderboard</h3>

      {/* tabs */}
      <div className="flex space-x-2 text-base">
        {TAB_OPTIONS.map(opt => (
          <button
            key={opt.key}
            onClick={() => { setTab(opt.key); setPage(1); }}
            className={`flex-1 py-1 rounded text-center ${
              tab === opt.key
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* loading / error */}
      {loading && <p className="text-center text-gray-500 py-4">Loading…</p>}
      {error   && <p className="text-center text-red-500 py-4">{error}</p>}

      {/* entries */}
      {!loading && !error && entries.length > 0 && (
        <ol className="space-y-3">
          {entries.map((e, i) => (
            <li
              key={e._id || i}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center text-base">
                  {i < 3 ? RANK_ICONS[i] : <span className="text-gray-400">{i+1}</span>}
                </span>
                <div>
                  <p className="text-base font-medium text-gray-800">{e.user?.name || '—'}</p>
                  <p className="text-sm text-gray-500">
                    {e.attempts || 1} attempt{e.attempts>1?'s':''}
                  </p>
                </div>
              </div>
              <div className="text-base font-mono text-indigo-600">{e.score ?? 0} pts</div>
            </li>
          ))}
        </ol>
      )}

      {/* empty */}
      {!loading && !error && entries.length === 0 && (
        <p className="text-center text-gray-500 py-4">No results yet.</p>
      )}

      {/* pagination */}
      {!loading && total > limit && (
        <div className="flex justify-between items-center text-base text-gray-600 mt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} / {Math.ceil(total/limit)}</span>
          <button
            onClick={() => setPage(p => (p*limit < total ? p+1 : p))}
            disabled={page*limit >= total}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </aside>
  );
}


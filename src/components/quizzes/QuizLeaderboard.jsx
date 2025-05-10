// src/components/quizzes/QuizLeaderboard.jsx
import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService.js';
import { Award } from 'lucide-react';

const TAB_OPTIONS = [
  { key: 'week', label: 'Weekly' },
  { key: 'month', label: 'Monthly' },
];

const RANK_ICONS = [
  <Award className="w-6 h-6 text-yellow-500" aria-label="Gold Trophy" />,
  <Award className="w-6 h-6 text-gray-400" aria-label="Silver Trophy" />,
  <Award className="w-6 h-6 text-amber-700" aria-label="Bronze Trophy" />,
];

export default function QuizLeaderboard({ filters = {} }) {
  const { category, topic, level } = filters;
  const [tab, setTab] = useState('week');
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchLeaderboard = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await quizService.getLeaderboard({
          category,
          topic,
          level,
          timePeriod: tab,
          page,
          limit,
        });

        if (!isMounted) return;

        setEntries(Array.isArray(data?.items) ? data.items : []);
        setTotal(typeof data.total === 'number' ? data.total : 0);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        if (isMounted) {
          setError(
            err?.response?.data?.message || err.message || 'Failed to load leaderboard.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeaderboard();
    return () => {
      isMounted = false;
    };
  }, [category, topic, level, tab, page, limit]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h3 className="text-2xl font-bold">Top Scorers</h3>

      {/* Tabs */}
      <div className="flex border-b">
        {TAB_OPTIONS.map((tOpt) => (
          <button
            key={tOpt.key}
            onClick={() => {
              setTab(tOpt.key);
              setPage(1);
            }}
            className={`px-4 py-2 -mb-px font-medium ${
              tab === tOpt.key
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tOpt.label}
          </button>
        ))}
      </div>

      {/* State Messages */}
      {loading && <p className="text-center py-6 text-gray-500">Loading…</p>}
      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      {/* Leaderboard Entries */}
      {!loading && !error && Array.isArray(entries) && entries.length > 0 && (
        <ol className="space-y-3">
          {entries.map((e, i) => (
            <li
              key={e._id || i}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold w-6 h-6 flex items-center justify-center">
                  {i < 3 ? RANK_ICONS[i] : <span className="text-gray-400">{i + 1}</span>}
                </span>
                <div>
                  <p className="font-medium">{e.user?.name || '—'}</p>
                  <p className="text-sm text-gray-500">
                    {e.attempts || 1} attempt{e.attempts > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="font-mono text-indigo-600">{e.score ?? 0} pts</div>
            </li>
          ))}
        </ol>
      )}

      {/* No Results */}
      {!loading && !error && Array.isArray(entries) && entries.length === 0 && (
        <p className="text-center text-gray-500 py-4">No results yet.</p>
      )}

      {/* Pagination */}
      {!loading && total > limit && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
            disabled={page * limit >= total}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


// // src/components/quizzes/QuizLeaderboard.jsx
// import React, { useState, useEffect } from 'react';
// import quizService from '../../services/quizService.js';
// import { Award } from 'lucide-react';

// const TAB_OPTIONS = [
//   { key: 'week', label: 'Weekly' },
//   { key: 'month', label: 'Monthly' },
// ];

// const RANK_ICONS = [
//   <Award className="w-6 h-6 text-yellow-500" aria-label="Gold Trophy" />,
//   <Award className="w-6 h-6 text-gray-400" aria-label="Silver Trophy" />,
//   <Award className="w-6 h-6 text-amber-700" aria-label="Bronze Trophy" />,
// ];

// export default function QuizLeaderboard({ filters = {} }) {
//   const { category, topic, level } = filters;
//   const [tab, setTab] = useState('week');
//   const [entries, setEntries] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(5);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let isMounted = true;

//     const fetchLeaderboard = async () => {
//       setLoading(true);
//       setError('');

//       // ✅ Clean empty filter values
//       const cleanFilters = {};
//       if (category) cleanFilters.category = category;
//       if (topic) cleanFilters.topic = topic;
//       if (level) cleanFilters.level = level;

//       try {
//         const params = {
//           ...cleanFilters,
//           timePeriod: tab,
//           page,
//           limit,
//         };

//         console.log('📤 Sending leaderboard request with filters:', params);

//         const data = await quizService.getLeaderboard(params);

//         if (!isMounted) return;

//         setEntries(Array.isArray(data?.items) ? data.items : []);
//         setTotal(typeof data.total === 'number' ? data.total : 0);
//       } catch (err) {
//         console.error('Leaderboard fetch error:', err);
//         if (isMounted) {
//           setError(err?.response?.data?.message || err.message || 'Failed to load leaderboard.');
//         }
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//     return () => {
//       isMounted = false;
//     };
//   }, [category, topic, level, tab, page, limit]);

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
//       <h3 className="text-2xl font-bold">Top Scorers</h3>

//       {/* Tabs */}
//       <div className="flex border-b">
//         {TAB_OPTIONS.map((tOpt) => (
//           <button
//             key={tOpt.key}
//             onClick={() => {
//               setTab(tOpt.key);
//               setPage(1);
//             }}
//             className={`px-4 py-2 -mb-px font-medium ${
//               tab === tOpt.key
//                 ? 'border-b-2 border-indigo-600 text-indigo-600'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             {tOpt.label}
//           </button>
//         ))}
//       </div>

//       {/* State Messages */}
//       {loading && <p className="text-center py-6 text-gray-500">Loading…</p>}
//       {error && <p className="text-red-500 text-center py-4">{error}</p>}

//       {/* Leaderboard Entries */}
//       {!loading && !error && Array.isArray(entries) && entries.length > 0 && (
//         <ol className="space-y-3">
//           {entries.map((e, i) => (
//             <li
//               key={e._id || i}
//               className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
//             >
//               <div className="flex items-center gap-3">
//                 <span className="text-lg font-semibold w-6 h-6 flex items-center justify-center">
//                   {i < 3 ? RANK_ICONS[i] : <span className="text-gray-400">{i + 1}</span>}
//                 </span>
//                 <div>
//                   <p className="font-medium">{e.user?.name || '—'}</p>
//                   <p className="text-sm text-gray-500">
//                     {e.attempts || 1} attempt{e.attempts > 1 ? 's' : ''}
//                   </p>
//                 </div>
//               </div>
//               <div className="font-mono text-indigo-600">{e.score ?? 0} pts</div>
//             </li>
//           ))}
//         </ol>
//       )}

//       {/* No Results */}
//       {!loading && !error && Array.isArray(entries) && entries.length === 0 && (
//         <p className="text-center text-gray-500 py-4">No results yet.</p>
//       )}

//       {/* Pagination */}
//       {!loading && total > limit && (
//         <div className="flex justify-between items-center text-sm text-gray-600">
//           <button
//             onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             disabled={page === 1}
//             className="px-2 py-1 rounded border disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span>
//             Page {page} / {Math.ceil(total / limit)}
//           </span>
//           <button
//             onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
//             disabled={page * limit >= total}
//             className="px-2 py-1 rounded border disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

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
  const [limit]   = useState(5);
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
      <h3 className="text-base font-bold text-gray-800">Top Scorers</h3>

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


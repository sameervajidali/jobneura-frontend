// // src/pages/admin/AdminLeaderboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import { getLeaderboard } from '../../services/quizService.js';

// export default function AdminLeaderboardPage() {
//   const [entries, setEntries]     = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [error, setError]         = useState('');
//   const [filters, setFilters]     = useState({
//     category: '', topic: '', level: '', timePeriod: 'all-time'
//   });
//   const [page, setPage]           = useState(1);
//   const [pageSize, setPageSize]   = useState(10);

//   // Fetch leaderboard whenever filters or page change
//   useEffect(() => {
//     setLoading(true);
//     getLeaderboard(filters)
//       .then(data => setEntries(data))
//       .catch(err => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [filters]);

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Admin Leaderboard</h1>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
//         <input
//           className="border p-2 rounded"
//           placeholder="Category"
//           value={filters.category}
//           onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
//         />
//         <input
//           className="border p-2 rounded"
//           placeholder="Topic"
//           value={filters.topic}
//           onChange={e => setFilters(f => ({ ...f, topic: e.target.value }))}
//         />
//         <select
//           className="border p-2 rounded"
//           value={filters.level}
//           onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
//         >
//           <option value="">All Levels</option>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Expert">Expert</option>
//         </select>
//         <select
//           className="border p-2 rounded"
//           value={filters.timePeriod}
//           onChange={e => setFilters(f => ({ ...f, timePeriod: e.target.value }))}
//         >
//           <option value="all-time">All Time</option>
//           <option value="week">This Week</option>
//         </select>
//         <button
//           className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
//           onClick={() => setFilters({ ...filters })}
//         >
//           Apply
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         {loading ? (
//           <p className="p-6 text-center">Loading leaderboard…</p>
//         ) : error ? (
//           <p className="p-6 text-center text-red-500">{error}</p>
//         ) : entries.length === 0 ? (
//           <p className="p-6 text-center">No entries found.</p>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Rank','User','Score','Attempts','Category','Topic','Level'].map(h => (
//                   <th
//                     key={h}
//                     className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {entries.map((e, i) => (
//                 <tr key={e._id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                   <td className="px-4 py-2 text-sm text-gray-700">{i+1}</td>
//                   <td className="px-4 py-2 flex items-center space-x-2">
//                     {e.user.avatar && (
//                       <img src={e.user.avatar} className="w-6 h-6 rounded-full" alt="" />
//                     )}
//                     <span className="text-gray-800 font-medium">{e.user.name}</span>
//                   </td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{e.score}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{e.attempts}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{e.category}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{e.topic}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{e.level}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/admin/AdminLeaderboardPage.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getLeaderboard } from '../../services/quizService';

export default function AdminLeaderboardPage() {
  const [entries, setEntries]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [filters, setFilters]     = useState({
    category: '', topic: '', level: '', timePeriod: 'all-time'
  });
  const [page, setPage]           = useState(1);
  const pageSize                   = 10;

  // load leaderboard
  useEffect(() => {
    setLoading(true);
    getLeaderboard(filters)
      .then(data => {
        const list = Array.isArray(data)
          ? data
          : data.leaderboard || [];
        setEntries(list);
      })
      .catch(err => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [filters]);

  // pagination slice
  const totalPages = Math.ceil(entries.length / pageSize);
  const pagedData  = entries.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Leaderboard</h1>
          <button
            onClick={() => window.location.reload()}
            className="self-start sm:self-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4">
          <input
            className="flex-1 min-w-[120px] border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Category"
            value={filters.category}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          />
          <input
            className="flex-1 min-w-[120px] border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Topic"
            value={filters.topic}
            onChange={e => setFilters(f => ({ ...f, topic: e.target.value }))}
          />
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.level}
            onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.timePeriod}
            onChange={e => setFilters(f => ({ ...f, timePeriod: e.target.value }))}
          >
            <option value="all-time">All Time</option>
            <option value="week">This Week</option>
          </select>
          <button
            onClick={() => setFilters({ ...filters })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Apply Filters
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white overflow-hidden rounded-lg shadow">
          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading leaderboard…</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : entries.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No entries found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {['Rank','User','Score','Attempts','Category','Topic','Level'].map(h => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pagedData.map((e, i) => (
                  <tr
                    key={e._id}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{(page - 1) * pageSize + i + 1}</td>
                    <td className="px-6 py-4 flex items-center space-x-2">
                      {e.user.avatar && (
                        <img
                          src={e.user.avatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-800">{e.user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{e.score}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{e.attempts}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{e.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{e.topic}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{e.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {entries.length > pageSize && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span className="text-gray-700">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

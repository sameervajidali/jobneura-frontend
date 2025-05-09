// // src/pages/admin/Users/UserHistoryPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getUserHistory } from '../../../services/userService';
// import { FaArrowLeft } from 'react-icons/fa';

// export default function UserHistoryPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState('');
//   const [history, setHistory] = useState({
//     user:         null,
//     quizAttempts: [],
//     loginHistory: []
//   });

//   useEffect(() => {
//     async function fetchHistory() {
//       setLoading(true);
//       try {
//         const data = await getUserHistory(id);
//         setHistory({
//           user:         data.user         || null,
//           quizAttempts: Array.isArray(data.quizAttempts) ? data.quizAttempts : [],
//           loginHistory: Array.isArray(data.loginHistory) ? data.loginHistory : []
//         });
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchHistory();
//   }, [id]);

//   if (loading) return (
//     <div className="p-6 text-center text-gray-600">Loading user history…</div>
//   );
//   if (error) return (
//     <div className="p-6 text-center text-red-600">{error}</div>
//   );
//   if (!history.user) return (
//     <div className="p-6 text-center text-gray-600">User not found.</div>
//   );

//   const { user, quizAttempts, loginHistory } = history;

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8">
//       <button
//         onClick={() => navigate(-1)}
//         className="inline-flex items-center text-indigo-600 hover:underline"
//       >
//         <FaArrowLeft className="mr-2" /> Back to Users
//       </button>

//       {/* Profile Details */}
//       <section className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
//         <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <dt className="font-medium text-gray-700">Name</dt>
//             <dd className="mt-1">{user.name}</dd>
//           </div>
//           <div>
//             <dt className="font-medium text-gray-700">Email</dt>
//             <dd className="mt-1">{user.email}</dd>
//           </div>
//           {user.phone && (
//             <div>
//               <dt className="font-medium text-gray-700">Phone</dt>
//               <dd className="mt-1">{user.phone}</dd>
//             </div>
//           )}
//           {user.location && (
//             <div>
//               <dt className="font-medium text-gray-700">Location</dt>
//               <dd className="mt-1">{user.location}</dd>
//             </div>
//           )}
//           {user.bio && (
//             <div className="md:col-span-2">
//               <dt className="font-medium text-gray-700">Bio</dt>
//               <dd className="mt-1 whitespace-pre-wrap">{user.bio}</dd>
//             </div>
//           )}
//         </dl>
//       </section>

//       {/* Quiz Attempts */}
//       <section className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-4">Quiz Attempts</h2>
//         {quizAttempts.length === 0 ? (
//           <p className="text-gray-600">No quiz attempts found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border-collapse">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quiz</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Score</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {quizAttempts.map((att, i) => (
//                   <tr key={att._id ?? i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
//                     <td className="px-4 py-2 text-sm text-gray-700">
//                       {att.quiz?.title || '-'}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-700">
//                       {att.score}/{att.totalQuestions}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-700">
//                       {new Date(att.createdAt).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       {/* Login History */}
//       <section className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-4">Login History</h2>
//         {loginHistory.length === 0 ? (
//           <p className="text-gray-600">No login history found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border-collapse">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">IP Address</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">User Agent</th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Success</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {loginHistory.map((lh, i) => (
//                   <tr key={lh.at ?? i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
//                     <td className="px-4 py-2 text-sm text-gray-700">
//                       {new Date(lh.at).toLocaleString()}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-700">{lh.ip}</td>
//                     <td className="px-4 py-2 text-sm text-gray-700 break-words">
//                       {lh.userAgent}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-center">
//                       {lh.success ? '✅' : '❌'}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


// src/pages/admin/Users/UserHistoryPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaClock, FaMapMarkerAlt, FaChartLine } from 'react-icons/fa';
import { getUserHistory } from '../../../services/userService';

export default function UserHistoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [history, setHistory]   = useState({ user: null, quizAttempts: [], loginHistory: [] });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUserHistory(id);
        setHistory({
          user:         data.user         || null,
          quizAttempts: Array.isArray(data.quizAttempts) ? data.quizAttempts : [],
          loginHistory: Array.isArray(data.loginHistory) ? data.loginHistory : []
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const { user, quizAttempts, loginHistory } = history;

  // compute summary metrics
  const summary = useMemo(() => {
    if (!user) return {};
    const total = quizAttempts.length;
    const scores = quizAttempts.map(a => a.score);
    const avg    = total ? (scores.reduce((s, x) => s + x, 0) / total).toFixed(1) : 0;
    const high   = total ? Math.max(...scores) : 0;
    const lastLogin = loginHistory[0]; // sorted desc in controller
    return { total, avg, high, lastLogin };
  }, [quizAttempts, loginHistory, user]);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading…</div>;
  if (error)   return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!user)   return <div className="p-6 text-center text-gray-600">User not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-indigo-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Users
      </button>

      {/* ── Summary Card ─────────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            <span className="text-green-700 font-medium">
              {user.isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <FaChartLine className="mx-auto text-indigo-600" />
            <p className="font-medium">{summary.total}</p>
            <p className="text-xs text-gray-500">Attempts</p>
          </div>
          <div>
            <FaClock className="mx-auto text-indigo-600" />
            <p className="font-medium">{summary.avg}</p>
            <p className="text-xs text-gray-500">Avg Score</p>
          </div>
          <div>
            <FaClock className="mx-auto text-indigo-600" />
            <p className="font-medium">{summary.high}</p>
            <p className="text-xs text-gray-500">High Score</p>
          </div>
          {summary.lastLogin && (
            <div>
              <FaMapMarkerAlt className="mx-auto text-indigo-600" />
              <p className="font-medium">{summary.lastLogin.city || summary.lastLogin.ip}</p>
              <p className="text-xs text-gray-500">{new Date(summary.lastLogin.at).toLocaleString()}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Profile Details ──────────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Profile Details</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><dt className="font-medium">Phone</dt><dd>{user.phone || '—'}</dd></div>
          <div><dt className="font-medium">Location</dt><dd>{user.location || '—'}</dd></div>
          <div className="sm:col-span-2"><dt className="font-medium">Bio</dt><dd className="whitespace-pre-wrap">{user.bio || '—'}</dd></div>
          <div><dt className="font-medium">Registered</dt><dd>{new Date(user.createdAt).toLocaleDateString()}</dd></div>
          <div><dt className="font-medium">Role</dt><dd>{user.role}</dd></div>
        </dl>
      </section>

      {/* ── Quiz Attempts Table ───────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Quiz Attempts</h3>
        {quizAttempts.length === 0 ? (
          <p className="text-gray-500">No attempts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-y-2">
              <thead className="bg-gray-50">
                <tr>
                  {['Quiz','Score','Date','Time Taken'].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quizAttempts.map((att,i) => (
                  <tr key={att._id} className={i%2?'bg-gray-50':''}>
                    <td className="px-4 py-2">{att.quiz?.title}</td>
                    <td className="px-4 py-2">{att.score}/{att.totalQuestions}</td>
                    <td className="px-4 py-2">{new Date(att.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{Math.ceil(att.timeTaken/60)}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Login History Table ───────────────────────────── */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Login History</h3>
        {loginHistory.length === 0 ? (
          <p className="text-gray-500">No login records.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-y-2">
              <thead className="bg-gray-50">
                <tr>
                  {['Date','IP','Location','Result'].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((lh,i) => (
                  <tr key={lh._id} className={i%2?'bg-gray-50':''}>
                    <td className="px-4 py-2">{new Date(lh.at).toLocaleString()}</td>
                    <td className="px-4 py-2">{lh.ip}</td>
                    <td className="px-4 py-2">{`${lh.city||'-'}, ${lh.region||''}, ${lh.country||''}`}</td>
                    <td className="px-4 py-2">{lh.success?'✅ Success':'❌ Fail'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// // // src/components/quizzes/QuizTitleLeaderboard.jsx
// // import React, { useState, useEffect } from 'react'
// // import quizService      from '../../services/quizService.js'
// // import { Search, Award } from 'lucide-react'

// // export default function QuizTitleLeaderboard({ timePeriod = 'week' }) {
// //   const [allQuizzes, setAllQuizzes]   = useState([])
// //   const [filterText, setFilterText]   = useState('')
// //   const [selectedQuiz, setSelectedQuiz] = useState(null)
// //   const [entries, setEntries]         = useState([])
// //   const [loading, setLoading]         = useState(false)
// //   const [error, setError]             = useState('')

// //   useEffect(() => {
// //     // grab all quizzes for the selector
// //     quizService.getQuizzes({ page:1, limit:1000 })
// //       .then(qs => setAllQuizzes(qs))
// //       .catch(console.error)
// //   }, [])

// //   useEffect(() => {
// //     if (!selectedQuiz) {
// //       setEntries([])
// //       return
// //     }
// //     setLoading(true)
// //     quizService
// //       .getLeaderboard({ quizId: selectedQuiz._id, timePeriod })
// //       .then(data => setEntries(data.items))
// //       .catch(err => {
// //         console.error(err)
// //         setError('Could not load leaderboard')
// //       })
// //       .finally(() => setLoading(false))
// //   }, [selectedQuiz, timePeriod])

// //   const filtered = allQuizzes.filter(q =>
// //     q.title.toLowerCase().includes(filterText.toLowerCase())
// //   )

// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
// //       <h3 className="text-xl font-bold">Leaderboard by Quiz</h3>

// //       <div className="relative">
// //         <Search className="absolute left-3 top-3 text-gray-400" />
// //         <input
// //           type="text"
// //           placeholder="Search quiz title…"
// //           value={filterText}
// //           onChange={e => setFilterText(e.target.value)}
// //           className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-300"
// //         />
// //       </div>

// //       <select
// //         value={selectedQuiz?._id || ''}
// //         onChange={e =>
// //           setSelectedQuiz(allQuizzes.find(q => q._id === e.target.value) || null)
// //         }
// //         className="w-full border rounded-lg p-2"
// //       >
// //         <option value="">— Select a quiz —</option>
// //         {filtered.map(q => (
// //           <option key={q._id} value={q._id}>
// //             {q.title} ({q.questions.length} Q)
// //           </option>
// //         ))}
// //       </select>

// //       {loading && <p className="text-center py-4">Loading…</p>}
// //       {error   && <p className="text-red-500 text-center">{error}</p>}

// //       {!loading && !error && selectedQuiz && (
// //         <ol className="space-y-2">
// //           {entries.length ? entries.map((e, i) => (
// //             <li
// //               key={e._id}
// //               className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition"
// //             >
// //               <div className="flex items-center gap-2">
// //                 {i < 3
// //                   ? <Award className={`w-5 h-5 ${
// //                       i===0?'text-yellow-500':
// //                       i===1?'text-gray-400':'text-amber-700'
// //                     }`} />
// //                   : <span className="w-5 text-gray-400">{i+1}</span>
// //                 }
// //                 <span className="font-medium">{e.user.name}</span>
// //               </div>
// //               <span className="font-mono text-indigo-600">{e.score} pts</span>
// //             </li>
// //           )) : (
// //             <p className="text-center text-gray-500">No data yet.</p>
// //           )}
// //         </ol>
// //       )}
// //     </div>
// //   )
// // }



// // src/components/quizzes/QuizTitleLeaderboard.jsx
// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import quizService   from '../../services/quizService';
// import { Search, Award } from 'lucide-react';

// export default function QuizTitleLeaderboard({ timePeriod = 'week' }) {
//   // ——— State —————————————————————————————————————————————————————————————————————————————
//   const [allQuizzes, setAllQuizzes]         = useState([]);
//   const [quizzesLoading, setQuizzesLoading] = useState(true);
//   const [quizzesError, setQuizzesError]     = useState('');

//   const [filterText, setFilterText]         = useState('');
//   const [selectedQuizId, setSelectedQuizId] = useState('');
  
//   const [entries, setEntries]               = useState([]);
//   const [entriesLoading, setEntriesLoading] = useState(false);
//   const [entriesError, setEntriesError]     = useState('');

//   // keep track of mounted status
//   const isMounted = useRef(true);
//   useEffect(() => {
//     return () => { isMounted.current = false; };
//   }, []);

//   // ——— Fetch all quizzes on mount ————————————————————————————————————————————————————————
//   useEffect(() => {
//     async function loadQuizzes() {
//       setQuizzesLoading(true);
//       setQuizzesError('');
//       try {
//         const qs = await quizService.getQuizzes({ page: 1, limit: 1000 });
//         if (isMounted.current) {
//           setAllQuizzes(Array.isArray(qs) ? qs : []);
//         }
//       } catch (err) {
//         console.error('Failed to load quizzes:', err);
//         if (isMounted.current) {
//           setQuizzesError('Unable to load quizzes.');
//         }
//       } finally {
//         if (isMounted.current) {
//           setQuizzesLoading(false);
//         }
//       }
//     }
//     loadQuizzes();
//   }, []);

//   // ——— Filtered list (memoized) —————————————————————————————————————————————————————————
//   const filteredQuizzes = useMemo(() => {
//     const text = filterText.trim().toLowerCase();
//     return allQuizzes.filter(q =>
//       typeof q.title === 'string' &&
//       q.title.toLowerCase().includes(text)
//     );
//   }, [allQuizzes, filterText]);

//   // ——— Fetch leaderboard when quiz or period changes ———————————————————————————————————————
//   useEffect(() => {
//     // clear previous
//     setEntries([]);
//     setEntriesError('');
//     if (!selectedQuizId) return;

//     async function loadEntries() {
//       setEntriesLoading(true);
//       try {
//         const data = await quizService.getLeaderboard({ quizId: selectedQuizId, timePeriod });
//         // assume data.items is the array
//         const list = Array.isArray(data?.items) ? data.items : [];
//         if (isMounted.current) {
//           setEntries(list);
//         }
//       } catch (err) {
//         console.error('Leaderboard load error:', err);
//         if (isMounted.current) {
//           setEntriesError('Could not load leaderboard.');
//         }
//       } finally {
//         if (isMounted.current) {
//           setEntriesLoading(false);
//         }
//       }
//     }
//     loadEntries();
//   }, [selectedQuizId, timePeriod]);

//   // ——— Render ——————————————————————————————————————————————————————————————————————
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
//       <h3 className="text-xl font-bold">Leaderboard by Quiz</h3>

//       {/* Search + select */}
//       <div className="grid gap-4 sm:grid-cols-2">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search quiz title…"
//             value={filterText}
//             onChange={e => setFilterText(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-300"
//             disabled={quizzesLoading}
//           />
//         </div>

//         <select
//           value={selectedQuizId}
//           onChange={e => setSelectedQuizId(e.target.value)}
//           className="w-full border rounded-lg p-2"
//           disabled={quizzesLoading}
//         >
//           <option value="">— Select a quiz —</option>
//           {filteredQuizzes.map(q => (
//             <option key={q._id} value={q._id}>
//               {q.title} ({Array.isArray(q.questions) ? q.questions.length : 0} Q)
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Quizzes loading / error */}
//       {quizzesLoading && (
//         <p className="text-center py-4 text-gray-500">Loading quizzes…</p>
//       )}
//       {quizzesError && (
//         <p className="text-center text-red-500">{quizzesError}</p>
//       )}

//       {/* Leaderboard entries */}
//       {selectedQuizId && (
//         <div>
//           {entriesLoading && (
//             <p className="text-center py-4 text-gray-500">Loading leaderboard…</p>
//           )}
//           {entriesError && (
//             <p className="text-center text-red-500">{entriesError}</p>
//           )}
//           {!entriesLoading && !entriesError && (
//             entries.length > 0 ? (
//               <ol className="space-y-2 mt-2">
//                 {entries.map((entry, idx) => {
//                   const userName = entry.user?.name || '—';
//                   const score    = entry.score ?? 0;
//                   return (
//                     <li
//                       key={entry._id || idx}
//                       className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition"
//                     >
//                       <div className="flex items-center gap-2">
//                         {idx < 3 ? (
//                           <Award
//                             className={`w-5 h-5 ${
//                               idx === 0 ? 'text-yellow-500' :
//                               idx === 1 ? 'text-gray-400' :
//                                            'text-amber-700'
//                             }`}
//                           />
//                         ) : (
//                           <span className="w-5 text-gray-400">{idx + 1}</span>
//                         )}
//                         <span className="font-medium">{userName}</span>
//                       </div>
//                       <span className="font-mono text-indigo-600">{score} pts</span>
//                     </li>
//                   );
//                 })}
//               </ol>
//             ) : (
//               <p className="text-center text-gray-500 mt-4">No results yet.</p>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

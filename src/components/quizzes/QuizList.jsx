// import React from "react";
// import { useNavigate } from "react-router-dom";
// import useQuizList from "../../hooks/useQuizList";

// export default function QuizList({ filters, onPageChange }) {
//   const navigate = useNavigate();
//   const quizData = useQuizList(filters);

//   const {
//     quizzes = [],
//     total = 0,
//     page = 1,
//     limit = 10,
//     loading = false,
//     error = "",
//   } = quizData || {};

//   if (loading) return <p className="p-6 text-center">Loading quizzes…</p>;
//   if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
//   if (!Array.isArray(quizzes) || quizzes.length === 0)
//     return <p className="p-6 text-center">No quizzes found.</p>;

//   return (
//     <div className="space-y-6">
//       {/* Quiz Grid */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {quizzes.map((q) => (
//           <div
//             key={q._id}
//             className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
//           >
//             <div className="flex justify-between items-start">
//               <h3 className="text-lg font-semibold text-indigo-700">{q.title}</h3>
//               {q.createdAt && Date.now() - new Date(q.createdAt).getTime() < 604800000 && (
//                 <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
//                   New
//                 </span>
//               )}
//             </div>

//             <p className="text-sm text-gray-600 mt-1">
//               {q.questionCount ?? 0} Questions &middot; {q.duration || 0} min
//             </p>

//             <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
//               <svg
//                 className="w-4 h-4 inline-block"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m8-3V7a4 4 0 10-8 0v6m8 0H7"
//                 />
//               </svg>
//               {q.attemptCount ?? 0} attempts
//             </div>

//             <button
//               onClick={() => navigate(`/quiz/${q._id}/start`)}
//               className="mt-4 text-indigo-600 font-medium inline-flex items-center gap-1 hover:underline"
//             >
//               Start Quiz
//               <svg
//                 className="w-4 h-4 inline-block"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center space-x-4">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page <= 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="text-gray-700">
//           Page <strong>{page}</strong> of <strong>{Math.ceil(total / limit)}</strong>
//         </span>
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page * limit >= total}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



// src/components/quizzes/QuizSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import {
  ChevronUpIcon,
  ChevronRightIcon,
  CollectionIcon,
} from '@heroicons/react/outline';
import { BookOpenIcon, BadgeCheckIcon } from '@heroicons/react/solid';
import API from '../../services/axios';

export default function QuizSidebar({ filters = {}, onChange }) {
  const [data, setData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch categories & topics and levels
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [catsRes, levelsRes] = await Promise.all([
          API.get('/quizzes/grouped-topics'),
          API.get('/quizzes/distinct/level'),
        ]);
        if (cancelled) return;
        setData(catsRes.data);            // expected: [{ category, topics: [...] }, ...]
        setLevels(levelsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, []);

  if (loading) return (
    <aside className="w-64 p-4">
      <p className="text-gray-500">Loading filters…</p>
    </aside>
  );

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4 space-y-6 sticky top-20 h-[calc(100vh-5rem)] overflow-auto">
      {/* Category / Topic Accordions */}
      <div className="space-y-2">
        {data.map(({ category, topics }) => (
          <Disclosure key={category}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-lg
                    ${filters.category === category
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => {
                    onChange({ ...filters, category, topic: '', page: 1 });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CollectionIcon className="w-5 h-5" />
                    <span className="font-medium">{category}</span>
                  </div>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="pl-8 space-y-1">
                  {topics.map((t) => (
                    <button
                      key={t}
                      className={`flex items-center gap-2 w-full px-2 py-1 text-sm rounded-lg text-gray-600
                        ${filters.topic === t
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-50'}`}
                      onClick={() =>
                        onChange({ ...filters, topic: t, page: 1 })
                      }
                    >
                      <BookOpenIcon className="w-4 h-4" />
                      <span>{t}</span>
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Level Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Level
        </label>
        <select
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.level || ''}
          onChange={(e) =>
            onChange({ ...filters, level: e.target.value, page: 1 })
          }
        >
          <option value="">All Levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
        onClick={() => onChange({ category: '', topic: '', level: '', page: 1 })}
      >
        <BadgeCheckIcon className="w-5 h-5" />
        Clear Filters
      </button>
    </aside>
  );
}

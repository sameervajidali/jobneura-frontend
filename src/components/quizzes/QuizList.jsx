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


// src/components/QuizList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizList from '../../hooks/useQuizList';
import { ChevronRight, Book, Clock, User } from 'lucide-react';

export default function QuizList({ filters, onPageChange }) {
  const navigate = useNavigate();
  const { quizzes = [], total = 0, page = 1, limit = 10, loading, error } = useQuizList(filters) || {};

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">Loading quizzes…</p>
    );
  }
  if (error) {
    return (
      <p className="p-6 text-center text-red-500">{error}</p>
    );
  }
  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return (
      <p className="p-6 text-center text-gray-500">No quizzes found.</p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz grid */}
      <ul
        role="list"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {quizzes.map((q) => {
          const count = Number.isInteger(q.questionCount)
            ? q.questionCount
            : (Number.isInteger(q.totalMarks) ? q.totalMarks : 0);

          const attempts = Number.isInteger(q.attempts)
            ? q.attempts
            : 0;

          return (
            <li
              key={q._id}
              role="listitem"
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg focus-within:shadow-lg transition relative"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {q.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
                <span className="flex items-center gap-1">
                  <Book className="w-4 h-4" aria-hidden="true" />
                  {count} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {q.duration ?? 0} min
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-2 mb-4">
                <User className="w-4 h-4" aria-hidden="true" />
                {attempts} attempt{attempts !== 1 ? 's' : ''}
              </div>
              <button
                onClick={() => navigate(`/quiz/${q._id}/start`)}
                className="mt-auto inline-flex items-center gap-1 text-indigo-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Start Quiz
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      <nav
        aria-label="Quiz list pagination"
        className="flex justify-center items-center space-x-4"
      >
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page <strong>{page}</strong> of{' '}
          <strong>{Math.ceil(total / limit) || 1}</strong>
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page * limit >= total}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Next
        </button>
      </nav>
    </div>
  );
}

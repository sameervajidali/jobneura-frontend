
// // src/components/quizzes/QuizList.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useQuizList from '../../hooks/useQuizList';
// import {
//   BookOpenIcon,
//   ClockIcon,
//   UserIcon,
//   ArrowRightIcon,
//   SparklesIcon,
// } from '@heroicons/react/24/outline';

// export default function QuizList({ filters, onPageChange }) {
//   const navigate = useNavigate();
//   const { quizzes = [], total = 0, page = 1, limit = 10, loading, error } =
//     useQuizList(filters) || {};

//   if (loading) return <p className="p-6 text-center text-gray-500">Loading quizzes…</p>;
//   if (error)   return <p className="p-6 text-center text-red-500">{error}</p>;
//   if (!quizzes.length)
//     return <p className="p-6 text-center text-gray-500">No quizzes found.</p>;

//   return (
//     <div className="space-y-6">
//       {/* 3-col grid */}
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {quizzes.map((q) => (
//           <div
//             key={q._id}
//             className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition font-sans"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-6">
//               <h3 className="text-sm font-semibold text-gray-800">{q.title}</h3>
//               {q.createdAt &&
//                 Date.now() - new Date(q.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
//                   <SparklesIcon className="w-6 h-6 text-green-400" aria-label="New" />
//                 )}
//             </div>

//             {/* Stats */}
//             <div className="px-6 space-y-2">
//               <div className="flex items-center text-sm text-gray-600 space-x-2">
//                 <BookOpenIcon className="w-5 h-5" />
//                 <span>{q.questionCount ?? 0} Questions</span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600 space-x-2">
//                 <ClockIcon className="w-5 h-5" />
//                 <span>{q.duration || 0} min</span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600 space-x-2">
//                 <UserIcon className="w-5 h-5" />
//                 <span>{q.attemptCount ?? 0} attempts</span>
//               </div>
//             </div>

//             {/* Start button */}
//             <div className="mt-auto p-6">
//               <button
//                 onClick={() => navigate(`/quiz/${q._id}/start`)}
//                 className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
//               >
//                 <span>Start Quiz</span>
//                 <ArrowRightIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center space-x-4 text-gray-700 text-sm">
//         <button
//           onClick={() => onPageChange(Math.max(1, page - 1))}
//           disabled={page <= 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span>
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


// src/components/quizzes/QuizList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useQuizList from "../../hooks/useQuizList";
import {
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  ChartBarIcon,
  ArrowPathIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export default function QuizList({ filters, onPageChange }) {
  const navigate = useNavigate();
  const {
    quizzes = [],
    total = 0,
    page = 1,
    limit = 10,
    loading = false,
    error = "",
  } = useQuizList(filters);

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

  if (quizzes.length === 0) {
    return (
      <p className="p-6 text-center text-gray-600">No quizzes found.</p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q) => {
          const isNew =
            q.createdAt &&
            Date.now() - new Date(q.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;

          return (
            <div
              key={q._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6
                         grid grid-rows-[auto,1fr,auto] gap-4 h-full"
            >
              {/* Row 1: Title + New badge */}
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-indigo-700">
                  {q.title}
                </h3>
                {isNew && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Row 2: Stats */}
              <div className="space-y-4">
                {/* 2a: Questions + micro-actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BookOpenIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {q.questionCount ?? 0} Questions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <button
                      aria-label="Bookmark"
                      className="hover:text-indigo-600 transition"
                    >
                      <BookmarkIcon className="w-5 h-5" />
                    </button>
                    <button
                      aria-label="Retry"
                      className="hover:text-indigo-600 transition"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                    <button
                      aria-label="Leaderboard"
                      className="hover:text-indigo-600 transition"
                    >
                      <ChartBarIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 2b: Duration & Attempts */}
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="w-5 h-5" />
                    {q.duration || 0} min
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UserIcon className="w-5 h-5" />
                    {q.attemptCount ?? 0} attempts
                  </div>
                </div>
              </div>

              {/* Row 3: Start button */}
              <button
                type="button"
                onClick={() => navigate(`/quiz/${q._id}/start`)}
                className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-lg
                           font-medium flex items-center justify-center gap-2 hover:bg-indigo-700
                           transition"
              >
                <ArrowRightIcon className="w-5 h-5" />
                Start Quiz
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page <strong>{page}</strong> of{" "}
          <strong>{Math.ceil(total / limit)}</strong>
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page * limit >= total}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

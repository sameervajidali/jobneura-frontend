
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
  const { quizzes = [], total = 0, page = 1, limit = 10, loading, error } =
    useQuizList(filters);

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading quizzes…</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!quizzes.length)
    return <p className="p-6 text-center text-gray-600">No quizzes found.</p>;

  return (
    <div className="space-y-6">
      {/* 3-col responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((q) => {
          const isNew =
            q.createdAt &&
            Date.now() - new Date(q.createdAt).getTime() < 7 * 86400000;
          return (
            <div
              key={q._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {q.title}
                </h3>
                {isNew && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Row 1 */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-700 gap-2">
                      <BookOpenIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {q.questionCount ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400 gap-3">
                      <button aria-label="Bookmark" className="hover:text-indigo-600">
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                      <button aria-label="Retry" className="hover:text-indigo-600">
                        <ArrowPathIcon className="w-5 h-5" />
                      </button>
                      <button aria-label="Leaderboard" className="hover:text-indigo-600">
                        <ChartBarIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="mt-3 flex items-center text-gray-600 gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5" />
                      <span>{q.duration || 0} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      <span>{q.attemptCount ?? 0} attempts</span>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <button
                  onClick={() => navigate(`/quiz/${q._id}/start`)}
                  className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                  Start Quiz
                </button>
              </div>
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
          Page <strong>{page}</strong> of <strong>{Math.ceil(total / limit)}</strong>
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

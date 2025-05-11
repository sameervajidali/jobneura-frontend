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



// src/components/quizzes/QuizList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  User,
  Star,
  RefreshCcw,
  Bookmark,
  BarChart2,
} from "lucide-react";
import useQuizList from "../../hooks/useQuizList";

export default function QuizList({ filters, onPageChange }) {
  const navigate = useNavigate();
  const { quizzes = [], total = 0, page = 1, limit = 10, loading, error } =
    useQuizList(filters) || {};

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading quizzes…</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-500">Error: {error}</p>
    );
  if (!quizzes.length)
    return <p className="p-6 text-center text-gray-600">No quizzes found.</p>;

  return (
    <div className="space-y-6">
      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quizzes.map((q) => {
          const isNew =
            Date.now() - new Date(q.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
          return (
            <div
              key={q._id}
              className="relative flex flex-col bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              {/* Top-right badges */}
              <div className="absolute top-4 right-4 flex flex-wrap gap-1 text-xs">
                <span
                  className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600"
                >
                  {q.level || "—"}
                </span>
                {isNew && (
                  <span
                    className="px-2 py-0.5 rounded-full bg-green-100 text-green-800"
                  >
                    New
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                {q.title}
              </h3>

              {/* Stats */}
              <div className="flex flex-col gap-2 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{q.questionCount ?? 0} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{q.duration || 0} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{q.attemptCount ?? 0} attempts</span>
                </div>
              </div>

              {/* Micro-actions */}
              <div className="mt-4 flex gap-4 text-gray-400 hover:text-gray-600">
                <button
                  aria-label="Bookmark"
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  aria-label="Retry"
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
                <button
                  aria-label="Leaderboard"
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <BarChart2 className="w-5 h-5" />
                </button>
              </div>

              {/* Spacer */}
              <div className="flex-grow" />

              {/* Primary CTA */}
              <button
                onClick={() => navigate(`/quiz/${q._id}/start`)}
                className="mt-6 inline-flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                <Star className="w-4 h-4" />
                Start Quiz
              </button>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
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
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

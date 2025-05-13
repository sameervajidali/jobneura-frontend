// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useQuizList   from '../../hooks/useQuizList';
// import { BookOpenIcon, ClockIcon, UserIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

// export default function QuizList({ filters, onPageChange }) {
//   const navigate = useNavigate();
//   const { quizzes, total, page, limit, loading, error } = useQuizList(filters);

//   if (loading) return <p className="p-6 text-center text-gray-500">Loading…</p>;
//   if (error)   return <p className="p-6 text-center text-red-500">{error}</p>;
//   if (!quizzes.length) return <p className="p-6 text-center text-gray-500">No quizzes found.</p>;

//   return (
//     <div className="space-y-6">
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {quizzes.map(q => {
//           const isNew = q.createdAt && Date.now() - new Date(q.createdAt).getTime() < 7*86400*1000;
//           return (
//             <div key={q._id} className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition">
//               <div className="p-6 min-h-[7rem] flex items-start justify-between">
//                 <h3 className="text-sm font-semibold text-gray-800">{q.title}</h3>
//                 {isNew && <SparklesIcon className="w-6 h-6 text-green-400" aria-label="New"/>}
//               </div>
//               <div className="px-6 space-y-2">
//                 <div className="flex items-center text-sm text-gray-600 space-x-2">
//                   <BookOpenIcon className="w-5 h-5"/> <span>{q.questionCount||0} Questions</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600 space-x-2">
//                   <ClockIcon className="w-5 h-5"/>    <span>{q.duration||0} min</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600 space-x-2">
//                   <UserIcon className="w-5 h-5"/>     <span>{q.attemptCount||0} attempts</span>
//                 </div>
//               </div>
//               <div className="mt-auto p-6">
//                 <button
//                   onClick={()=> navigate(`/quiz/${q._id}/start`)}
//                   className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
//                 >
//                   <span>Start Quiz</span>
//                   <ArrowRightIcon className="w-5 h-5"/>
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* pagination */}
//       <div className="flex justify-center items-center space-x-4 text-gray-700 text-sm">
//         <button
//           onClick={()=> onPageChange(Math.max(1, page-1))}
//           disabled={page<=1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >Prev</button>
//         <span>Page <strong>{page}</strong> of <strong>{Math.ceil(total/limit)}</strong></span>
//         <button
//           onClick={()=> onPageChange(page+1)}
//           disabled={page*limit>=total}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >Next</button>
//       </div>
//     </div>
//   );
// }


// src/components/quizzes/QuizList.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useQuizList from '../../hooks/useQuizList'
import {
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

export default function QuizList({ filters, onPageChange }) {
  const navigate = useNavigate()
  const {
    quizzes = [],
    total   = 0,
    page    = 1,
    limit   = 12,
    loading,
    error,
  } = useQuizList(filters) || {}

  if (loading)
    return <p className="py-12 text-center text-gray-500">Loading quizzes…</p>
  if (error)
    return <p className="py-12 text-center text-red-500">{error}</p>
  if (!quizzes.length)
    return <p className="py-12 text-center text-gray-500">No quizzes found.</p>

  return (
    <>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
        {quizzes.map(q => {
          const isNew = q.createdAt && (Date.now() - new Date(q.createdAt).getTime()) < 7 * 86400e3
          return (
            <div
              key={q._id}
              className="
                flex flex-col bg-white border border-gray-200 rounded-2xl
                p-6 shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-transform duration-200
              "
            >
              {/* Category badge + New sparkles */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold uppercase text-indigo-600">
                  {q.category?.name}
                </span>
                {isNew && (
                  <SparklesIcon className="w-5 h-5 text-green-400" aria-label="New" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex-1">
                {q.title}
              </h3>

              {/* Stats */}
              {/* <div className="flex items-center text-sm text-gray-500 space-x-6 mb-6">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-3 h-3" />
                  <span>{q.duration} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpenIcon className="w-3 h-3" />
                  <span>{q.questionCount ?? 0} Qs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UserIcon className="w-3 h-3" />
                  <span>{q.attemptCount ?? 0} tries</span>
                </div>
              </div> */}
              {/* ─── STATS (icon row on top, counts below, both centered) ─────────────────────── */}
{/* ─── STATS (icons on top, counts below, centered) ─────────────────────── */}
              <div className="px-2 flex flex-col items-center text-gray-600 text-sm">
                {/* Icon row */}
                <div className="flex items-center justify-center space-x-12">
                  <BookOpenIcon className="w-3 h-3" />
                  <ClockIcon    className="w-3 h-3" />
                  <UserIcon     className="w-3 h-3" />
                </div>

                {/* Label row */}
                <div className="flex items-center justify-center space-x-8 mt-1">
                  <span>{q.questionCount ?? 0} Qs</span>
                  <span>{q.duration     || 0} min</span>
                  <span>{q.attemptCount ?? 0} tries</span>
                </div>
              </div>


              {/* CTA */}
              <button
                onClick={() => navigate(`/quiz/${q._id}/start`)}
                className="
                  mt-auto inline-flex items-center justify-center gap-2
                  w-full py-2 rounded-full
                  bg-gradient-to-r from-indigo-500 to-purple-500
                  text-white font-medium shadow-sm
                  hover:from-indigo-600 hover:to-purple-600
                  transition-colors duration-200
                "
              >
                <span>Start Quiz</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          )
        })}
      </div>

      {/* — Pagination */}
      {total > limit && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page <strong>{page}</strong> of <strong>{Math.ceil(total / limit)}</strong>
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page * limit >= total}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

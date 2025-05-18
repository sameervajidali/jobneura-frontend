import React from "react";
import { useNavigate } from "react-router-dom";
import useQuizList from "../../hooks/useQuizList";
import {
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function QuizList({ filters, onPageChange }) {
  const navigate = useNavigate();
  const {
    quizzes = [],
    total = 0,
    page = 1,
    limit = 12,
    loading,
    error,
  } = useQuizList(filters) || {};

  if (loading)
    return (
      <div className="py-16 text-center text-gray-400 dark:text-gray-500 text-base">
        Loading quizzes…
      </div>
    );
  if (error)
    return (
      <div className="py-16 text-center text-red-500 text-base">{error}</div>
    );
  if (!quizzes.length)
    return (
      <div className="py-16 text-center text-gray-400 dark:text-gray-500 text-base">
        No quizzes found.
      </div>
    );

  return (
    <>
      <div
        className="
          grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          transition-all
        "
      >
        {quizzes.map((q) => {
          const isNew =
            q.createdAt &&
            Date.now() - new Date(q.createdAt).getTime() < 7 * 86400e3;
          return (
            <div
  key={q._id}
  className="
    flex flex-col bg-white dark:bg-gray-900
    border border-gray-200 dark:border-gray-800
    rounded-2xl shadow-sm hover:shadow-lg
    p-6
    transition-all duration-200
    hover:-translate-y-1
    min-h-[235px]
    relative
  "
>
  {/* Category + New badge in one row */}
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
      {q.category?.name}
    </span>
    {isNew && (
      <span className="flex items-center ml-2 text-green-500 font-semibold text-xs">
        <SparklesIcon className="w-4 h-4 mr-1" />
        New
      </span>
    )}
  </div>

  {/* Title */}
  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 flex-1 leading-tight line-clamp-2">
    {q.title}
  </h3>

  {/* Stats Row */}
  <div className="flex items-center justify-between mb-4 px-2 text-indigo-400 dark:text-indigo-300">
    <div className="flex flex-col items-center gap-1">
      <BookOpenIcon className="w-5 h-5" />
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{q.questionCount ?? 0} Qs</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      <ClockIcon className="w-5 h-5" />
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{q.duration || 0} min</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      <UserIcon className="w-5 h-5" />
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{q.attemptCount ?? 0} tries</span>
    </div>
  </div>

  {/* CTA */}
  <button
    onClick={() => navigate(`/quiz/${q._id}/start`)}
    className="
      mt-auto inline-flex items-center justify-center gap-2
      w-full py-2 rounded-full
      bg-gradient-to-r from-indigo-500 to-purple-500/80 dark:from-indigo-600 dark:to-purple-700
      text-white font-semibold shadow hover:from-indigo-700 hover:to-purple-800
      transition-all
      focus:outline-none focus:ring-2 focus:ring-indigo-300
    "
  >
    <span>Start Quiz</span>
    <ArrowRightIcon className="w-5 h-5" />
  </button>
</div>

          );
        })}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="mt-10 flex justify-center items-center space-x-4">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="
              px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full
              hover:bg-indigo-100 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-100
              font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            Prev
          </button>
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            Page <b>{page}</b> of <b>{Math.ceil(total / limit)}</b>
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page * limit >= total}
            className="
              px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full
              hover:bg-indigo-100 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-100
              font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

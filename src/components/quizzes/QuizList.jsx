import React from "react";
import { useNavigate } from "react-router-dom";
import useQuizList from "../../hooks/useQuizList";

export default function QuizList({ filters, onPageChange }) {
  const navigate = useNavigate();
  const quizData = useQuizList(filters);

  const {
    quizzes = [],
    total = 0,
    page = 1,
    limit = 10,
    loading = false,
    error = "",
  } = quizData || {};

  if (loading) return <p className="p-6 text-center">Loading quizzes…</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!Array.isArray(quizzes) || quizzes.length === 0)
    return <p className="p-6 text-center">No quizzes found.</p>;

  return (
    <div className="space-y-6">
      {/* Quiz Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q) => (
          <div
            key={q._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-indigo-700">{q.title}</h3>
              {q.createdAt && Date.now() - new Date(q.createdAt).getTime() < 604800000 && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {q.questionCount ?? 0} Questions &middot; {q.duration || 0} min
            </p>

            <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
              <svg
                className="w-4 h-4 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m8-3V7a4 4 0 10-8 0v6m8 0H7"
                />
              </svg>
              {q.attemptCount ?? 0} attempts
            </div>

            <button
              onClick={() => navigate(`/quiz/${q._id}/start`)}
              className="mt-4 text-indigo-600 font-medium inline-flex items-center gap-1 hover:underline"
            >
              Start Quiz
              <svg
                className="w-4 h-4 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ))}
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



// src/components/quizzes/QuizList.jsx
import React from "react";
import useQuizList from "../../hooks/useQuizList.jsx";
import { Users } from "lucide-react";
import { ArrowRightCircle } from "lucide-react";

export default function QuizList({ filters }) {
  const { quizzes, loading, error } = useQuizList(filters);

  if (loading) return <p>Loading quizzes…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (!quizzes.length) return <p>No quizzes found.</p>;

  return (
    <div className="grid grid-cols-1 gap-6">
      {quizzes.map((q) => (
        <div
          key={q._id}
          className="bg-white rounded-2xl border hover:shadow-lg p-6 transition flex flex-col justify-between"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-indigo-700">{q.title}</h3>
            <p className="text-sm text-gray-600">
              {q.questions.length} Questions | {q.duration} min
            </p>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Users className="w-4 h-4" /> {q.attempts || 0} attempts
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => window.location.href = `/quiz/${q._id}`}
              className="text-indigo-600 font-semibold text-sm inline-flex items-center gap-1 hover:underline"
            >
              Start Quiz <ArrowRightCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

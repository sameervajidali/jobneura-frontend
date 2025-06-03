// src/components/quizzes/HeroActions.jsx
import { Plus, Lightbulb, SquarePen, PlusIcon } from "lucide-react";

export default function HeroActions() {
  return (
    <section className="w-full mb-6">
      {/* Row and Heading */}
      <div className="flex flex-col items-center">
        <div className="text-xs font-bold uppercase tracking-wide text-gray-900 dark:text-gray-800 mb-2">
          Quick Actions
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
  {/* Browse Quizzes */}
  <div
    className="flex-1 flex flex-col items-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900
      border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition
      hover:scale-105 cursor-pointer"
  >
    <PlusIcon className="w-9 h-9 mb-2 text-indigo-500" />
    <span className="font-semibold text-base mb-2 text-gray-800 dark:text-gray-100">
      Browse Quizzes
    </span>
    <button className="mt-1 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow">
      Start Learning
    </button>
  </div>
  {/* Suggest Topic */}
  <div
    className="flex-1 flex flex-col items-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900
      border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition
      hover:scale-105 cursor-pointer"
  >
    <Lightbulb className="w-9 h-9 mb-2 text-indigo-500" />
    <span className="font-semibold text-base mb-2 text-gray-800 dark:text-gray-100">
      Suggest Topic
    </span>
    <button
      className="mt-1 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow"
      onClick={() => alert("Feature coming soon!")}
    >
      Suggest Topic
    </button>
  </div>
  {/* Create Quiz */}
  {/* <div
    className="flex-1 flex flex-col items-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900
      border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition
      hover:scale-105 cursor-pointer"
  >
    <SquarePen className="w-9 h-9 mb-2 text-indigo-500" />
    <span className="font-semibold text-base mb-2 text-gray-800 dark:text-gray-100">
      Create Quiz
    </span>
    <button
      className="mt-1 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow"
      onClick={() => (window.location.href = "/quizzes/create")}
    >
      Create Quiz
    </button>
  </div> */}
</div>

      </div>
    </section>
  );
}

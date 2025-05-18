
import React, { useState } from "react";
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";
import QuizSidebar from "../components/quizzes/QuizSidebar";
import QuizList from "../components/quizzes/QuizList";
import QuizLeaderboard from "../components/quizzes/QuizLeaderboard";
import HeroActions from "../components/quizzes/HeroActions";

export default function QuizExplorerPage() {
  const [filters, setFilters] = useState({
    category: "",
    topic: "",
    level: "",
    page: 1,
    limit: 12,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (newPage) => {
    setFilters((f) => ({ ...f, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Quizzes
        </h1>
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle filters"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {sidebarOpen ? (
            <XIcon className="w-6 h-6 text-gray-700 dark:text-gray-100" />
          ) : (
            <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-100" />
          )}
        </button>
      </div>

      {/* Responsive container for the entire dashboard */}
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 flex flex-col lg:flex-row gap-x-8 py-8">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 z-30 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
            transform transition-transform duration-200 ease-in-out
            rounded-r-2xl shadow-lg
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:rounded-lg lg:shadow-none lg:translate-x-0 lg:h-auto lg:border lg:border-gray-200 lg:dark:border-gray-800
            p-4 hidden lg:block
          `}
        >
          <QuizSidebar
            filters={filters}
            onChange={(newFilters) => {
              setFilters({ ...newFilters, page: 1 });
              setSidebarOpen(false);
            }}
          />
        </aside>

        {/* Sidebar Drawer Overlay (Mobile only) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main
          className="
          flex-1 min-w-0 flex flex-col
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
          rounded-2xl p-6
          font-sans text-base
        "
        >
          {/* Quick Actions */}
          <HeroActions />
          {/* Bottom separator below Quick Actions */}
          <div className="w-full border-b border-gray-200 dark:border-gray-800 mt-2 mb-1" />
          {/* Section heading for quiz cards */}
          <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2 tracking-tight">
            Quiz Library
          </h3>
          <QuizList filters={filters} onPageChange={handlePageChange} />
        </main>

        {/* Leaderboard */}
        <aside
          className="
            w-full lg:w-80 shrink-0
            bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
            rounded-2xl p-4 ml-0 lg:ml-0 mt-8 lg:mt-0
            font-sans text-base
            sticky top-22 h-fit
            hidden lg:block
          "
        >
          <QuizLeaderboard
            filters={{ ...filters, timePeriod: "week", page: 1, limit: 5 }}
          />
        </aside>
      </div>
    </div>
  );
}

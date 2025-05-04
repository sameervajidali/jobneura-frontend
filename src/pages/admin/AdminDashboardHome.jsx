// src/pages/admin/AdminDashboardHome.jsx
import React from "react";
import { FaUsers, FaBook, FaChartBar, FaComments } from "react-icons/fa";

export default function AdminDashboardHome() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
        <FaUsers className="text-3xl text-indigo-600" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Users</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2,481</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
        <FaBook className="text-3xl text-green-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">Quizzes</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">128</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
        <FaChartBar className="text-3xl text-yellow-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">Leaderboard Entries</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">764</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
        <FaComments className="text-3xl text-pink-500" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">Support Tickets</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">49</h2>
        </div>
      </div>
    </div>
  );
}

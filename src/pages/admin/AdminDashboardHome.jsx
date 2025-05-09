// // src/pages/admin/AdminDashboardHome.jsx
// import React from "react";
// import { FaUsers, FaBook, FaChartBar, FaComments } from "react-icons/fa";

// export default function AdminDashboardHome() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//         <FaUsers className="text-3xl text-indigo-600" />
//         <div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">Total Users</p>
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white">2,481</h2>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//         <FaBook className="text-3xl text-green-500" />
//         <div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">Quizzes</p>
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white">128</h2>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//         <FaChartBar className="text-3xl text-yellow-500" />
//         <div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">Leaderboard Entries</p>
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white">764</h2>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center gap-4">
//         <FaComments className="text-3xl text-pink-500" />
//         <div>
//           <p className="text-sm text-gray-500 dark:text-gray-300">Support Tickets</p>
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white">49</h2>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/admin/AdminDashboardHome.jsx
import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBook,
  FaChartLine,
  FaTicketAlt,
} from "react-icons/fa";
import API from "../../services/axios";

const statCards = [
  {
    label: "Total Users",
    icon: FaUsers,
    color: "text-indigo-600",
    fetch: () => API.get("/admin/users?limit=1").then(r => r.data.total),
  },
  {
    label: "Total Quizzes",
    icon: FaBook,
    color: "text-green-600",
    fetch: () => API.get("/quizzes/admin/quizzes").then(r => r.data.length),
  },
  {
    label: "Leaderboard Entries",
    icon: FaChartLine,
    color: "text-yellow-600",
    fetch: () =>
      API.get("/quizzes/leaderboard", { params: { page: 1, limit: 1 } })
         .then(r => r.data.total),
  },
  {
    label: "Open Tickets",
    icon: FaTicketAlt,
    color: "text-pink-600",
    fetch: () => API.get("/admin/tickets?status=open")
                     .then(r => r.data.total),
  },
];

export default function AdminDashboardHome() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(statCards.map(card => card.fetch()))
      .then(values => {
        setStats(values);
      })
      .catch(err => {
        console.error("Failed to load dashboard stats", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center space-x-4 transition-transform transform hover:scale-105"
          >
            <div
              className={`p-4 rounded-full bg-opacity-10 ${card.color} bg-current`}
            >
              <Icon className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats[i]?.toLocaleString() ?? "-"}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

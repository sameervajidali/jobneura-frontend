
// // src/pages/admin/AdminDashboardHome.jsx
// import React, { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaBook,
//   FaChartLine,
//   FaTicketAlt,
// } from "react-icons/fa";
// import API from "../../services/axios";

// const statCards = [
//   {
//     label: "Total Users",
//     icon: FaUsers,
//     color: "text-indigo-600",
//     fetch: () => API.get("/admin/users?limit=1").then(r => r.data.total),
//   },
//   {
//     label: "Total Quizzes",
//     icon: FaBook,
//     color: "text-green-600",
//     fetch: () => API.get("/quizzes/admin/quizzes").then(r => r.data.length),
//   },
//   {
//     label: "Leaderboard Entries",
//     icon: FaChartLine,
//     color: "text-yellow-600",
//     fetch: () =>
//       API.get("/quizzes/leaderboard", { params: { page: 1, limit: 1 } })
//          .then(r => r.data.total),
//   },
//   {
//     label: "Open Tickets",
//     icon: FaTicketAlt,
//     color: "text-pink-600",
//     fetch: () => API.get("/admin/tickets?status=open")
//                      .then(r => r.data.total),
//   },
// ];

// export default function AdminDashboardHome() {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     Promise.all(statCards.map(card => card.fetch()))
//       .then(values => {
//         setStats(values);
//       })
//       .catch(err => {
//         console.error("Failed to load dashboard stats", err);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {statCards.map((card, i) => {
//         const Icon = card.icon;
//         return (
//           <div
//             key={card.label}
//             className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center space-x-4 transition-transform transform hover:scale-105"
//           >
//             <div
//               className={`p-4 rounded-full bg-opacity-10 ${card.color} bg-current`}
//             >
//               <Icon className="text-2xl" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {card.label}
//               </p>
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {stats[i]?.toLocaleString() ?? "-"}
//               </h2>
//             </div>
//           </div>
//         );
//       })}
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
  FaLayerGroup,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import API from "../../services/axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function AdminDashboardHome() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [dau, setDau] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        // 1) Top stats
        const [{ data: u }, { data: q }, { data: lb }, { data: t }] = await Promise.all([
          API.get("/admin/users?limit=1"),                          // { total }
          API.get("/quizzes/admin/quizzes"),                        // []
          API.get("/quizzes/leaderboard", { params: { page:1, limit:1 }}), // { total }
          API.get("/admin/tickets?status=open"),                    // { tickets: [], total }
        ]);

        setStats({
          totalUsers: u.total,
          totalQuizzes: q.length,
          leaderboardEntries: lb.total,
          openTickets: t.total,
        });

        // 2) DAU last 7 days
        const { data: dauData } = await API.get("/admin/stats/dau");
        // dauData = [{ date: "2025-05-01", count: 23 }, …]
        setDau(dauData);

        // 3) Category breakdown
        const { data: catData } = await API.get("/admin/stats/categories");
        // catData = [{ name: "JavaScript", value: 42 }, …]
        setCategories(catData);

        // 4) Recent rows
        const { data: ru } = await API.get("/admin/users?limit=5&page=1");
        setRecentUsers(ru.users || []);

        const { data: rq } = await API.get("/quizzes/admin/quizzes?limit=5&page=1");
        setRecentQuizzes(rq);

        setTickets(t.tickets || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Users",       value: stats.totalUsers,       icon: FaUsers,      bg: "bg-indigo-100", color: "text-indigo-600" },
          { label: "Quizzes",     value: stats.totalQuizzes,     icon: FaBook,       bg: "bg-green-100",  color: "text-green-600" },
          { label: "Leaderboard", value: stats.leaderboardEntries,icon: FaChartLine,  bg: "bg-yellow-100", color: "text-yellow-600" },
          { label: "Tickets",     value: stats.openTickets,       icon: FaTicketAlt,  bg: "bg-pink-100",   color: "text-pink-600" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center space-x-4 hover:shadow-lg transition">
              <div className={`${c.bg} p-3 rounded-full`}>
                <Icon className={`${c.color} text-2xl`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{att?.createdAt
    ? new Date(att.createdAt).toLocaleString()
    : '–'}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Daily Active Users</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dau}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Top Categories</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {categories.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">New Users</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-1">Name</th>
                <th className="py-1">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentUsers.map(u => (
                <tr key={u._id}>
                  <td className="py-2 text-gray-700 dark:text-gray-200">{u.name}</td>
                  <td className="py-2 text-gray-700 dark:text-gray-200">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Recent Quizzes</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-1">Title</th>
                <th className="py-1">Questions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentQuizzes.map(q => (
                <tr key={q._id}>
                  <td className="py-2 text-gray-700 dark:text-gray-200">{q.title}</td>
                  <td className="py-2 text-gray-700 dark:text-gray-200">{q.questions.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Open Tickets */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Open Tickets</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-1">Subject</th>
                <th className="py-1">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tickets.map(t => (
                <tr key={t._id}>
                  <td className="py-2 text-gray-700 dark:text-gray-200">{t.subject}</td>
                  <td className="py-2 text-gray-700 dark:text-gray-200">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

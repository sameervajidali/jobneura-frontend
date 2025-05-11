// // src/pages/admin/AdminDashboardHome.jsx
// import React, { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaBook,
//   FaChartLine,
//   FaTicketAlt,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import API from "../../services/axios";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

// export default function AdminDashboardHome() {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalQuizzes: 0,
//     leaderboardEntries: 0,
//     openTickets: 0,
//   });
//   const [dau, setDau] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [recentUsers, setRecentUsers] = useState([]);
//   const [recentQuizzes, setRecentQuizzes] = useState([]);
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     async function fetchAll() {
//       setLoading(true);
//       try {
//         // 1) Top stats
//         const [
//           { data: usersPage },
//           { data: allQuizzes },
//           { data: leaderboardPage },
//           ticketsRes,
//         ] = await Promise.all([
//           API.get("/admin/users?limit=1&page=1"),
//           API.get("/quizzes/admin/quizzes"),
//           API.get("/quizzes/leaderboard", { params: { page: 1, limit: 1 } }),
//           // tickets endpoint might not exist yet—catch failures below
//           API.get("/admin/tickets?status=open").catch(() => ({ data: { total: 0, tickets: [] } })),
//         ]);

//         setStats({
//           totalUsers: usersPage.total || 0,
//           totalQuizzes: Array.isArray(allQuizzes) ? allQuizzes.length : 0,
//           leaderboardEntries: leaderboardPage.total || 0,
//           openTickets: ticketsRes.data.total || 0,
//         });
//         setTickets(ticketsRes.data.tickets || []);

//         // 2) DAU last 7 days
//         const { data: dauData } = await API.get("/admin/stats/dau");
//         setDau(Array.isArray(dauData) ? dauData : []);

//         // 3) Category breakdown
//         const { data: catData } = await API.get("/admin/stats/categories");
//         setCategories(Array.isArray(catData) ? catData : []);

//         // 4) Recent rows
//         const { data: recentUsersPage } = await API.get("/admin/users?limit=5&page=1");
//         setRecentUsers(Array.isArray(recentUsersPage.users) ? recentUsersPage.users : []);

//         const { data: recentQuizzesList } = await API.get("/quizzes/admin/quizzes?limit=5&page=1");
//         setRecentQuizzes(Array.isArray(recentQuizzesList) ? recentQuizzesList : []);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAll();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
//       </div>
//     );
//   }

//   const statCards = [
//     {
//       label: "Users",
//       value: stats.totalUsers,
//       icon: FaUsers,
//       bg: "bg-indigo-100",
//       color: "text-indigo-600",
//     },
//     {
//       label: "Quizzes",
//       value: stats.totalQuizzes,
//       icon: FaBook,
//       bg: "bg-green-100",
//       color: "text-green-600",
//     },
//     {
//       label: "Leaderboard",
//       value: stats.leaderboardEntries,
//       icon: FaChartLine,
//       bg: "bg-yellow-100",
//       color: "text-yellow-600",
//     },
//     {
//       label: "Tickets",
//       value: stats.openTickets,
//       icon: FaTicketAlt,
//       bg: "bg-pink-100",
//       color: "text-pink-600",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Top Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map(({ label, value, icon: Icon, bg, color }) => (
//           <div
//             key={label}
//             className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center space-x-4 hover:shadow-lg transition"
//           >
//             <div className={`${bg} p-3 rounded-full`}>
//               <Icon className={`${color} text-2xl`} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
//                 {value != null ? value : "–"}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Daily Active Users */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
//             Daily Active Users
//           </h4>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={dau}>
//               <XAxis dataKey="date" stroke="#8884d8" />
//               <YAxis stroke="#8884d8" />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category Breakdown */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
//             Top Categories
//           </h4>
//           <ResponsiveContainer width="100%" height={200}>
//             <PieChart>
//               <Pie
//                 data={categories}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={50}
//                 outerRadius={80}
//                 label
//               >
//                 {categories.map((_, idx) => (
//                   <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend verticalAlign="bottom" height={36} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Tables */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recent Users */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
//             New Users
//           </h4>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500">
//                 <th className="py-1">Name</th>
//                 <th className="py-1">Email</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {recentUsers.map((u) => (
//                 <tr key={u._id}>
//                   <td className="py-2 text-gray-700 dark:text-gray-200">{u.name}</td>
//                   <td className="py-2 text-gray-700 dark:text-gray-200">{u.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Recent Quizzes */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
//             Recent Quizzes
//           </h4>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500">
//                 <th className="py-1">Title</th>
//                 <th className="py-1">Questions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {recentQuizzes.map((q) => (
//                 <tr key={q._id}>
//                   <td className="py-2 text-gray-700 dark:text-gray-200">{q.title}</td>
//                   <td className="py-2 text-gray-700 dark:text-gray-200">
//                     {Array.isArray(q.questions) ? q.questions.length : "–"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Open Tickets */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
//             Open Tickets
//           </h4>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500">
//                 <th className="py-1">Subject</th>
//                 <th className="py-1">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {tickets.length > 0 ? (
//                 tickets.map((t) => (
//                   <tr key={t._id}>
//                     <td className="py-2 text-gray-700 dark:text-gray-200">{t.subject}</td>
//                     <td className="py-2 text-gray-700 dark:text-gray-200">{t.status}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={2} className="py-2 text-center text-gray-500">
//                     No open tickets
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
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
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    leaderboardEntries: 0,
    openTickets: 0,
  });
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
        const [
          { data: usersPage },
          { data: allQuizzes },
          { data: leaderboardPage },
          ticketsRes,
        ] = await Promise.all([
          API.get("/api/admin/users?limit=1&page=1"),
          API.get("/api/quizzes/admin/quizzes?limit=1&page=1"),
          API.get("/api/quizzes/leaderboard", { params: { page: 1, limit: 1 } }),
          API.get("/api/admin/tickets?status=open").catch(() => ({ data: { total: 0, tickets: [] } })),
        ]);

        setStats({
          totalUsers: usersPage.total || 0,
          totalQuizzes: Array.isArray(allQuizzes) ? allQuizzes.length : allQuizzes.total || 0,
          leaderboardEntries: leaderboardPage.total || 0,
          openTickets: ticketsRes.data.total || 0,
        });
        setTickets(ticketsRes.data.tickets || []);

        // 2) DAU last 7 days
        const { data: dauData } = await API.get("/api/admin/stats/dau");
        setDau(Array.isArray(dauData) ? dauData : []);

        // 3) Category breakdown
        const { data: catData } = await API.get("/api/admin/stats/categories");
        setCategories(Array.isArray(catData) ? catData : []);

        // 4) Recent rows
        const { data: recentUsersPage } = await API.get("/api/admin/users?limit=5&page=1");
        setRecentUsers(recentUsersPage.users || []);

        const { data: recentQuizzesList } = await API.get("/api/quizzes/admin/quizzes?limit=5&page=1");
        setRecentQuizzes(Array.isArray(recentQuizzesList) ? recentQuizzesList : recentQuizzesList.quizzes || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  const statCards = [
    { label: "Users", value: stats.totalUsers, icon: FaUsers, bg: "bg-indigo-100", color: "text-indigo-600" },
    { label: "Quizzes", value: stats.totalQuizzes, icon: FaBook, bg: "bg-green-100", color: "text-green-600" },
    { label: "Leaderboard", value: stats.leaderboardEntries, icon: FaChartLine, bg: "bg-yellow-100", color: "text-yellow-600" },
    { label: "Tickets", value: stats.openTickets, icon: FaTicketAlt, bg: "bg-pink-100", color: "text-pink-600" },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <div className={`${bg} p-3 rounded-full`}> <Icon className={`${color} text-2xl`} /> </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h4 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Daily Active Users</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dau} margin={{ top: 0, right: 24, left: -16, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h4 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Top Categories</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categories} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} label>
                {categories.map((_, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-auto">
          <h4 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">New Users</h4>
          <table className="w-full text-sm text-left">
            <thead className="border-b"><tr className="text-gray-500"><th>Name</th><th>Email</th></tr></thead>
            <tbody className="divide-y">
              {recentUsers.map(u => (
                <tr key={u._id}><td className="py-2 text-gray-700 dark:text-gray-200">{u.name}</td><td className="py-2 text-gray-700 dark:text-gray-200">{u.email}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Quizzes */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-auto">
          <h4 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Recent Quizzes</h4>
          <table className="w-full text-sm text-left">
            <thead className="border-b"><tr className="text-gray-500"><th>Title</th><th>Questions</th></tr></thead>
            <tbody className="divide-y">
              {recentQuizzes.map(q => (
                <tr key={q._id}><td className="py-2 text-gray-700 dark:text-gray-200">{q.title}</td><td className="py-2 text-gray-700 dark:text-gray-200">{q.questions?.length ?? '–'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Open Tickets */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-auto">
          <h4 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Open Tickets</h4>
          <table className="w-full text-sm text-left">
            <thead className="border-b"><tr className="text-gray-500"><th>Subject</th><th>Status</th></tr></thead>
            <tbody className="divide-y">
              {tickets.length > 0 ? tickets.map(t => (
                <tr key={t._id}><td className="py-2 text-gray-700 dark:text-gray-200">{t.subject}</td><td className="py-2 text-gray-700 dark:text-gray-200">{t.status}</td></tr>
              )) : (
                <tr><td colSpan={2} className="py-2 text-center text-gray-500">No open tickets</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

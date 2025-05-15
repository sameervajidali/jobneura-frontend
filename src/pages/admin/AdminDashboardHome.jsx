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
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import API from "../../services/axios";

const LINE_COLOR = "#4F46E5"; // Indigo-600
const PIE_COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#EC4899",
  "#8B5CF6",
  "#F97316",
];

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
          API.get("/admin/users?limit=1&page=1"),
          API.get("/quizzes/admin/quizzes"),
          API.get("/quizzes/leaderboard", { params: { page: 1, limit: 1 } }),
          API.get("/ticket/admin/tickets?status=open").catch(() => ({ data: { total: 0, tickets: [] } })),
        ]);

        setStats({
          totalUsers: usersPage.total || 0,
          totalQuizzes: Array.isArray(allQuizzes) ? allQuizzes.length : 0,
          leaderboardEntries: leaderboardPage.total || 0,
          openTickets: ticketsRes.data.total || 0,
        });
        setTickets(ticketsRes.data.tickets || []);

        // 2) DAU last 7 days
        const { data: dauData } = await API.get("/admin/stats/dau");
        setDau(Array.isArray(dauData) ? dauData : []);

        // 3) Category breakdown
        const { data: catData } = await API.get("/admin/stats/categories");
        // expecting [ { name, count } ]
        setCategories(Array.isArray(catData) ? catData : []);

        // 4) Recent rows
        const { data: recentUsersPage } = await API.get("/admin/users?limit=5&page=1");
        setRecentUsers(Array.isArray(recentUsersPage.users) ? recentUsersPage.users : []);

        const { data: recentQuizzesList } = await API.get(
          "/quizzes/admin/quizzes?limit=5&page=1"
        );
        setRecentQuizzes(Array.isArray(recentQuizzesList) ? recentQuizzesList : []);
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
      <div className="flex items-center justify-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Users",
      value: stats.totalUsers,
      icon: FaUsers,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      label: "Quizzes",
      value: stats.totalQuizzes,
      icon: FaBook,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      label: "Leaderboard",
      value: stats.leaderboardEntries,
      icon: FaChartLine,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      label: "Tickets",
      value: stats.openTickets,
      icon: FaTicketAlt,
      bg: "bg-pink-100",
      color: "text-pink-600",
    },
  ];

  return (
    <div className="space-y-8 p-4">
      {/* Top Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, bg, color }) => (
          <div
            key={label}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition h-full flex items-center"
          >
            <div className={`${bg} p-3 rounded-full mr-4`}>
              <Icon className={`${color} text-2xl`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">
                {label}
              </p>
              <h3 className="text-2xl font-semibold text-gray-900">
                {value != null ? value : "–"}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Daily Active Users */}
        <div className="bg-white p-6 rounded-lg shadow h-80">
          <h4 className="text-lg font-semibold mb-4">
            Daily Active Users (Last 7 Days)
          </h4>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={dau} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke={LINE_COLOR}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow h-80 flex flex-col">
          <h4 className="text-lg font-semibold mb-4">
            Top Categories
          </h4>
          <div className="flex-1 flex flex-row">
            <ResponsiveContainer width="70%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  label={({ name }) => name}
                >
                  {categories.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/3 pl-4 overflow-auto">
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ lineHeight: '24px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* New Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">New Users</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 uppercase text-xs">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentUsers.map((u) => (
                  <tr key={u._id}>
                    <td className="py-2 text-gray-700">{u.name}</td>
                    <td className="py-2 text-gray-700">{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Recent Quizzes</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 uppercase text-xs">
                  <th className="py-2">Title</th>
                  <th className="py-2">Questions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentQuizzes.map((q) => (
                  <tr key={q._id}>
                    <td className="py-2 text-gray-700">{q.title}</td>
                    <td className="py-2 text-gray-700">
                      {Array.isArray(q.questions) ? q.questions.length : "–"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Open Tickets */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Open Tickets</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 uppercase text-xs">
                  <th className="py-2">Subject</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tickets.length > 0 ? (
                  tickets.map((t) => (
                    <tr key={t._id}>
                      <td className="py-2 text-gray-700">{t.subject}</td>
                      <td className="py-2 text-gray-700">{t.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-gray-500">
                      No open tickets
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

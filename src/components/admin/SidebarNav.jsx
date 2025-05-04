// src/components/admin/SidebarNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBook, FaChartBar, FaCogs, FaShieldAlt, FaComments } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: <FaChartBar />, roles: ["superadmin", "admin", "creator", "moderator", "support"] },
  { path: "/admin/users", label: "Users", icon: <FaUser />, roles: ["superadmin", "admin"] },
  { path: "/admin/quizzes", label: "Quizzes", icon: <FaBook />, roles: ["creator", "admin", "superadmin"] },
  { path: "/admin/blogs", label: "Blogs", icon: <FaBook />, roles: ["creator", "moderator"] },
  { path: "/admin/tickets", label: "Support", icon: <FaComments />, roles: ["support", "admin"] },
  { path: "/admin/roles", label: "Roles", icon: <FaShieldAlt />, roles: ["superadmin"] },
  { path: "/admin/settings", label: "Settings", icon: <FaCogs />, roles: ["superadmin"] },
];

export default function SidebarNav() {
  const { user } = useAuth();
  console.log("💡 Auth user:", user);

  const location = useLocation();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block">
      <div className="p-6 font-bold text-indigo-600 text-xl">JobNeura Admin</div>
      <nav className="px-4 space-y-1">
        {navItems.filter(item => item.roles.includes(user?.role.toLowerCase())).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 ${location.pathname.startsWith(item.path) ? "bg-indigo-100 dark:bg-gray-700" : ""}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

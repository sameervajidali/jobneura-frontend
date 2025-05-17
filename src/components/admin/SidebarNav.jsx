// src/components/admin/SidebarNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaBook,
  FaChartBar,
  FaSearch,
  FaBriefcase,
  FaCogs,
  FaShieldAlt,
  FaComments,
  FaTags,
  FaList,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: <FaChartBar />,
    roles: ["superadmin", "admin", "creator", "moderator", "support"],
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: <FaUser />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/quizzes",
    label: "Quizzes",
    icon: <FaBook />,
    roles: ["superadmin", "admin", "creator"],
  },
  {
    path: "/admin/categories",
    label: "Categories",
    icon: <FaTags />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/topics",
    label: "Topics",
    icon: <FaList />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/leaderboard",
    label: "Leaderboard",
    icon: <FaChartBar />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/blogs",
    label: "Blogs",
    icon: <FaBook />,
    roles: ["superadmin", "creator", "moderator"],
  },
  {
    path: "/admin/tickets",
    label: "Tickets",
    icon: <FaComments />,
    roles: ["superadmin", "admin", "support"],
  },
  {
    path: "/admin/reports",
    label: "Reports",
    icon: <FaFileAlt />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/roles",
    label: "Roles",
    icon: <FaShieldAlt />,
    roles: ["superadmin"],
  },
  {
    path: "/admin/jobs",
    label: "Jobs",
    icon: <FaBriefcase />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/seo-manager",
    label: "SEO Manager",
    icon: <FaSearch />,
    roles: ["superadmin", "admin"],
  },
  {
    path: "/admin/settings",
    label: "Settings",
    icon: <FaCogs />,
    roles: ["superadmin"],
  },
];

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const rawRole = typeof user?.role === "string" ? user.role : user?.role?.name;
  const currentRole = typeof rawRole === "string" ? rawRole.toLowerCase() : "";

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="text-2xl text-indigo-600 bg-white dark:bg-gray-800 rounded-full shadow p-2"
          aria-label="Open sidebar"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-56 bg-white dark:bg-gray-900 border-r dark:border-gray-800
          shadow-xl md:shadow-none flex flex-col
          transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo & Brand */}
        <div className="flex items-center h-16 px-6 border-b bg-white dark:bg-gray-900">
          <span className="bg-indigo-600 text-white rounded-xl p-2 mr-2 flex items-center justify-center shadow">
            <FaChartBar className="w-6 h-6" />
          </span>
          <span className="font-bold text-xl text-indigo-700 dark:text-indigo-300 tracking-tight">
            JobNeura
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 sidebar-scroll">
          {navItems
            .filter((i) => i.roles.includes(currentRole))
            .map((i) => {
              const isActive =
                location.pathname === i.path ||
                location.pathname.startsWith(i.path + "/");
              return (
                <Link
                  key={i.path}
                  to={i.path}
                  className={`
    flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-150
    group focus:outline-none focus:ring-2 focus:ring-indigo-400
    ${
      isActive
        ? "bg-indigo-50 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-100 shadow-[2px_0_8px_0_#6366f11a]"
        : "text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-800"
    }
  `}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{i.icon}</span>
                  <span className="truncate text-base">{i.label}</span>
                </Link>
              );
            })}
        </nav>

        {/* User Info (optional, bottom) */}
        {user && (
          <div className="mt-auto px-6 py-4 border-t dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            <div className="font-semibold text-indigo-600 dark:text-indigo-300">
              {user.name}
            </div>
            <div className="capitalize">{currentRole}</div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

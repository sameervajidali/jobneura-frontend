// src/components/admin/SidebarNav.jsx
import React from "react";
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
    roles: ["superadmin", "admin", "creator"],
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

export default function SidebarNav({ isOpen, onToggle }) {
  const { user } = useAuth();
  const location = useLocation();

  // Normalize role to lowercase string
  const rawRole = typeof user?.role === "string" ? user.role : user?.role?.name;
  const currentRole = typeof rawRole === "string" ? rawRole.toLowerCase() : "";

  return (
    <>
      {/* Overlay: only show on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onToggle}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-background border-r border-border
          shadow-xl flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-56" : "-translate-x-full md:translate-x-0 md:w-14"}
        `}
        aria-label="Admin sidebar navigation"
        aria-hidden={!isOpen && window.innerWidth < 768}
      >
        {/* Header with logo and collapse button */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-background">
          <span
            className="bg-indigo-600 text-white rounded-xl p-2 flex items-center justify-center shadow"
            aria-label="JobNeura Logo"
            role="img"
          >
            <FaChartBar className="w-6 h-6" aria-hidden="true" />
          </span>
          <button
            onClick={onToggle}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            type="button"
          >
            {isOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation links */}
        <nav
          className="flex-1 overflow-y-auto px-2 py-4 space-y-1 sidebar-scroll"
          aria-label="Admin navigation links"
        >
          {navItems
            .filter((item) => item.roles.includes(currentRole))
            .map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/");

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-150
                    group focus:outline-none focus:ring-2 focus:ring-indigo-400
                    ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-100 shadow-[2px_0_8px_0_#6366f11a]"
                        : "text-foreground hover:bg-indigo-100 dark:hover:bg-gray-800"
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onToggle(); // close sidebar on mobile after nav click
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  {isOpen && <span className="truncate text-base">{item.label}</span>}
                </Link>
              );
            })}
        </nav>

        {/* User info section */}
        {isOpen && user && (
          <div className="mt-auto px-6 py-4 border-t border-border text-xs text-gray-500 dark:text-gray-400 bg-background">
            <div
              className="font-semibold text-indigo-600 dark:text-indigo-300"
              tabIndex={-1}
            >
              {user.name}
            </div>
            <div className="capitalize">{currentRole}</div>
          </div>
        )}
      </aside>
    </>
  );
}

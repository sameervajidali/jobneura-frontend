// src/components/admin/SidebarNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser, FaBook, FaChartBar, FaSearch, FaBriefcase, FaCogs,
  FaShieldAlt, FaComments, FaTags, FaList, FaFileAlt, FaBars, FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

// Navigation items with role-based access control and icons
const navItems = [
  { path: "/admin",             label: "Dashboard",     icon: <FaChartBar />,    roles: ["superadmin", "admin", "creator", "moderator", "support"] },
  { path: "/admin/users",       label: "Users",         icon: <FaUser />,        roles: ["superadmin", "admin"] },
  { path: "/admin/quizzes",     label: "Quizzes",       icon: <FaBook />,        roles: ["superadmin", "admin", "creator"] },
  { path: "/admin/categories",  label: "Categories",    icon: <FaTags />,        roles: ["superadmin", "admin"] },
  { path: "/admin/topics",      label: "Topics",        icon: <FaList />,        roles: ["superadmin", "admin"] },
  { path: "/admin/leaderboard", label: "Leaderboard",   icon: <FaChartBar />,    roles: ["superadmin", "admin"] },
  { path: "/admin/blogs",       label: "Blogs",         icon: <FaBook />,        roles: ["superadmin", "creator", "moderator"] }, // Removed duplicate "creator"
  { path: "/admin/tickets",     label: "Tickets",       icon: <FaComments />,    roles: ["superadmin", "admin", "support"] },
  { path: "/admin/reports",     label: "Reports",       icon: <FaFileAlt />,     roles: ["superadmin", "admin"] },
  { path: "/admin/roles",       label: "Roles",         icon: <FaShieldAlt />,   roles: ["superadmin"] },
  { path: "/admin/jobs",        label: "Jobs",          icon: <FaBriefcase />,   roles: ["superadmin", "admin", "creator"] },
  { path: "/admin/seo-manager", label: "SEO Manager",   icon: <FaSearch />,      roles: ["superadmin", "admin"] },
  { path: "/admin/settings",    label: "Settings",      icon: <FaCogs />,        roles: ["superadmin"] },
];

export default function SidebarNav() {
  // State for controlling mobile sidebar open/close
  const [isOpen, setIsOpen] = useState(false);

  // Get logged in user info & role from context
  const { user } = useAuth();
  const location = useLocation();

  // Normalize user role to lowercase string for case-insensitive matching
  const rawRole = typeof user?.role === "string" ? user.role : user?.role?.name;
  const currentRole = typeof rawRole === "string" ? rawRole.toLowerCase() : "";

  return (
    <>
      {/* Mobile Hamburger Button: visible only on small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(o => !o)}
          className="text-2xl text-indigo-600 bg-background rounded-full shadow p-2 border border-border"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
          aria-controls="sidebar-navigation"
        >
          {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        id="sidebar-navigation"
        className={`
          fixed top-0 left-0 z-40 h-full w-56 bg-background border-r border-border
          shadow-xl md:shadow-none flex flex-col
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-hidden={!isOpen && window.innerWidth < 768} // Hide sidebar from screen readers on mobile when closed
      >
        {/* Logo & Branding */}
        <div className="flex items-center h-16 px-6 border-b border-border bg-background">
          <span className="bg-indigo-600 text-white rounded-xl p-2 mr-2 flex items-center justify-center shadow">
            <FaChartBar className="w-6 h-6" aria-hidden="true" />
          </span>
          <span className="font-bold text-xl text-indigo-700 dark:text-indigo-300 tracking-tight">
            JobNeura
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 sidebar-scroll" aria-label="Admin navigation">
          {navItems
            // Filter links based on user role access
            .filter(item => item.roles.includes(currentRole))
            .map(item => {
              // Determine if current location matches the nav item path (active state)
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
                    ${isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-100 shadow-[2px_0_8px_0_#6366f11a]"
                      : "text-foreground hover:bg-indigo-100 dark:hover:bg-gray-800"
                    }
                  `}
                  onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile UX)
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span className="truncate text-base">{item.label}</span>
                </Link>
              );
            })}
        </nav>

        {/* User Info Section at bottom */}
        {user && (
          <div className="mt-auto px-6 py-4 border-t border-border text-xs text-gray-500 dark:text-gray-400 bg-background">
            <div className="font-semibold text-indigo-600 dark:text-indigo-300" tabIndex={-1}>
              {user.name}
            </div>
            <div className="capitalize">{currentRole}</div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </>
  );
}

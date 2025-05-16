// src/components/navigation/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpenCheck,
  Briefcase,
  User,
  Menu
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Resume", icon: FileText, to: "/dashboard/resume" },
  { label: "Quizzes", icon: BookOpenCheck, to: "/dashboard/quizzes" },
  { label: "Jobs", icon: Briefcase, to: "/dashboard/jobs" },
  { label: "Profile", icon: User, to: "/dashboard/profile" },
];

export function Sidebar() {
  // Mobile sidebar open/close state
  const [open, setOpen] = useState(false);

  // Desktop Sidebar
  const sidebar = (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex-shrink-0 hidden md:flex flex-col">
      <div className="h-16 px-6 flex items-center text-xl font-bold text-indigo-700 dark:text-indigo-400 border-b border-gray-200 dark:border-gray-800 tracking-tight" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
        JobNeura
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
              }`
            }
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', fontSize: "15px" }}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Mobile Sidebar (Drawer)
  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 rounded-lg bg-white/90 dark:bg-gray-900/90 shadow border border-gray-200 dark:border-gray-800 p-2"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
      </button>
      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setOpen(false)}></div>
      <aside className={`fixed top-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:hidden flex flex-col`}>
        <div className="h-16 px-6 flex items-center text-xl font-bold text-indigo-700 dark:text-indigo-400 border-b border-gray-200 dark:border-gray-800 tracking-tight" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
          JobNeura
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
                }`
              }
              style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', fontSize: "15px" }}
              onClick={() => setOpen(false)}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Desktop sidebar (always visible on md+) */}
      {sidebar}
    </>
  );
}

// src/components/navigation/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, BookOpenCheck, Briefcase, User } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Resume", icon: FileText, to: "/dashboard/resume" },
  { label: "Quizzes", icon: BookOpenCheck, to: "/dashboard/quizzes" },
  { label: "Jobs", icon: Briefcase, to: "/dashboard/jobs" },
  { label: "Profile", icon: User, to: "/dashboard/profile" },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white border-r hidden md:flex flex-col">
      <div className="px-6 py-4 text-lg font-bold text-indigo-700 border-b">
        JobNeura
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-50 text-sm font-medium transition ${
                isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
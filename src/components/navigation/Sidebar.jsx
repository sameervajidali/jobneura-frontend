// src/components/navigation/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BookOpenCheck,
  Briefcase,
  User,
  Menu,
  Code,
  Award,
  ClipboardList,
  BarChart2,
  Settings2,
  Bell
} from 'lucide-react';

// Define sections with labels, icons, and routes
const navGroups = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
      { label: 'Jobs',      icon: Briefcase,       to: '/dashboard/jobs' },
      { label: 'Quizzes',   icon: BookOpenCheck,  to: '/dashboard/quizzes' },
      { label: 'Resume',    icon: FileText,       to: '/dashboard/resume' }
    ]
  },
  {
    title: 'Profile',
    items: [
      { label: 'Overview',        icon: User,   to: '/dashboard/profile' },
      { label: 'Projects',        icon: Code,   to: '/dashboard/projects' },
      { label: 'Certifications',  icon: Award,  to: '/dashboard/certifications' }
    ]
  },
  {
    title: 'Activity',
    items: [
      { label: 'Applications', icon: ClipboardList, to: '/dashboard/applications' },
      { label: 'Assessments',  icon: BarChart2,     to: '/dashboard/assessments' }
    ]
  },
  {
    title: 'Settings',
    items: [
      { label: 'Preferences',   icon: Settings2, to: '/dashboard/preferences' },
      { label: 'Notifications', icon: Bell,      to: '/dashboard/notifications' }
    ]
  }
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Helper to render NavLink items
  const renderItems = (items) =>
    items.map(({ label, icon: Icon, to }) => (
      <NavLink
        key={label}
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
            isActive
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800'
          }`
        }
        onClick={() => setOpen(false)}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span className="truncate">{label}</span>
      </NavLink>
    ));

  // Shared sidebar content (grouped navigation)
  const sidebarContent = (
    <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 sidebar-scroll">
      {navGroups.map((group) => (
        <nav key={group.title} className="mb-6">
          <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">
            {group.title}
          </h6>
          <div className="space-y-1">
            {renderItems(group.items)}
          </div>
        </nav>
      ))}
    </div>
  );

  // Desktop Sidebar
  const desktopSidebar = (
    <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-56 bg-background 
          shadow-xl md:shadow-none flex flex-col
          transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          border-r border-gray-200 dark:border-gray-800
        `}
      >
      <div className="h-16 px-6 flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 border-b border-gray-200 dark:border-gray-800">
        JobNeura
      </div>
      {sidebarContent}
    </aside>
  );

  // Mobile Drawer
  const mobileSidebar = (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen transform transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:hidden flex flex-col`}
    >
      <div className="h-16 px-6 flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 border-b border-gray-200 dark:border-gray-800">
        JobNeura
      </div>
      {sidebarContent}
    </aside>
  );

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 rounded-lg bg-white/90 dark:bg-gray-900/90 shadow border border-gray-200 dark:border-gray-800 p-2"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      </button>

      {/* Overlay behind mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Render sidebars */}
      {mobileSidebar}
      {desktopSidebar}
    </>
  );
}

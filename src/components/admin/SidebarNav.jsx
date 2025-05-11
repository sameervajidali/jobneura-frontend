
// // src/components/admin/SidebarNav.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaUser,
//   FaBook,
//   FaChartBar,
//   FaCogs,
//   FaShieldAlt,
//   FaComments,
//   FaTags,
//   FaList,
//   FaFileAlt
// } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";

// const navItems = [
//   { path: "/admin",               label: "Dashboard",           icon: <FaChartBar />, roles: ["superadmin","admin","creator","moderator","support"] },
//   { path: "/admin/users",         label: "Users",               icon: <FaUser />,     roles: ["superadmin","admin"] },
//   { path: "/admin/quizzes",       label: "Quizzes",             icon: <FaBook />,     roles: ["creator","admin","superadmin"] },
//   // { path: "/admin/categories",    label: "Categories",          icon: <FaTags />,     roles: ["admin","superadmin"] },
//   // { path: "/admin/topics",        label: "Topics",              icon: <FaList />,     roles: ["admin","superadmin"] },
//   { path: "/admin/leaderboard",   label: "Leaderboard",         icon: <FaChartBar />, roles: ["admin","superadmin"] },
//   { path: "/admin/blogs",         label: "Blogs",               icon: <FaBook />,     roles: ["creator","moderator","superadmin"] },
//   { path: "/admin/tickets",       label: "Tickets",             icon: <FaComments />, roles: ["support","admin","superadmin"] },
//   { path: "/admin/reports",       label: "Reports",             icon: <FaFileAlt />,  roles: ["admin","superadmin"] },
//   { path: "/admin/roles",         label: "Roles",               icon: <FaShieldAlt />,roles: ["superadmin"] },
//   { path: "/admin/settings",      label: "Settings",            icon: <FaCogs />,     roles: ["superadmin"] },
// ];

// export default function SidebarNav() {
//   const { user } = useAuth();
//   const location = useLocation();

//   // Extract normalized current role as lowercase string
//   const rawRole = typeof user?.role === 'string'
//     ? user.role
//     : user?.role?.name;
//   const currentRole = typeof rawRole === 'string'
//     ? rawRole.toLowerCase()
//     : '';

//   return (
//     <aside className="hidden md:flex flex-col w-56 flex-shrink-0 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//       <div className="px-4 py-3 text-xl font-semibold text-indigo-600 dark:text-indigo-300 border-b border-gray-200 dark:border-gray-700">
//         JobNeura
//       </div>
//       <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
//         {navItems
//           .filter(item => item.roles.includes(currentRole))
//           .map(item => {
//             const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center gap-2 px-4 py-2 rounded text-gray-700 dark:text-gray-200 transition-colors ${
//                   isActive
//                     ? 'bg-gray-100 dark:bg-gray-700 font-medium'
//                     : 'hover:bg-gray-100 dark:hover:bg-gray-700'
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-base">{item.label}</span>
//               </Link>
//             );
//           })}
//       </nav>
//     </aside>
//   );
// }


// src/components/admin/SidebarNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaBook,
  FaChartBar,
  FaCogs,
  FaShieldAlt,
  FaComments,
  FaTags,
  FaList,
  FaFileAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { path: "/admin",             label: "Dashboard",   icon: <FaChartBar />, roles: ["superadmin","admin","creator","moderator","support"] },
  { path: "/admin/users",       label: "Users",       icon: <FaUser />,     roles: ["superadmin","admin"] },
  { path: "/admin/quizzes",     label: "Quizzes",     icon: <FaBook />,     roles: ["creator","admin","superadmin"] },
  { path: "/admin/categories",  label: "Categories",  icon: <FaTags />,     roles: ["admin","superadmin"] },
  { path: "/admin/topics",      label: "Topics",      icon: <FaList />,     roles: ["admin","superadmin"] },
  { path: "/admin/leaderboard", label: "Leaderboard", icon: <FaChartBar />, roles: ["admin","superadmin"] },
  { path: "/admin/blogs",       label: "Blogs",       icon: <FaBook />,     roles: ["creator","moderator","superadmin"] },
  { path: "/admin/tickets",     label: "Tickets",     icon: <FaComments />, roles: ["support","admin","superadmin"] },
  { path: "/admin/reports",     label: "Reports",     icon: <FaFileAlt />,  roles: ["admin","superadmin"] },
  { path: "/admin/roles",       label: "Roles",       icon: <FaShieldAlt />,roles: ["superadmin"] },
  { path: "/admin/settings",    label: "Settings",    icon: <FaCogs />,     roles: ["superadmin"] },
];

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Determine current role string
  const rawRole = typeof user?.role === 'string' ? user.role : user?.role?.name;
  const currentRole = typeof rawRole === 'string' ? rawRole.toLowerCase() : '';

  return (
    <>
      {/* Mobile hamburger toggle */}
      <div className="md:hidden p-2">
        <button
          onClick={() => setIsOpen(open => !open)}
          className="text-2xl text-gray-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform bg-white dark:bg-gray-800 border-r dark:border-gray-700 w-56 md:translate-x-0 transition-transform duration-200 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo / Brand */}
        <div className="px-4 py-3 text-xl font-semibold text-indigo-600 dark:text-indigo-300 border-b dark:border-gray-700">
          JobNeura
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {navItems
            .filter(item => item.roles.includes(currentRole))
            .map(item => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-gray-700 dark:text-gray-200 transition-colors ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </Link>
              );
            })}
        </nav>
      </aside>

      {/* Overlay for mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

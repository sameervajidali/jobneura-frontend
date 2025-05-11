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
// } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";

// const navItems = [
//   { path: "/admin",         label: "Dashboard", icon: <FaChartBar />,   roles: ["superadmin","admin","creator","moderator","support"] },
//   { path: "/admin/users",   label: "Users",     icon: <FaUser />,       roles: ["superadmin","admin"] },
//   { path: "/admin/quizzes", label: "Quizzes",   icon: <FaBook />,       roles: ["creator","admin","superadmin"] },
//   { path: "/admin/leaderboard", label: "Leaderboard", icon: <FaChartBar />, roles: ["admin","superadmin"] },
//   { path: "/admin/blogs",   label: "Blogs",     icon: <FaBook />,       roles: ["creator","moderator","superadmin"] },
//   { path: "/admin/tickets", label: "Support",   icon: <FaComments />,   roles: ["support","admin","superadmin"] },
//   { path: "/admin/roles",   label: "Roles",     icon: <FaShieldAlt />,  roles: ["superadmin"] },
//   { path: "/admin/settings",label: "Settings",  icon: <FaCogs />,       roles: ["superadmin"] },
// ];

// export default function SidebarNav() {
//   const { user } = useAuth();
//   const location = useLocation();

//   // Normalize user role to a lowercase string
//   const rawRole = typeof user?.role === 'string'
//     ? user.role
//     : user?.role?.name;
//   const currentRole = typeof rawRole === 'string'
//     ? rawRole.toLowerCase()
//     : '';

//   return (
//      <aside className="hidden md:flex flex-col w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
//        <div className="px-6 py-4 text-lg font-bold text-indigo-700 dark:text-indigo-300 border-b border-gray-200 dark:border-gray-700">
//         JobNeura
//       </div>
//       <nav className="flex-1 px-4 space-y-1">
//         {navItems
//           .filter(item => item.roles.includes(currentRole))
//           .map(item => {
//             const isActive = location.pathname.startsWith(item.path);
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={[
//                   "flex items-center gap-3 p-3 rounded-md text-gray-700 dark:text-gray-200",
//                   "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
//                   isActive
//                     ? "bg-gray-200 dark:bg-gray-700 font-semibold"
//                     : ""
//                 ].join(" ")}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//       </nav>
//     </aside>
//   );
// }


// src/components/admin/SidebarNav.jsx
import React from "react";
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
  FaFileAlt
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { path: "/admin",               label: "Dashboard",           icon: <FaChartBar />, roles: ["superadmin","admin","creator","moderator","support"] },
  { path: "/admin/users",         label: "Users",               icon: <FaUser />,     roles: ["superadmin","admin"] },
  { path: "/admin/quizzes",       label: "Quizzes",             icon: <FaBook />,     roles: ["creator","admin","superadmin"] },
  // { path: "/admin/categories",    label: "Categories",          icon: <FaTags />,     roles: ["admin","superadmin"] },
  // { path: "/admin/topics",        label: "Topics",              icon: <FaList />,     roles: ["admin","superadmin"] },
  { path: "/admin/leaderboard",   label: "Leaderboard",         icon: <FaChartBar />, roles: ["admin","superadmin"] },
  { path: "/admin/blogs",         label: "Blogs",               icon: <FaBook />,     roles: ["creator","moderator","superadmin"] },
  { path: "/admin/tickets",       label: "Tickets",             icon: <FaComments />, roles: ["support","admin","superadmin"] },
  { path: "/admin/reports",       label: "Reports",             icon: <FaFileAlt />,  roles: ["admin","superadmin"] },
  { path: "/admin/roles",         label: "Roles",               icon: <FaShieldAlt />,roles: ["superadmin"] },
  { path: "/admin/settings",      label: "Settings",            icon: <FaCogs />,     roles: ["superadmin"] },
];

export default function SidebarNav() {
  const { user } = useAuth();
  const location = useLocation();

  // Extract normalized current role as lowercase string
  const rawRole = typeof user?.role === 'string'
    ? user.role
    : user?.role?.name;
  const currentRole = typeof rawRole === 'string'
    ? rawRole.toLowerCase()
    : '';

  return (
    <aside className="hidden md:flex flex-col w-56 flex-shrink-0 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 py-3 text-xl font-semibold text-indigo-600 dark:text-indigo-300 border-b border-gray-200 dark:border-gray-700">
        JobNeura
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems
          .filter(item => item.roles.includes(currentRole))
          .map(item => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded text-gray-700 dark:text-gray-200 transition-colors ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}

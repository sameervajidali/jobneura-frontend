
// // src/components/admin/SidebarNav.jsx
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaChartBar,
//   FaUser,
//   FaBook,
//   FaTags,
//   FaList,
//   FaChartBar as FaLeaderboard,
//   FaBook as FaBlogs,
//   FaComments,
//   FaFileAlt,
//   FaShieldAlt,
//   FaCogs,
// } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";

// const navItems = [
//   { path: "/admin",             label: "Dashboard",   icon: <FaChartBar />,      roles: ["superadmin","admin","creator","moderator","support"] },
//   { path: "/admin/users",       label: "Users",       icon: <FaUser />,          roles: ["superadmin","admin"] },
//   { path: "/admin/quizzes",     label: "Quizzes",     icon: <FaBook />,          roles: ["creator","admin","superadmin"] },
//   { path: "/admin/categories",  label: "Categories",  icon: <FaTags />,          roles: ["admin","superadmin"] },
//   { path: "/admin/topics",      label: "Topics",      icon: <FaList />,          roles: ["admin","superadmin"] },
//   { path: "/admin/leaderboard", label: "Leaderboard", icon: <FaLeaderboard />,  roles: ["admin","superadmin"] },
//   { path: "/admin/blogs",       label: "Blogs",       icon: <FaBlogs />,         roles: ["creator","moderator","superadmin"] },
//   { path: "/admin/tickets",     label: "Tickets",     icon: <FaComments />,      roles: ["support","admin","superadmin"] },
//   { path: "/admin/reports",     label: "Reports",     icon: <FaFileAlt />,       roles: ["admin","superadmin"] },
//   { path: "/admin/roles",       label: "Roles",       icon: <FaShieldAlt />,     roles: ["superadmin"] },
//   { path: "/admin/settings",    label: "Settings",    icon: <FaCogs />,          roles: ["superadmin"] },
// ];

// export default function SidebarNav() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const { user } = useAuth();

//   // Normalize role name to lowercase string
//   const rawRole = typeof user?.role === "string"
//     ? user.role
//     : user?.role?.name;
//   const currentRole = typeof rawRole === "string"
//     ? rawRole.toLowerCase()
//     : "";

//   // Utility to check active path
//   const isActive = (path) =>
//     location.pathname === path || location.pathname.startsWith(path + "/");

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <div className="fixed top-4 left-4 z-50 md:hidden">
//         <button
//           onClick={() => setIsOpen(o => !o)}
//           className="p-2 bg-white dark:bg-gray-800 rounded shadow"
//           aria-label="Toggle sidebar"
//         >
//           {isOpen ? <FaTimes size={20}/> : <FaBars size={20}/>}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-40 flex flex-col
//           w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
//           transform md:translate-x-0 transition-transform duration-200 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* Brand */}
//         <div className="px-6 py-4 text-2xl font-bold text-indigo-600 dark:text-indigo-300 border-b border-gray-200 dark:border-gray-700">
//           JobNeura
//         </div>

//         {/* Nav links */}
//         <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
//           {navItems
//             .filter(item => item.roles.includes(currentRole))
//             .map(item => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`
//                   flex items-center gap-3 px-4 py-2 rounded-md
//                   text-gray-700 dark:text-gray-200
//                   transition-colors
//                   ${isActive(item.path)
//                     ? "bg-gray-100 dark:bg-gray-700 font-semibold"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                   }
//                 `}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-base">{item.label}</span>
//               </Link>
//             ))
//           }
//         </nav>
//       </aside>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }


// src/components/admin/SidebarNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser, FaBook, FaChartBar, FaCogs, FaShieldAlt,
  FaComments, FaTags, FaList, FaFileAlt, FaBars, FaTimes
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { path: "/admin",           label: "Dashboard",  icon:<FaChartBar/>, roles:["superadmin","admin","creator","moderator","support"] },
  { path: "/admin/users",     label: "Users",      icon:<FaUser/>,     roles:["superadmin","admin"] },
  { path: "/admin/quizzes",   label: "Quizzes",    icon:<FaBook/>,     roles:["creator","admin","superadmin"] },
  { path: "/admin/categories",label: "Categories", icon:<FaTags/>,     roles:["admin","superadmin"] },
  { path: "/admin/topics",    label: "Topics",     icon:<FaList/>,     roles:["admin","superadmin"] },
  { path: "/admin/leaderboard",label:"Leaderboard",icon:<FaChartBar/>, roles:["admin","superadmin"] },
  { path: "/admin/blogs",     label: "Blogs",      icon:<FaBook/>,     roles:["creator","moderator","superadmin"] },
  { path: "/admin/tickets",   label: "Tickets",    icon:<FaComments/>, roles:["support","admin","superadmin"] },
  { path: "/admin/reports",   label: "Reports",    icon:<FaFileAlt/>,  roles:["admin","superadmin"] },
  { path: "/admin/roles",     label: "Roles",      icon:<FaShieldAlt/>,roles:["superadmin"] },
  { path: "/admin/settings",  label: "Settings",   icon:<FaCogs/>,     roles:["superadmin"] },
];

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user }           = useAuth();
  const location           = useLocation();

  // unify role to lowercase string
  const rawRole    = typeof user?.role === 'string' ? user.role : user?.role?.name;
  const currentRole= typeof rawRole === 'string' ? rawRole.toLowerCase() : '';

  return (
    <>
      {/* ── Mobile hamburger ─────────────────────────────── */}
      <div className="md:hidden p-2">
        <button onClick={() => setIsOpen(o=>!o)} className="text-2xl text-gray-700">
          {isOpen ? <FaTimes/> : <FaBars/>}
        </button>
      </div>

      {/* ── Sidebar itself ───────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-55 bg-white dark:bg-gray-800 border-r dark:border-gray-700
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="px-4 py-3 text-xl font-semibold text-indigo-600 dark:text-indigo-300 border-b dark:border-gray-700">
          JobNeura
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {navItems
            .filter(i => i.roles.includes(currentRole))
            .map(i => {
              const isActive = location.pathname === i.path
                            || location.pathname.startsWith(i.path + '/');
              return (
                <Link
                  key={i.path}
                  to={i.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded text-gray-700 dark:text-gray-200
                    transition-colors
                    ${isActive
                      ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                  onClick={()=>setIsOpen(false)}
                >
                  <span className="text-lg">{i.icon}</span>
                  <span className="text-base">{i.label}</span>
                </Link>
              );
            })}
        </nav>
      </aside>

      {/* ── Mobile overlay ──────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={()=>setIsOpen(false)}
        />
      )}
    </>
  );
}

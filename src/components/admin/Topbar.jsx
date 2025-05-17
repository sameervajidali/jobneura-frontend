// // src/components/admin/Topbar.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaBell,
//   FaSun,
//   FaMoon,
//   FaSignOutAlt,
//   FaUserCircle,
//   FaKey,
// } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";
// import { useTheme } from "../../contexts/ThemeContext";
// import { getAvatarUrl } from "../../utils/getAvatarUrl";

// export default function Topbar() {
//   const { user, logout } = useAuth();
//   const { isDark, setIsDark } = useTheme();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const { pathname } = useLocation();

//   // use the first name as a greeting
//   const firstName = user?.name?.split(" ")[0] || "Admin";
//   const avatarUrl = getAvatarUrl(user?.avatar);

//   // Are we on /admin/... ?
//   const isAdmin = pathname.startsWith("/admin");

//   // Build the correct paths
//  const profilePath        = isAdmin ? '/admin/profile'         : '/dashboard/profile';
// const changePasswordPath = isAdmin ? '/admin/change-password' : '/dashboard/change-password';


//   // close dropdown if you click outside
//   useEffect(() => {
//     const handleOutside = (e) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   return (
//     <header className="h-16 px-6 flex items-center justify-between border-b bg-white dark:bg-gray-800 dark:border-gray-700">
//       {/* Greeting */}
//       <div className="text-lg font-medium text-gray-800 dark:text-gray-100 truncate">
//         Welcome, {firstName}
//       </div>

//       {/* Actions */}
//       <div className="flex items-center space-x-4">
//         {/* Notifications */}
//         <button className="text-gray-600 dark:text-gray-300 text-xl">
//           <FaBell />
//         </button>

//         {/* Dark mode toggle */}
//         <button
//           onClick={() => setIsDark((d) => !d)}
//           className="text-gray-600 dark:text-gray-300 text-xl"
//           aria-label="Toggle Dark Mode"
//         >
//           {isDark ? <FaSun /> : <FaMoon />}
//         </button>

//         {/* Avatar + Dropdown */}
//         <div className="relative" ref={dropdownRef}>
//           <img
//             src={avatarUrl}
//             alt="Your avatar"
//             onClick={() => setOpen((o) => !o)}
//             className="w-8 h-8 rounded-full border-2 border-indigo-500 cursor-pointer object-cover"
//           />

//           {open && (
//             <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
//               {/* Greeting */}
//               <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
//                 Hi, {firstName}
//               </div>
//               <div className="border-t border-gray-100 dark:border-gray-700" />

//               {/* Profile */}
//               <Link
//                 to={profilePath}
//                 className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <FaUserCircle className="mr-2" /> Profile
//               </Link>

//               {/* Change Password */}
//               <Link
//                 to={changePasswordPath}
//                 className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <FaKey className="mr-2" /> Change Password
//               </Link>

//               <div className="border-t border-gray-100 dark:border-gray-700" />

//               {/* Dark Mode (duplicate entry inside dropdown is optional) */}
//               <button
//                 onClick={() => setIsDark((d) => !d)}
//                 className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <span>Dark Mode</span>
//                 <span>{isDark ? "🌞" : "🌙"}</span>
//               </button>

//               <div className="border-t border-gray-100 dark:border-gray-700" />

//               {/* Logout */}
//               <button
//                 onClick={logout}
//                 className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <FaSignOutAlt className="mr-2" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }




// src/components/admin/Topbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaUserCircle,
  FaKey,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  const firstName = user?.name?.split(" ")[0] || "Admin";
  const avatarUrl = getAvatarUrl(user?.avatar);

  const isAdmin = pathname.startsWith("/admin");
  const profilePath        = isAdmin ? "/admin/profile"         : "/dashboard/profile";
  const changePasswordPath = isAdmin ? "/admin/change-password" : "/dashboard/change-password";

  // close dropdown if click outside
  useEffect(() => {
    const handle = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm relative z-10">
      {/* Greeting */}
      <div className="text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 truncate select-none">
        Welcome, {firstName}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification Bell */}
        <button className="relative group rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <FaBell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-gray-900"></span>
          <span className="absolute left-8 top-0 scale-0 group-hover:scale-100 transition bg-gray-900 text-white rounded px-2 py-1 text-xs whitespace-nowrap z-20">
            Notifications
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDark((v) => !v)}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>

        {/* Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 w-10 h-10 focus:outline-none hover:ring-2 hover:ring-indigo-500"
            aria-label="User menu"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 z-40 ring-1 ring-gray-200 dark:ring-gray-800 animate-fade-in-up">
              <div className="px-4 py-2 text-gray-700 dark:text-gray-200 font-semibold">
                Hi, {firstName}
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <Link
                to={profilePath}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                <FaUserCircle className="w-4 h-4 mr-2" /> Profile
              </Link>
              <Link
                to={changePasswordPath}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                <FaKey className="w-4 h-4 mr-2" /> Change Password
              </Link>
              <button
                className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => { setIsDark((v) => !v); setOpen(false); }}
              >
                {isDark ? (
                  <FaSun className="w-4 h-4 mr-2" />
                ) : (
                  <FaMoon className="w-4 h-4 mr-2" />
                )}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={logout}
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

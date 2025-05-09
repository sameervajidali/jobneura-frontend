// // src/components/admin/Topbar.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { FaBell, FaSun, FaMoon, FaSignOutAlt, FaUserCircle, FaKey } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";
// import { useTheme } from "../../contexts/ThemeContext";
// import { getAvatarUrl } from "../../utils/getAvatarUrl";

// export default function Topbar() {
//   const { user, logout } = useAuth();
//   const { isDark, setIsDark } = useTheme();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();

//   const avatarUrl = getAvatarUrl(user?.avatar);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//       <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//         Welcome, {user?.name?.split(" ")[0] || "Admin"}
//       </div>

//       <div className="flex items-center gap-4">
//         <FaBell className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer" />

//         <button onClick={() => setIsDark(!isDark)} className="text-xl text-gray-600 dark:text-gray-300">
//           {isDark ? <FaSun /> : <FaMoon />}
//         </button>

//         <div className="relative" ref={dropdownRef}>
//           <img
//             src={avatarUrl}
//             alt="avatar"
//             onClick={() => setOpen(!open)}
//             className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-indigo-500"
//           />
//           {open && (
//             <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
//               <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
//                 Hi, {user?.name?.split(" ")[0]}
//               </div>
//               <hr className="my-1 border-gray-200 dark:border-gray-600" />

//               <button
//                 onClick={() => setIsDark(d => !d)}
//                 className="flex items-center justify-between px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <span>Dark Mode</span>
//                 <span>{isDark ? "🌞" : "🌙"}</span>
//               </button>

//               <button
//                 onClick={logout}
//                 className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <FaSignOutAlt className="mr-2" />
//                 Logout
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
import {
  FaBell,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaUserCircle,
  FaKey,
  FaUserShield,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const avatarUrl = getAvatarUrl(user?.avatar);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
        Welcome, {user?.name?.split(" ")[0] || "Admin"}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <FaBell className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer" />

        <button
          onClick={() => setIsDark(!isDark)}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <img
            src={avatarUrl}
            alt="avatar"
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-indigo-500"
          />
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                Hi, {user?.name?.split(" ")[0]}
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />

              <Link
                to="/admin/profile"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>

              <Link
                to="/admin/change-password"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaKey className="mr-2" /> Change Password
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUserShield className="mr-2" /> Manage Users
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaCog className="mr-2" /> Admin Settings
              </Link>

              <button
                onClick={() => setIsDark(d => !d)}
                className="flex items-center justify-between px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>Dark Mode</span>
                <span>{isDark ? "🌞" : "🌙"}</span>
              </button>

              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

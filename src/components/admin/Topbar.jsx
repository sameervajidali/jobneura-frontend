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

  // use the first name as a greeting
  const firstName = user?.name?.split(" ")[0] || "Admin";
  const avatarUrl = getAvatarUrl(user?.avatar);

  // Are we on /admin/... ?
  const isAdmin = pathname.startsWith("/admin");

  // Build the correct paths
 const profilePath        = isAdmin ? '/admin/profile'         : '/dashboard/profile';
const changePasswordPath = isAdmin ? '/admin/change-password' : '/dashboard/change-password';


  // close dropdown if you click outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* Greeting */}
      <div className="text-lg font-medium text-gray-800 dark:text-gray-100 truncate">
        Welcome, {firstName}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="text-gray-600 dark:text-gray-300 text-xl">
          <FaBell />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark((d) => !d)}
          className="text-gray-600 dark:text-gray-300 text-xl"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={avatarUrl}
            alt="Your avatar"
            onClick={() => setOpen((o) => !o)}
            className="w-8 h-8 rounded-full border-2 border-indigo-500 cursor-pointer object-cover"
          />

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
              {/* Greeting */}
              <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                Hi, {firstName}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Profile */}
              <Link
                to={profilePath}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>

              {/* Change Password */}
              <Link
                to={changePasswordPath}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaKey className="mr-2" /> Change Password
              </Link>

              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Dark Mode (duplicate entry inside dropdown is optional) */}
              <button
                onClick={() => setIsDark((d) => !d)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>Dark Mode</span>
                <span>{isDark ? "🌞" : "🌙"}</span>
              </button>

              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Logout */}
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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



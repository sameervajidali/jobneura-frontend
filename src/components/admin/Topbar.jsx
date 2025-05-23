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
import { useNotifications } from "../../contexts/NotificationContext";
import NotificationBell from "../common/NotificationBell";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
   const notifRef    = useRef(null);
  const { pathname } = useLocation();


  const firstName = user?.name?.split(" ")[0] || "Admin";
  const avatarUrl = getAvatarUrl(user?.avatar);

  const isAdmin = pathname.startsWith("/admin");
  const profilePath        = isAdmin ? "/admin/profile"         : "/dashboard/profile";
  const changePasswordPath = isAdmin ? "/admin/change-password" : "/dashboard/change-password";

  // close dropdown if click outside
  useEffect(() => {
  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
    if (notifRef.current && !notifRef.current.contains(e.target)) {
      setNotifOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <NotificationBell notifOpen={notifOpen} setNotifOpen={setNotifOpen} />


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

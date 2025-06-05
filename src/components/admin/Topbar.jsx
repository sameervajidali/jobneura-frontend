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
  const notifRef = useRef(null);
  const { pathname } = useLocation();
  const { notifications, markRead } = useNotifications();

  const firstName = user?.name?.split(" ")[0] || "Admin";
  const avatarUrl = getAvatarUrl(user?.avatar);

  const isAdmin = pathname.startsWith("/admin");
  const profilePath = isAdmin ? "/admin/profile" : "/dashboard/profile";
  const changePasswordPath = isAdmin
    ? "/admin/change-password"
    : "/dashboard/change-password";

  // Close dropdowns if click happens outside them (for accessibility)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="h-16 px-6 flex items-center justify-between border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm relative z-10"
      role="banner"
    >
      {/* Greeting */}
      <div
        className="text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 truncate select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        Welcome, {firstName}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification Bell */}
        <div ref={notifRef}>
          <NotificationBell notifOpen={notifOpen} setNotifOpen={setNotifOpen} />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDark((v) => !v)}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          type="button"
        >
          {isDark ? (
            <FaSun className="w-5 h-5" aria-hidden="true" />
          ) : (
            <FaMoon className="w-5 h-5" aria-hidden="true" />
          )}
        </button>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:ring-indigo-400"
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={open}
            type="button"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${firstName}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <FaUserCircle
                className="w-7 h-7 text-gray-600 dark:text-gray-300"
                aria-hidden="true"
              />
            )}
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 z-40 ring-1 ring-gray-200 dark:ring-gray-800 animate-fade-in-up"
              role="menu"
              aria-orientation="vertical"
              tabIndex={-1}
              aria-label="User menu dropdown"
            >
              <div className="px-4 py-2 text-gray-700 dark:text-gray-200 font-semibold">
                Hi, {firstName}
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <Link
                to={profilePath}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <FaUserCircle className="w-4 h-4 mr-2" aria-hidden="true" /> Profile
              </Link>
              <Link
                to={changePasswordPath}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <FaKey className="w-4 h-4 mr-2" aria-hidden="true" /> Change Password
              </Link>
              <button
                className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
                onClick={() => {
                  setIsDark((v) => !v);
                  setOpen(false);
                }}
                role="menuitem"
                type="button"
              >
                {isDark ? (
                  <FaSun className="w-4 h-4 mr-2" aria-hidden="true" />
                ) : (
                  <FaMoon className="w-4 h-4 mr-2" aria-hidden="true" />
                )}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
                onClick={logout}
                role="menuitem"
                type="button"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" aria-hidden="true" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

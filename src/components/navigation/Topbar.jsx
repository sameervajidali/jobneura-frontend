// src/components/navigation/Topbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Bell, CircleUserRound, LogOut, Moon, Sun, User, KeyRound } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

export function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const avatarUrl = getAvatarUrl(user?.avatar);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white/80 dark:bg-gray-900 shadow-sm px-4 md:px-6 py-2 md:py-4 border-b sticky top-0 z-30">
      {/* Responsive Title */}
      <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-100 truncate">
        Dashboard
      </h1>
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification Bell */}
        <button className="relative group hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition">
          <Bell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
          {/* Tooltip on hover */}
          <span className="absolute left-8 top-0 scale-0 group-hover:scale-100 transition bg-gray-900 text-white rounded px-2 py-1 text-xs whitespace-nowrap">
            Notifications
          </span>
        </button>
        {/* Dark Mode Toggle */}
        <button
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setIsDark((v) => !v)}
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {/* User Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 w-9 h-9 focus:outline-none hover:ring-2 hover:ring-indigo-500"
            aria-label="User menu"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <CircleUserRound className="w-7 h-7 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl py-2 z-40 animate-fade-in-up ring-1 ring-gray-200 dark:ring-gray-800">
              <div className="px-4 py-2 text-gray-700 dark:text-gray-200 font-semibold">
                Hi, {user?.name?.split(" ")[0]}
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <Link
                to="/dashboard/profile"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="w-4 h-4 mr-2" /> Profile
              </Link>
              <Link
                to="/dashboard/change-password"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setDropdownOpen(false)}
              >
                <KeyRound className="w-4 h-4 mr-2" /> Change Password
              </Link>
              <button
                className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  setIsDark((v) => !v);
                  setDropdownOpen(false);
                }}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

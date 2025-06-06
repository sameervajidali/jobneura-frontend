// src/components/navigation/Topbar.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Bell, CircleUserRound, LogOut, Moon, Sun, User, KeyRound, Menu,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

export function Topbar({ onOpenSidebar }) {
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarUrl = getAvatarUrl(user?.avatar);

  // Click outside to close dropdown
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
    <header
      className="h-16 flex items-center justify-between bg-background shadow-sm px-4 md:px-6 border-b border-border"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
        onClick={onOpenSidebar}
        aria-label="Open Sidebar"
      >
        <Menu className="w-6 h-6 text-indigo-700 dark:text-indigo-400" />
      </button>

      {/* Dashboard Title */}
      <h1 className="text-lg md:text-xl font-bold tracking-tight text-foreground truncate ml-2 md:ml-0">
        Dashboard
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {/* Notification Bell */}
        <button className="relative group hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full p-2 transition focus:outline-none">
          <Bell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
          <span className="absolute left-8 top-0 scale-0 group-hover:scale-100 transition bg-gray-900 text-white rounded px-2 py-1 text-xs whitespace-nowrap z-40">
            Notifications
          </span>
        </button>
        {/* Dark Mode Toggle */}
        <button
          className="rounded-full p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition focus:outline-none"
          onClick={() => setIsDark((v) => !v)}
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {/* Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center justify-center rounded-full bg-muted dark:bg-muted w-9 h-9 focus:outline-none hover:ring-2 hover:ring-indigo-500"
            aria-label="User menu"
            tabIndex={0}
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
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-background rounded-xl shadow-2xl py-2 z-40 animate-fade-in-up ring-1 ring-border border border-border">
              <div className="px-4 py-2 text-foreground font-semibold">
                Hi, {user?.name?.split(" ")[0]}
              </div>
              <hr className="my-1 border-border" />
              <Link
                to="/dashboard/profile"
                className="flex items-center px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800 text-foreground"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="w-4 h-4 mr-2" /> Profile
              </Link>
              <Link
                to="/dashboard/change-password"
                className="flex items-center px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800 text-foreground"
                onClick={() => setDropdownOpen(false)}
              >
                <KeyRound className="w-4 h-4 mr-2" /> Change Password
              </Link>
              <button
                className="flex items-center px-4 py-2 text-sm w-full hover:bg-indigo-50 dark:hover:bg-gray-800 text-foreground"
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
                className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-indigo-50 dark:hover:bg-gray-800"
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

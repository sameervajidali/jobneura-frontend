// src/components/admin/Topbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Welcome, {user?.name?.split(" ")[0] || "Admin"}
      </div>

      <div className="flex items-center gap-4">
        <FaBell className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer" />

        <button onClick={() => setIsDark(!isDark)} className="text-xl text-gray-600 dark:text-gray-300">
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="avatar"
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-indigo-500"
          />
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{user?.email}</div>
              <hr className="border-gray-200 dark:border-gray-600" />
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

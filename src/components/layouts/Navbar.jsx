// src/components/ui/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaBriefcase, FaBook, FaPenNib, FaRocket,
  FaGraduationCap, FaKey, FaBell, FaUserCircle, FaSignOutAlt, FaTachometerAlt
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();

  // build the avatar URL
  let avatarUrl = user?.avatar || user?.picture || "";
  if (avatarUrl.startsWith("/uploads")) {
    // strip trailing /api if needed:
    const origin = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "");
    avatarUrl = origin + avatarUrl;
  }
  avatarUrl = avatarUrl || "/default-avatar.png";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  // click-outside to close
  useEffect(() => {
    function onClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const doLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    logout();
    navigate("/login");
  };

  const navLinks = (
    <>
      <Link to="/" className="flex items-center gap-1 hover:text-indigo-600"><FaHome /> Home</Link>
      <Link to="/tutorials" className="flex items-center gap-1 hover:text-indigo-600"><FaGraduationCap /> Tutorials</Link>
      <Link to="/jobs" className="flex items-center gap-1 hover:text-indigo-600"><FaBriefcase /> Jobs</Link>
      <Link to="/quizzes" className="flex items-center gap-1 hover:text-indigo-600"><FaBook /> Quizzes</Link>
      <Link to="/blogs" className="flex items-center gap-1 hover:text-indigo-600"><FaPenNib /> Blogs</Link>
    </>
  );

  return (
    <header className="w-full fixed top-0 z-50 bg-white/70 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <nav className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 text-lg font-bold">
          <FaRocket className="text-xl" /> JobNeura
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-100 font-medium">
          {navLinks}

          {user ? (
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              <FaBell className="text-xl cursor-pointer hover:text-indigo-600" />
              <button onClick={() => setDropdownOpen(o => !o)}>
                <img
                  src={encodeURI(avatarUrl)}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-50">
                  <div className="px-4 py-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Hi, {user.name.split(" ")[0]}
                    </p>
                  </div>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />

                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaTachometerAlt /><span className="ml-2">Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaUserCircle /><span className="ml-2">Profile</span>
                  </Link>
                  <Link
                    to="/dashboard/change-password"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaKey /><span className="ml-2">Change Password</span>
                  </Link>

                  {/* DARK MODE toggle */}
                  <button
                    onClick={() => setIsDark(d => !d)}
                    className="flex items-center justify-between px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span>Dark Mode</span>
                    <span>{isDark ? "🌞" : "🌙"}</span>
                  </button>

                  <button
                    onClick={doLogout}
                    className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaSignOutAlt /><span className="ml-2">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              <FaRocket className="inline mr-1" /> Get Started
            </Link>
          )}
        </div>

        {/* mobile toggle */}
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-100"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* mobile menu */}
      {menuOpen && user && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {/* avatar + name/email */}
          <div className="flex items-center px-4 py-3">
            <img
              src={encodeURI(avatarUrl)}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 mr-3"
            />
            <div>
              <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                {user.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-4 pb-4 text-gray-700 dark:text-gray-100">
            {navLinks}
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/dashboard/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/dashboard/change-password" onClick={() => setMenuOpen(false)}>Change Password</Link>

            <button
              onClick={() => { setIsDark(d => !d); setMenuOpen(false); }}
              className="flex items-center justify-between py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>Dark Mode</span><span>{isDark ? "🌞" : "🌙"}</span>
            </button>

            <button
              onClick={doLogout}
              className="mt-2 text-left text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

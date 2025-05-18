
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaBriefcase, FaBook, FaPenNib, FaRocket,
  FaGraduationCap, FaKey, FaBell, FaUserCircle, FaSignOutAlt, FaTachometerAlt
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const avatarUrl = getAvatarUrl(user?.avatar || user?.picture);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
      <Link to="/" className="flex items-center gap-1 hover:text-indigo-500 transition">
        <FaHome /> Home
      </Link>
      <Link to="/tutorials" className="flex items-center gap-1 hover:text-indigo-500 transition">
        <FaGraduationCap /> Tutorials
      </Link>
      <Link to="/jobs" className="flex items-center gap-1 hover:text-indigo-500 transition">
        <FaBriefcase /> Jobs
      </Link>
      <Link to="/quizzes" className="flex items-center gap-1 hover:text-indigo-500 transition">
        <FaBook /> Quizzes
      </Link>
      <Link to="/blogs" className="flex items-center gap-1 hover:text-indigo-500 transition">
        <FaPenNib /> Blogs
      </Link>
    </>
  );

  const showDashboardBtn = user && !location.pathname.startsWith("/dashboard");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <nav
        className="
          h-16 flex items-center px-4 sm:px-8 w-full justify-between
          bg-white/70 dark:bg-gray-900/70
          shadow-lg
          backdrop-blur-[12px] border-b border-gray-200 dark:border-gray-800
          rounded-b-2xl
          transition-all
        "
        style={{ boxShadow: "0 4px 32px 0 rgba(80,80,160,0.06)" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xl font-extrabold whitespace-nowrap drop-shadow"
        >
          <FaRocket className="text-2xl" /> JobNeura
        </Link>

        {/* Center Links - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-base font-medium text-gray-700 dark:text-gray-100">
          {navLinks}
        </div>

        {/* Right (CTA, Avatar, etc) */}
        <div className="flex items-center gap-3">
          {showDashboardBtn && (
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden md:flex px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              <FaTachometerAlt className="inline mr-2" /> Dashboard
            </button>
          )}
          {user ? (
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
              <button
                className="relative p-2 hover:bg-indigo-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Notifications"
                title="Notifications"
              >
                <FaBell className="text-xl text-gray-500 dark:text-gray-300" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-700 w-10 h-10 border-2 border-indigo-400 shadow focus:outline-none"
                aria-label="User menu"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-500 dark:text-gray-200" />
                )}
              </button>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-64 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl py-2 z-50 ring-1 ring-gray-200 dark:ring-gray-800 animate-fade-in-up backdrop-blur">
                  <div className="px-4 py-2 text-base font-semibold text-gray-700 dark:text-gray-100">
                    Hi, {user.name.split(" ")[0]}
                  </div>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-base hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaTachometerAlt className="mr-2" /> My Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-base hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUserCircle className="mr-2" /> Profile
                  </Link>
                  <Link
                    to="/dashboard/change-password"
                    className="flex items-center px-4 py-2 text-base hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaKey className="mr-2" /> Change Password
                  </Link>
                  <button
                    onClick={() => {
                      setIsDark((d) => !d);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-2 text-base w-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                  >
                    <span className="flex items-center">
                      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </span>
                  </button>
                  <button
                    onClick={doLogout}
                    className="flex items-center px-4 py-2 text-base text-red-600 w-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-xl hover:from-indigo-600 hover:to-purple-600 transition text-base drop-shadow-lg"
              style={{
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 24px 0 rgba(100,60,200,0.13)"
              }}
            >
              <FaRocket className="inline mr-2" /> Get Started
            </Link>
          )}
          {/* Hamburger */}
          <button
            className="lg:hidden text-3xl text-gray-700 dark:text-gray-100 focus:outline-none ml-2"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden">
          <aside className="absolute top-0 left-0 w-64 h-full bg-white/90 dark:bg-gray-900/90 shadow-2xl p-6 flex flex-col gap-5 animate-slide-in-left rounded-tr-2xl">
            <div className="flex items-center justify-between mb-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xl font-extrabold"
                onClick={() => setMenuOpen(false)}
              >
                <FaRocket className="text-2xl" /> JobNeura
              </Link>
              <button
                className="text-2xl text-gray-600 dark:text-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col gap-3 text-base text-gray-700 dark:text-gray-100 font-medium">
              {navLinks}
              {user && (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                    <FaTachometerAlt className="inline mr-2" /> Dashboard
                  </Link>
                  <Link to="/dashboard/profile" onClick={() => setMenuOpen(false)}>
                    <FaUserCircle className="inline mr-2" /> Profile
                  </Link>
                  <Link to="/dashboard/change-password" onClick={() => setMenuOpen(false)}>
                    <FaKey className="inline mr-2" /> Change Password
                  </Link>
                  <button
                    onClick={() => { setIsDark(d => !d); setMenuOpen(false); }}
                    className="flex items-center gap-2 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
                  </button>
                  <button
                    onClick={doLogout}
                    className="text-left text-red-600 hover:underline py-2"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </>
              )}
              {!user && (
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition text-center mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaRocket className="inline mr-2" /> Get Started
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}


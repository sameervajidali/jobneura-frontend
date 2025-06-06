// src/components/admin/Navbar.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaBriefcase, FaBook, FaPenNib, FaRocket,
  FaGraduationCap, FaKey, FaBell, FaUserCircle, FaSignOutAlt, FaTachometerAlt
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { getAvatarUrl } from "../../utils/getAvatarUrl";
import NotificationBell from "../common/NotificationBell";

/** SEO: Import Helmet for meta tags (add this in your root layout ideally) */
import { Helmet } from "react-helmet-async";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();

  // Dropdown states and refs
  const [notifOpen, setNotifOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const avatarUrl = getAvatarUrl(user?.avatar || user?.picture);

  // Improved: Close dropdowns on route change (avoids stuck open menus)
  useEffect(() => {
    setDropdownOpen(false);
    setNotifOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns if click outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const doLogout = useCallback(async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    logout();
    navigate("/login");
  }, [logout, navigate]);

  // Nav links as array for DRY code
  const links = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/tutorials", icon: <FaGraduationCap />, label: "Tutorials" },
    { to: "/jobs", icon: <FaBriefcase />, label: "Jobs" },
    { to: "/quizzes", icon: <FaBook />, label: "Quizzes" },
    { to: "/blogs", icon: <FaPenNib />, label: "Blogs" },
  ];
  const navLinks = links.map(link => (
    <Link
      key={link.to}
      to={link.to}
      className="flex items-center gap-1 hover:text-indigo-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
      tabIndex={0}
    >
      {link.icon} {link.label}
    </Link>
  ));

  const showDashboardBtn = user && !location.pathname.startsWith("/dashboard");

  // SEO meta tags (Helmet is safe, but meta should go in layout/root ideally)
  // Keep this as a pattern reference for full SPA SEO setup
  // In Navbar, we can at least do structured nav and accessibility
  return (
    <>
      <Helmet>
        <title>JobNeura – Dashboard</title>
        <meta name="description" content="JobNeura admin dashboard and navigation." />
        <link rel="canonical" href="https://jobneura.tech/dashboard" />
        {/* Open Graph */}
        <meta property="og:title" content="JobNeura" />
        <meta property="og:description" content="Your AI-powered career dashboard and job portal." />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:title" content="JobNeura" />
        <meta name="twitter:description" content="Your AI-powered career dashboard and job portal." />
      </Helmet>
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <nav
          aria-label="Main Navigation"
          className="
            h-16 flex items-center px-4 sm:px-8 w-full justify-between
            bg-white/80 dark:bg-gray-900/80
            shadow-lg
            backdrop-blur-[12px] border-b border-gray-200 dark:border-gray-800
            rounded-b-2xl
            transition-all
          "
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="JobNeura Home"
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xl font-extrabold whitespace-nowrap drop-shadow focus:outline-none"
          >
            <FaRocket className="text-2xl" /> JobNeura
          </Link>

          {/* Center Nav Links – Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-base font-medium text-gray-700 dark:text-gray-100" aria-label="Site sections">
            {navLinks}
          </nav>

          {/* Right: Bell, Dashboard, Avatar or CTA */}
          <div className="flex items-center gap-3">
            {showDashboardBtn && (
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden md:flex px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Go to Dashboard"
              >
                <FaTachometerAlt className="inline mr-2" /> Dashboard
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2 relative">
                {/* Notification Bell */}
                <div ref={notifRef}>
                  <NotificationBell notifOpen={notifOpen} setNotifOpen={setNotifOpen} />
                </div>
                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-700 w-10 h-10 border-2 border-indigo-400 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    aria-label="Open user menu"
                    tabIndex={0}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="User avatar"
                        className="w-9 h-9 rounded-full object-cover"
                        loading="lazy"
                        width={36}
                        height={36}
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-500 dark:text-gray-200" />
                    )}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-14 w-64 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl py-2 z-50 ring-1 ring-gray-200 dark:ring-gray-800 animate-fade-in-up backdrop-blur"
                      role="menu"
                      aria-label="User menu"
                    >
                      <div className="px-4 py-2 text-base font-semibold text-gray-700 dark:text-gray-100">
                        Hi, {user.name?.split(" ")[0]}
                      </div>
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-base hover:bg-indigo-50 dark:hover:bg-gray-800 transition focus:outline-none"
                        onClick={() => setDropdownOpen(false)}
                        tabIndex={0}
                      >
                        <FaTachometerAlt className="mr-2" /> My Dashboard
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-base hover:bg-indigo-50 dark:hover:bg-gray-800 transition focus:outline-none"
                        onClick={() => setDropdownOpen(false)}
                        tabIndex={0}
                      >
                        <FaUserCircle className="mr-2" /> Profile
                      </Link>
                      <Link
                        to="/dashboard/change-password"
                        className="flex items-center px-4 py-2 text-base hover:bg-indigo-50 dark:hover:bg-gray-800 transition focus:outline-none"
                        onClick={() => setDropdownOpen(false)}
                        tabIndex={0}
                      >
                        <FaKey className="mr-2" /> Change Password
                      </Link>
                      <button
                        onClick={() => { setIsDark(d => !d); setDropdownOpen(false); }}
                        className="flex items-center justify-between px-4 py-2 text-base w-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition focus:outline-none"
                        tabIndex={0}
                      >
                        <span>{isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}</span>
                      </button>
                      <button
                        onClick={doLogout}
                        className="flex items-center px-4 py-2 text-base text-red-600 w-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition focus:outline-none"
                        tabIndex={0}
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-xl hover:from-indigo-600 hover:to-purple-600 transition text-base drop-shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Get Started"
                style={{
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 4px 24px 0 rgba(100,60,200,0.13)",
                }}
              >
                <FaRocket className="inline mr-2" /> Get Started
              </Link>
            )}

            {/* Hamburger */}
            <button
              className="lg:hidden text-3xl text-gray-700 dark:text-gray-100 focus:outline-none ml-2 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              tabIndex={0}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden">
            <aside
              className="absolute top-0 left-0 w-64 h-full bg-white/90 dark:bg-gray-900/90 shadow-2xl p-6 flex flex-col gap-5 animate-slide-in-left rounded-tr-2xl"
              role="menu"
              aria-label="Mobile Menu"
              tabIndex={0}
            >
              <div className="flex items-center justify-between mb-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xl font-extrabold focus:outline-none"
                  onClick={() => setMenuOpen(false)}
                  aria-label="JobNeura Home"
                >
                  <FaRocket className="text-2xl" /> JobNeura
                </Link>
                <button
                  className="text-2xl text-gray-600 dark:text-gray-100 focus:outline-none"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="flex flex-col gap-3 text-base text-gray-700 dark:text-gray-100 font-medium" aria-label="Mobile Nav">
                {navLinks}
                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none"
                      onClick={() => setMenuOpen(false)}
                      tabIndex={0}
                    >
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none"
                      onClick={() => setMenuOpen(false)}
                      tabIndex={0}
                    >
                      <FaUserCircle className="mr-2" /> Profile
                    </Link>
                    <Link
                      to="/dashboard/change-password"
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none"
                      onClick={() => setMenuOpen(false)}
                      tabIndex={0}
                    >
                      <FaKey className="mr-2" /> Change Password
                    </Link>
                    <button
                      onClick={() => { setIsDark(d => !d); setMenuOpen(false); }}
                      className="flex items-center px-3 py-2 rounded-lg w-full hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none"
                      tabIndex={0}
                    >
                      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                    <button
                      onClick={doLogout}
                      className="flex items-center px-3 py-2 rounded-lg text-red-600 w-full hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none"
                      tabIndex={0}
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </>
                )}
              </nav>
            </aside>
          </div>
        )}
      </header>
    </>
  );
}

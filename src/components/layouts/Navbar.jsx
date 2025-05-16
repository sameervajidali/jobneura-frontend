// // src/components/ui/Navbar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBars, FaTimes, FaHome, FaBriefcase, FaBook, FaPenNib, FaRocket,
//   FaGraduationCap, FaKey, FaBell, FaUserCircle, FaSignOutAlt, FaTachometerAlt
// } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";
// import { useTheme } from "../../contexts/ThemeContext";
// import { getAvatarUrl } from "../../utils/getAvatarUrl";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const { isDark, setIsDark } = useTheme();

//   // Build the avatar URL
//   const avatarUrl = getAvatarUrl(user?.avatar || user?.picture);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef();

//   // Click-outside to close dropdown
//   useEffect(() => {
//     function onClick(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   const doLogout = async () => {
//     try {
//       await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch {}
//     logout();
//     navigate("/login");
//   };

//   const navLinks = (
//     <>
//       <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
//         <FaHome /> Home
//       </Link>
//       <Link to="/tutorials" className="flex items-center gap-1 hover:text-indigo-600">
//         <FaGraduationCap /> Tutorials
//       </Link>
//       <Link to="/jobs" className="flex items-center gap-1 hover:text-indigo-600">
//         <FaBriefcase /> Jobs
//       </Link>
//       <Link to="/quizzes" className="flex items-center gap-1 hover:text-indigo-600">
//         <FaBook /> Quizzes
//       </Link>
//       <Link to="/blogs" className="flex items-center gap-1 hover:text-indigo-600">
//         <FaPenNib /> Blogs
//       </Link>
//     </>
//   );

//   return (
//     <header className="w-full fixed top-0 z-50 bg-white/70 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
//       <nav className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 text-indigo-600 text-lg font-bold">
//           <FaRocket className="text-xl" /> JobNeura
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-100 font-medium">
//           {navLinks}

//           {user ? (
//             <div className="flex items-center gap-4 relative" ref={dropdownRef}>
//               <FaBell className="text-xl cursor-pointer hover:text-indigo-600" />
//               <button onClick={() => setDropdownOpen(o => !o)}>
//                 <img
//                   src={avatarUrl}
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-50">
//                   <div className="px-4 py-2">
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       Hi, {user.name.split(" ")[0]}
//                     </p>
//                   </div>
//                   <hr className="my-1 border-gray-200 dark:border-gray-700" />

//                   <Link
//                     to="/dashboard"
//                     className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <FaTachometerAlt /><span className="ml-2">Dashboard</span>
//                   </Link>
//                   <Link
//                     to="/dashboard/profile"
//                     className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <FaUserCircle /><span className="ml-2">Profile</span>
//                   </Link>
//                   <Link
//                     to="/dashboard/change-password"
//                     className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <FaKey /><span className="ml-2">Change Password</span>
//                   </Link>

//                   {/* DARK MODE toggle */}
//                   <button
//                     onClick={() => setIsDark(d => !d)}
//                     className="flex items-center justify-between px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <span>Dark Mode</span>
//                     <span>{isDark ? "🌞" : "🌙"}</span>
//                   </button>

//                   <button
//                     onClick={doLogout}
//                     className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <FaSignOutAlt /><span className="ml-2">Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               to="/register"
//               className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
//             >
//               <FaRocket className="inline mr-1" /> Get Started
//             </Link>
//           )}
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           className="md:hidden text-2xl text-gray-700 dark:text-gray-100"
//           onClick={() => setMenuOpen(o => !o)}
//         >
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {menuOpen && user && (
//         <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//           {/* Avatar + Name/Email */}
//           <div className="flex items-center px-4 py-3">
//             <img
//               src={encodeURI(avatarUrl)}
//               alt="avatar"
//               className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 mr-3"
//             />
//             <div>
//               <p className="text-base font-medium text-gray-800 dark:text-gray-200">
//                 {user.name}
//               </p>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {user.email}
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-1 px-4 pb-4 text-gray-700 dark:text-gray-100">
//             {navLinks}
//             <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
//             <Link to="/dashboard/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
//             <Link to="/dashboard/change-password" onClick={() => setMenuOpen(false)}>Change Password</Link>

//             <button
//               onClick={() => { setIsDark(d => !d); setMenuOpen(false); }}
//               className="flex items-center justify-between py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <span>Dark Mode</span><span>{isDark ? "🌞" : "🌙"}</span>
//             </button>

//             <button
//               onClick={doLogout}
//               className="mt-2 text-left text-red-600 hover:underline"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// src/components/ui/Navbar.jsx
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

  // Avatar URL (handle fallback too)
  const avatarUrl = getAvatarUrl(user?.avatar || user?.picture);

  // Close dropdown on outside click
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
      <Link to="/" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <FaHome /> Home
      </Link>
      <Link to="/tutorials" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <FaGraduationCap /> Tutorials
      </Link>
      <Link to="/jobs" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <FaBriefcase /> Jobs
      </Link>
      <Link to="/quizzes" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <FaBook /> Quizzes
      </Link>
      <Link to="/blogs" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <FaPenNib /> Blogs
      </Link>
    </>
  );

  // Show "My Dashboard" only if user is logged in and NOT already on dashboard
  const showDashboardBtn = user && !location.pathname.startsWith("/dashboard");

  return (
    <header className="w-full fixed top-0 z-50 bg-white/80 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <nav className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-lg font-extrabold">
          <FaRocket className="text-xl" /> JobNeura
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-100 font-medium">
          {navLinks}

          {showDashboardBtn && (
            <button
              onClick={() => navigate("/dashboard")}
              className="ml-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              <FaTachometerAlt className="inline mr-1" /> My Dashboard
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
              <button
                className="relative p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full"
                aria-label="Notifications"
                title="Notifications"
              >
                <FaBell className="text-xl text-gray-500 dark:text-gray-300" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 w-9 h-9 border-2 border-indigo-500 shadow focus:outline-none"
                aria-label="User menu"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-7 h-7 text-gray-500 dark:text-gray-200" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-60 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 z-50 ring-1 ring-gray-200 dark:ring-gray-800 animate-fade-in-up">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
                    Hi, {user.name.split(" ")[0]}
                  </div>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />

                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaTachometerAlt className="mr-2" /> My Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUserCircle className="mr-2" /> Profile
                  </Link>
                  <Link
                    to="/dashboard/change-password"
                    className="flex items-center px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaKey className="mr-2" /> Change Password
                  </Link>
                  <button
                    onClick={() => {
                      setIsDark(d => !d);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-2 text-sm w-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                  >
                    <span className="flex items-center">
                      {isDark ? <span>🌞 Light Mode</span> : <span>🌙 Dark Mode</span>}
                    </span>
                  </button>
                  <button
                    onClick={doLogout}
                    className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/register"
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 shadow transition"
            >
              <FaRocket className="inline mr-1" /> Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-100 focus:outline-none"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex flex-col gap-2 p-4 text-gray-700 dark:text-gray-100 font-medium">
            {navLinks}
            {user && (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  <FaTachometerAlt className="inline mr-1" /> My Dashboard
                </Link>
                <Link to="/dashboard/profile" onClick={() => setMenuOpen(false)}>
                  <FaUserCircle className="inline mr-1" /> Profile
                </Link>
                <Link to="/dashboard/change-password" onClick={() => setMenuOpen(false)}>
                  <FaKey className="inline mr-1" /> Change Password
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
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              </>
            )}
            {!user && (
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaRocket className="inline mr-1" /> Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// // components/ui/Navbar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBars, FaTimes, FaHome, FaBriefcase, FaBook, FaPenNib, FaRocket, FaGraduationCap, FaKey,
//   FaBell, FaUserCircle, FaSignOutAlt, FaTachometerAlt
// } from "react-icons/fa";
// import { useAuth } from "../../contexts/AuthContext";
// import { useTheme } from "../../contexts/ThemeContext";
// import API from "../../services/axios";

// function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const { isDark, setIsDark } = useTheme();
//   const avatarUrl = user?.avatar || user?.picture || "/default-avatar.png";

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await API.post("/auth/logout");
//     } catch (err) {
//       console.warn("Logout failed, clearing anyway.");
//     }
//     logout();
//     navigate("/login");
//   };

//   const closeMobileMenu = () => setMenuOpen(false);

//   const navLinks = (
//     <>
//       <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaHome /> Home</Link>
//       <Link to="/tutorials" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaGraduationCap /> Tutorials</Link>
//       <Link to="/jobs" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaBriefcase /> Jobs</Link>
//       <Link to="/quizzes" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaBook /> Quizzes</Link>
//       <Link to="/blogs" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaPenNib /> Blogs</Link>
//     </>
//   );

//   return (
//     <>
//       <header className="w-full fixed top-0 z-50 bg-white/70 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
//         <nav className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
//           <Link to="/" className="flex items-center gap-2 text-indigo-600 text-lg font-bold">
//             <FaRocket className="text-xl" />
//             <span>JobNeura</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-100 font-medium">
//             {navLinks}
//             {!user ? (
//               <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
//                 <FaRocket className="inline mr-1" /> Get Started
//               </Link>
//             ) : (
//               <div className="flex items-center gap-4 relative" ref={dropdownRef}>
//                 <FaBell className="text-xl cursor-pointer hover:text-indigo-600" />
//                 <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
//                   <img
//                     src={encodeURI(avatarUrl)}
//                     alt="avatar"
//                     className="w-8 h-8 rounded-full object-cover border border-indigo-500"
//                   />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-50">
//                     <p className="px-4 py-1 text-sm text-gray-600 dark:text-gray-300">Hi, {user.name?.split(" ")[0]}</p>
//                     <hr className="my-1 border-gray-200 dark:border-gray-700" />
//                     <Link to="/dashboard" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
//                       <FaTachometerAlt /> <span>Dashboard</span>
//                     </Link>
//                     <Link to="/dashboard/profile" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
//                       <FaUserCircle /> <span>Profile</span>
//                     </Link>
//                     <Link to="/dashboard/change-password" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
//                       <FaKey /> <span>Change Password</span>
//                     </Link>
//                     <div onClick={() => setIsDark(!isDark)} className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
//                       <span>Dark Mode</span>
//                       <span>{isDark ? "🌞" : "🌙"}</span>
//                     </div>
//                     {user?.role === "superadmin" && (
//                       <Link to="/admin" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
//                         <FaRocket /> <span>Admin Panel</span>
//                       </Link>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     >
//                       <FaSignOutAlt /> <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile Toggle */}
//           <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-gray-700 dark:text-gray-100">
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </nav>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden px-4 pb-4 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col gap-2 font-medium">
//               {navLinks}
//               {!user ? (
//                 <Link to="/register" onClick={closeMobileMenu} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-center hover:bg-indigo-700">
//                   <FaRocket className="inline mr-1" /> Get Started
//                 </Link>
//               ) : (
//                 <>
//                   <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
//                   <Link to="/dashboard/profile" onClick={closeMobileMenu}>Profile</Link>
//                   <Link to="/dashboard/change-password" onClick={closeMobileMenu}>Change Password</Link>
//                   <div onClick={() => { setIsDark(!isDark); closeMobileMenu(); }} className="cursor-pointer">
//                     Dark Mode {isDark ? "🌞" : "🌙"}
//                   </div>
//                   {user?.role === "superadmin" && <Link to="/admin" onClick={closeMobileMenu}>Admin Panel</Link>}
//                   <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </header>
//     </>
//   );
// }

// export default Navbar;


// components/ui/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaBriefcase, FaBook, FaPenNib, FaRocket, FaGraduationCap, FaKey,
  FaBell, FaUserCircle, FaSignOutAlt, FaTachometerAlt
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import API from "../../services/axios";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const avatarUrl = user?.avatar || user?.picture || "/default-avatar.png";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  // Check for admin/staff roles
  const isStaff = ["admin", "superadmin", "moderator", "creator", "support"].includes(user?.role);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.warn("Logout failed, clearing anyway.");
    }
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => setMenuOpen(false);

  if (isStaff) return null; // 🧹 Hide for staff-based roles

  const navLinks = (
    <>
      <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaHome /> Home</Link>
      <Link to="/tutorials" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaGraduationCap /> Tutorials</Link>
      <Link to="/jobs" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaBriefcase /> Jobs</Link>
      <Link to="/quizzes" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaBook /> Quizzes</Link>
      <Link to="/blogs" onClick={closeMobileMenu} className="flex items-center gap-1 hover:text-indigo-600"><FaPenNib /> Blogs</Link>
    </>
  );

  return (
    <>
      <header className="w-full fixed top-0 z-50 bg-white/70 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <nav className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 text-lg font-bold">
            <FaRocket className="text-xl" />
            <span>JobNeura</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-100 font-medium">
            {navLinks}
            {!user ? (
              <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                <FaRocket className="inline mr-1" /> Get Started
              </Link>
            ) : (
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                <FaBell className="text-xl cursor-pointer hover:text-indigo-600" />
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                  <img
                    src={encodeURI(avatarUrl)}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-indigo-500"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-50">
                    <p className="px-4 py-1 text-sm text-gray-600 dark:text-gray-300">Hi, {user.name?.split(" ")[0]}</p>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <Link to="/dashboard" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaTachometerAlt /> <span>Dashboard</span>
                    </Link>
                    <Link to="/dashboard/profile" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaUserCircle /> <span>Profile</span>
                    </Link>
                    <Link to="/dashboard/change-password" className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaKey /> <span>Change Password</span>
                    </Link>
                    <div onClick={() => setIsDark(!isDark)} className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span>Dark Mode</span>
                      <span>{isDark ? "🌞" : "🌙"}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaSignOutAlt /> <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-gray-700 dark:text-gray-100">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-2 font-medium">
              {navLinks}
              {!user ? (
                <Link to="/register" onClick={closeMobileMenu} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-center hover:bg-indigo-700">
                  <FaRocket className="inline mr-1" /> Get Started
                </Link>
              ) : (
                <>
                  <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
                  <Link to="/dashboard/profile" onClick={closeMobileMenu}>Profile</Link>
                  <Link to="/dashboard/change-password" onClick={closeMobileMenu}>Change Password</Link>
                  <div onClick={() => { setIsDark(!isDark); closeMobileMenu(); }} className="cursor-pointer">
                    Dark Mode {isDark ? "🌞" : "🌙"}
                  </div>
                  <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;

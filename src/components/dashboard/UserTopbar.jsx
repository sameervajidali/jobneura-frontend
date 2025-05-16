// src/components/dashboard/UserTopbar.jsx
import { useAuth } from '../../contexts/AuthContext';
import { FaBell, FaMoon, FaSun, FaUserCircle, FaSignOutAlt, FaKey } from "react-icons/fa";
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvatarUrl } from '../../utils/getAvatarUrl';

export default function UserTopbar({ onLogout }) {
  const { user } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const [open, setOpen] = useState(false);

  const avatarUrl = getAvatarUrl(user?.avatar);

  return (
    <header className="w-full h-16 px-6 flex items-center justify-end bg-white/80 dark:bg-gray-900 shadow-sm border-b">
      {/* Notification Bell */}
      <button className="relative mx-2 group">
        <FaBell className="text-xl" />
        {/* Example notification dot */}
        <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500"></span>
        {/* Tooltip for bell */}
        <span className="absolute left-8 top-1 scale-0 group-hover:scale-100 transition bg-gray-900 text-white rounded px-2 py-1 text-xs">Notifications</span>
      </button>
      
      {/* Dark Mode Toggle */}
      <button onClick={() => setIsDark(d => !d)} className="mx-2">
        {isDark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Avatar and Dropdown */}
      <div className="relative mx-2">
        <button onClick={() => setOpen(o => !o)} className="focus:outline-none flex items-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="w-9 h-9 rounded-full border-2 border-indigo-500 shadow" />
          ) : (
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.[0]?.toUpperCase() || <FaUserCircle />}
            </div>
          )}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-40 animate-fade-in-up">
            <div className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
              Hi, {user.name.split(' ')[0]}
            </div>
            <hr />
            <Link to="/dashboard/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaUserCircle className="mr-2" /> Profile
            </Link>
            <Link to="/dashboard/change-password" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaKey className="mr-2" /> Change Password
            </Link>
            <button
              onClick={() => setIsDark(d => !d)}
              className="flex items-center px-4 py-2 w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDark ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-sm text-red-600 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

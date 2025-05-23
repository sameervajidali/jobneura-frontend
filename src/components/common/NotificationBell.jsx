// src/components/common/NotificationBell.jsx
import React, { useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotifications } from '../../contexts/NotificationContext';

export default function NotificationBell({ notifOpen, setNotifOpen }) {
  // Destructure notifications array and markRead callback from context
  const [notifications, markRead] = useNotifications();
  const notifRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifOpen && notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notifOpen, setNotifOpen]);

  return (
    <div className="relative" ref={notifRef}>
      {/* Bell Button */}
      <button
        onClick={() => setNotifOpen(o => !o)}
        className="relative group rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Toggle notifications"
      >
        <FaBell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {notifOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 ring-1 ring-gray-200 dark:ring-gray-800 z-50 overflow-auto max-h-96 animate-fade-in-up">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
              No notifications
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={
                  `px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ` +
                  (n.isRead ? 'opacity-60' : 'font-medium')
                }
              >
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {n.payload.message}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

import React, { useRef } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../../contexts/NotificationContext";

export default function NotificationBell({ notifOpen, setNotifOpen }) {
  const [notifications] = useNotifications();
  const notifRef = useRef(null);

  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setNotifOpen(o => !o)}
        className="relative group rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Toggle notifications"
      >
        <FaBell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
        <span className="absolute left-8 top-0 scale-0 group-hover:scale-100 transition bg-gray-900 text-white rounded px-2 py-1 text-xs whitespace-nowrap z-20">
          Notifications
        </span>
      </button>

      {notifOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 ring-1 ring-gray-200 dark:ring-gray-800 z-40 overflow-auto max-h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
              No notifications
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n._id}
                className="px-4 py-2 border-b last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
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

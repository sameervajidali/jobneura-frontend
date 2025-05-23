// src/components/NotificationBell.jsx
import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationBell() {
  const { notifications, markRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}>
        <FaBell />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          {notifications.length === 0
            ? <p className="p-4">No notifications</p>
            : notifications.map(n => (
                <div
                  key={n._id}
                  className={`p-3 border-b ${n.isRead ? '' : 'bg-gray-100'}`}
                  onClick={() => markRead(n._id)}
                >
                  <p className="text-sm">{n.payload.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
          }
        </div>
      )}
    </div>
  );
}

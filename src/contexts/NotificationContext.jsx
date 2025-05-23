// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/axios'; // axios instance with credentials

const NotificationContext = createContext({
  notifications: [],
  markRead: async () => {}
});

export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // 1) Fetch existing notifications on mount
  useEffect(() => {
    api.get('/api/notifications')
      .then(res => {
        const mapped = res.data.notifications.map(n => ({
          ...n,
          id: n._id  // normalize id field
        }));
        setNotifications(mapped);
      })
      .catch(err => {
        console.error('Failed to load notifications', err);
      });
  }, []);

  // 2) Connect Socket.IO once
  useEffect(() => {
    const socketUrl = process.env.REACT_APP_API_URL;
    if (!socketUrl) {
      console.warn('REACT_APP_API_URL not set; skipping socket connection');
      return;
    }

    const s = io(socketUrl, { withCredentials: true });

    s.on('connect_error', err => {
      console.error('Socket.IO connection error:', err);
    });

    s.on('notification:new', notif => {
      console.log('Received:', notif);
      setNotifications(prev => [{ 
        ...notif, 
        id: notif._id 
      }, ...prev]);
    });

    setSocket(s);
    return () => {
      s.off('notification:new');
      s.disconnect();
    };
  }, [process.env.REACT_APP_API_URL]);

  // 3) Mark a notification as read
  const markRead = async id => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setNotifications(ns =>
        ns.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(`Failed to mark notification ${id} as read`, err);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/axios'; // axios instance with credentials

const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  // 1) Fetch existing on mount
  useEffect(() => {
    api.get('/notifications').then(res => {
      setNotifications(res.data.notifications);
    });
  }, []);

  // 2) Connect Socket.IO
  useEffect(() => {
    const s = io(process.env.REACT_APP_API_URL, { withCredentials: true });
    setSocket(s);

    s.on('notification:new', notif => {
       console.log('Received:', notif);
      setNotifications(prev => [notif, ...prev]);
    });

    return () => s.disconnect();
  }, []);

  // 3) Mark as read
  const markRead = async id => {
    await api.patch(`/notifications/${id}/read`);
    setNotifications(ns =>
      ns.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      markRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

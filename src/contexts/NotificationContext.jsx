// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/axios'; // axios instance preconfigured with withCredentials:true

// Create a context that provides:
// - notifications: array of notification objects
// - markRead: function to mark a notification as read by id
const NotificationContext = createContext([[], async () => {}]);

// Custom hook for easier consumption of NotificationContext in components
export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // The socketUrl is taken from environment variable VITE_API_URL
  // It should be your backend API base URL, e.g. https://api.jobneura.tech
  const socketUrl = import.meta.env.VITE_API_URL;

  // 1) Fetch existing notifications when component mounts
  useEffect(() => {
    api.get('/notifications')
      .then(res => {
        // Map backend notification _id to id for frontend consistency
        const mapped = res.data.notifications.map(n => ({
          ...n,
          id: n._id
        }));
        setNotifications(mapped);
      })
      .catch(err => {
        console.error('Failed to load notifications:', err);
      });
  }, []); // Empty dependency: run once on mount

  // 2) Set up Socket.IO client connection for realtime notifications
  useEffect(() => {
    if (!socketUrl) {
      console.warn('VITE_API_URL not set; skipping socket connection');
      return;
    }

    // Initialize socket connection with credentials enabled (for cookies)
    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'], // Explicitly enable polling as fallback
    });

    // Log connection errors (helps diagnose issues like CORS, proxy, backend down)
    socket.on('connect_error', err => {
      console.error('Socket.IO connection error:', err);
    });

    // On receiving a new notification from backend socket event 'notification:new'
    socket.on('notification:new', notif => {
      console.log('Received new notification:', notif);
      // Prepend new notification (mapped _id to id) to current notifications list
      setNotifications(prev => [{
        ...notif,
        id: notif._id
      }, ...prev]);
    });

    // Cleanup function: disconnect socket on unmount to avoid memory leaks
    return () => {
      socket.off('notification:new'); // Remove event listener
      socket.disconnect(); // Disconnect socket connection
    };
  }, [socketUrl]); // Reconnect if socketUrl changes

  // 3) Function to mark a notification as read (patch request)
  const markRead = async id => {
    try {
      await api.patch(`/notifications/${id}/read`);
      // Update local notification state immediately for UI responsiveness
      setNotifications(ns =>
        ns.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error(`Failed to mark notification ${id} as read:`, err);
    }
  };

  // Provide notifications array and markRead function to children components
  return (
    <NotificationContext.Provider value={[notifications, markRead]}>
      {children}
    </NotificationContext.Provider>
  );
}

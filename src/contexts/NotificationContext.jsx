// // src/contexts/NotificationContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import api from '../services/axios'; // axios instance with withCredentials

// // Provide a tuple [notifications, markRead]
// const NotificationContext = createContext([[], async () => {}]);

// export const useNotifications = () => useContext(NotificationContext);

// export function NotificationProvider({ children }) {
//   const [notifications, setNotifications] = useState([]);
// const socketUrl = import.meta.env.VITE_API_URL;

//   // 1) Fetch existing notifications on mount
//   useEffect(() => {
//     api.get('/notifications')
//       .then(res => {
//         const mapped = res.data.notifications.map(n => ({
//           ...n,
//           id: n._id
//         }));
//         setNotifications(mapped);
//       })
//       .catch(err => {
//         console.error('Failed to load notifications:', err);
//       });
//   }, []);

//   // 2) Connect Socket.IO once
//  useEffect(() => {
//   const socketUrl = import.meta.env.VITE_API_URL;
//   if (!socketUrl) {
//     console.warn('VITE_API_URL not set; skipping socket connection');
//     return;
//   }

//   const socket = io(socketUrl, { withCredentials: true });

//   socket.on('connect_error', err => {
//     console.error('Socket.IO connection error:', err);
//   });

//   socket.on('notification:new', notif => {
//     console.log('Received new notification:', notif);
//     setNotifications(prev => [{
//       ...notif,
//       id: notif._id
//     }, ...prev]);
//   });

//   return () => {
//     socket.off('notification:new');
//     socket.disconnect();
//   };
// }, [process.env.REACT_APP_API_URL]);

//   // 3) Mark a notification as read
//   const markRead = async id => {
//     try {
//       await api.patch(`/notifications/${id}/read`);
//       setNotifications(ns =>
//         ns.map(n => n.id === id ? { ...n, isRead: true } : n)
//       );
//     } catch (err) {
//       console.error(`Failed to mark notification ${id} as read:`, err);
//     }
//   };

//   return (
//     <NotificationContext.Provider value={[notifications, markRead]}>
//       {children}
//     </NotificationContext.Provider>
//   );
// }


// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/axios'; // axios instance with withCredentials

// Provide a tuple [notifications, markRead]
const NotificationContext = createContext([[], async () => {}]);

export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const socketUrl = import.meta.env.VITE_API_URL;

  // 1) Fetch existing notifications on mount
  useEffect(() => {
    api.get('/notifications')
      .then(res => {
        const mapped = res.data.notifications.map(n => ({
          ...n,
          id: n._id
        }));
        setNotifications(mapped);
      })
      .catch(err => {
        console.error('Failed to load notifications:', err);
      });
  }, []);

  // 2) Connect to Socket.IO
  useEffect(() => {
    if (!socketUrl) {
      console.warn('VITE_API_URL not set; skipping socket connection');
      return;
    }

    const socket = io(socketUrl, { withCredentials: true });

    socket.on('connect_error', err => {
      console.error('Socket.IO connection error:', err);
    });

    socket.on('notification:new', notif => {
      console.log('Received new notification:', notif);
      setNotifications(prev => [{
        ...notif,
        id: notif._id
      }, ...prev]);
    });

    return () => {
      socket.off('notification:new');
      socket.disconnect();
    };
  }, [socketUrl]); // ✅ Correct dependency

  // 3) Mark a notification as read
  const markRead = async id => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(ns =>
        ns.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error(`Failed to mark notification ${id} as read:`, err);
    }
  };

  return (
    <NotificationContext.Provider value={[notifications, markRead]}>
      {children}
    </NotificationContext.Provider>
  );
}

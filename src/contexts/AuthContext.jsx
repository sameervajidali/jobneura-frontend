
// import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
// import API from '../services/axios';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const refreshTimer = useRef(null);
//   const isRefreshing = useRef(false);

//   const loadUserFromSession = useCallback(async () => {
//     try {
//       const { data } = await API.get('/auth/me');
//       setUser(data.user ?? data);
//     } catch (err) {
//       console.warn('❌ Session invalid:', err?.response?.status);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const refreshSession = useCallback(async () => {
//     if (isRefreshing.current) return;
//     isRefreshing.current = true;
//     try {
//       const { data } = await API.post('/auth/refresh-token');
//       setUser(data.user ?? null);
//       scheduleAutoRefresh();
//     } catch (err) {
//       console.error('🔁 Refresh token failed:', err);
//       setUser(null);
//       window.location.href = '/login';
//     } finally {
//       isRefreshing.current = false;
//     }
//   }, []);

//   const scheduleAutoRefresh = useCallback(() => {
//     if (refreshTimer.current) clearTimeout(refreshTimer.current);
//     refreshTimer.current = setTimeout(() => {
//       refreshSession();
//     }, 13 * 60 * 1000); // Refresh every 13 minutes
//   }, [refreshSession]);

//   const login = useCallback(async (loginResponse) => {
//     const userData = loginResponse.user ?? loginResponse;
//     setUser(userData);
//     scheduleAutoRefresh();
//   }, [scheduleAutoRefresh]);

//   const logout = useCallback(async () => {
//     try {
//       await API.post('/auth/logout');
//     } catch (err) {
//       console.error('Logout error:', err);
//     } finally {
//       clearTimeout(refreshTimer.current);
//       setUser(null);
//       window.location.href = '/login';
//     }
//   }, []);

//   // Listen to token refreshes triggered from Axios
//   useEffect(() => {
//     const handleRefresh = (e) => {
//       setUser(e.detail);
//       scheduleAutoRefresh();
//     };
  
//     window.addEventListener('session-refresh', handleRefresh);
//     return () => window.removeEventListener('session-refresh', handleRefresh);
//   }, [scheduleAutoRefresh]);

//   useEffect(() => {
//     loadUserFromSession().then(() => scheduleAutoRefresh());
//     return () => clearTimeout(refreshTimer.current);
//   }, [loadUserFromSession, scheduleAutoRefresh]);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, refreshSession }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import API from '../services/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimer = useRef(null);
  const isRefreshing = useRef(false);

  const loadUserFromSession = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data.user ?? data);
      window.localStorage.setItem('hasSession', 'true');
    } catch (err) {
      console.warn('❌ Session invalid:', err?.response?.status);
      setUser(null);
      window.localStorage.removeItem('hasSession');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const { data } = await API.post('/auth/refresh-token');
      setUser(data.user ?? null);
      window.localStorage.setItem('hasSession', 'true');
      scheduleAutoRefresh();
    } catch (err) {
      console.error('🔁 Refresh token failed:', err);
      setUser(null);
      window.localStorage.removeItem('hasSession');
      window.location.href = '/login';
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, 13 * 60 * 1000); // Refresh every 13 minutes
  }, [refreshSession]);

  const login = useCallback(async (loginResponse) => {
    const userData = loginResponse.user ?? loginResponse;
    setUser(userData);
    window.localStorage.setItem('hasSession', 'true');
    scheduleAutoRefresh();
  }, [scheduleAutoRefresh]);

  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearTimeout(refreshTimer.current);
      setUser(null);
      window.localStorage.removeItem('hasSession');
      window.location.href = '/login';
    }
  }, []);

  // Allow external token refresh via event (from Axios)
  useEffect(() => {
    const handleRefresh = (e) => {
      setUser(e.detail);
      scheduleAutoRefresh();
    };
    window.addEventListener('session-refresh', handleRefresh);
    return () => window.removeEventListener('session-refresh', handleRefresh);
  }, [scheduleAutoRefresh]);

  // Initial load
  useEffect(() => {
  const hasSession = window.localStorage.getItem('hasSession');
  if (hasSession) {
    loadUserFromSession().then(() => {
      window.dispatchEvent(new Event('session-checked')); // ✅ Notify axios
      scheduleAutoRefresh();
    });
  } else {
    setLoading(false);
    window.dispatchEvent(new Event('session-checked')); // ✅ Notify axios anyway
  }

  return () => clearTimeout(refreshTimer.current);
}, [loadUserFromSession, scheduleAutoRefresh]);


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
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
     // const raw = data.user ?? data;
    const roleName = typeof raw.role === 'object' ? raw.role.name : raw.role;
     setUser({ ...raw, role: roleName });
      setUser(data.user ?? data);
      
    } catch (err) {
      console.warn('❌ Session invalid:', err?.response?.status);
      setUser(null);
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
      scheduleAutoRefresh();
    } catch (err) {
      console.error('🔁 Refresh token failed:', err);
      setUser(null);
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, 13 * 60 * 1000); // refresh at 13 mins
  }, [refreshSession]);

  const login = useCallback(async (loginResponse) => {
    //const userData = loginResponse.user ?? loginResponse;
    const raw = loginResponse.user ?? loginResponse;
    
    const roleName = typeof raw.role === 'object' && raw.role !== null
   ? raw.role.name
     : raw.role;
   const userData = { ...raw, role: roleName };
    setUser(userData);
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
      window.location.href = '/login'; // ⬅️ Force redirect
    }
  }, []);

  useEffect(() => {
    loadUserFromSession().then(() => scheduleAutoRefresh());
    return () => clearTimeout(refreshTimer.current);
  }, [loadUserFromSession, scheduleAutoRefresh]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

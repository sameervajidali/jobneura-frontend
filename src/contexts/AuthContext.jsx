// src/context/AuthContext.jsx
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

  // Load user from session (/auth/me)
  const loadUserFromSession = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data.user ?? data);
    } catch (err) {
      console.warn('❌ Session invalid:', err?.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh session tokens
  const refreshSession = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const { data } = await API.post('/auth/refresh-token');
      setUser(data.user ?? null);
      scheduleAutoRefresh();
    } catch (err) {
      console.error('🔁 Refresh token failed:', err);
      handleLogout();
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  // Auto-refresh every 13 minutes
  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, 13 * 60 * 1000); // 13 mins
  }, [refreshSession]);

  // Handle login manually (e.g., after login API call)
  const login = useCallback(
    async (loginResponse) => {
      const userData = loginResponse.user ?? loginResponse;
      setUser(userData);
      scheduleAutoRefresh();
    },
    [scheduleAutoRefresh]
  );

  // Core logout logic (used by logout + refresh fail)
  const handleLogout = useCallback(() => {
    clearTimeout(refreshTimer.current);
    setUser(null);
    window.localStorage.setItem('logout-event', Date.now());
    window.location.href = '/login';
  }, []);

  // Logout API call + sync logout
  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      handleLogout();
    }
  }, [handleLogout]);

  // Listen for session refresh from Axios interceptor
  useEffect(() => {
    const handleRefresh = (e) => {
      setUser(e.detail);
      scheduleAutoRefresh();
    };
    window.addEventListener('session-refresh', handleRefresh);
    return () => window.removeEventListener('session-refresh', handleRefresh);
  }, [scheduleAutoRefresh]);

  // Sync logout across browser tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'logout-event') {
        handleLogout();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleLogout]);

  // Idle timeout auto logout (optional but secure)
  useEffect(() => {
    let idleTimer = null;
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => logout(), 30 * 60 * 1000); // 30 minutes
    };

    ['mousemove', 'keydown', 'click'].forEach((event) =>
      window.addEventListener(event, resetIdleTimer)
    );

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      ['mousemove', 'keydown', 'click'].forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
    };
  }, [logout]);

  // Initial session check on load
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

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

  /**
   * ✅ Load user from access token (/auth/me)
   * Will fail if access token is expired or missing
   */
  const loadUserFromSession = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/me', { withCredentials: true });
      setUser(data.user ?? data);
      return true;
    } catch (err) {
      console.warn('❌ Access token invalid:', err?.response?.status);
      return false;
    }
  }, []);

  /**
   * 🔁 Refresh session using HttpOnly cookie
   * If refresh token is valid, sets new access token and user
   */
  const refreshSession = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const { data } = await API.post('/auth/refresh-token', {}, { withCredentials: true });
      setUser(data.user ?? null);
      scheduleAutoRefresh(); // Restart refresh timer
      return true;
    } catch (err) {
      console.error('🔁 Refresh failed:', err?.response?.status);
      handleLogout();
      return false;
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  /**
   * ⏱ Schedule token auto-refresh every 13 minutes
   */
  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, 13 * 60 * 1000); // 13 minutes
  }, [refreshSession]);

  /**
   * ✅ Call after successful login
   * Sets user and starts refresh cycle
   */
  const login = useCallback(
    async (loginResponse) => {
      const userData = loginResponse.user ?? loginResponse;
      setUser(userData);
      scheduleAutoRefresh();
    },
    [scheduleAutoRefresh]
  );

  /**
   * ❌ Local logout logic (shared across tabs)
   */
  const handleLogout = useCallback(() => {
    clearTimeout(refreshTimer.current);
    setUser(null);
    window.localStorage.setItem('logout-event', Date.now());
    window.location.href = '/login';
  }, []);

  /**
   * 🚪 Logout API + sync across tabs
   */
  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      handleLogout();
    }
  }, [handleLogout]);

  /**
   * 🧠 Handle manual session update (e.g., after refresh via Axios)
   */
  useEffect(() => {
    const handleRefresh = (e) => {
      setUser(e.detail);
      scheduleAutoRefresh();
    };
    window.addEventListener('session-refresh', handleRefresh);
    return () => window.removeEventListener('session-refresh', handleRefresh);
  }, [scheduleAutoRefresh]);

  /**
   * 🔁 Sync logout across tabs
   */
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'logout-event') {
        handleLogout();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleLogout]);

  /**
   * 💤 Idle timeout: logout after 30 mins inactivity
   */
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

  /**
   * 🚀 On initial mount: try to restore session
   * - If /me fails, attempt refresh-token
   * - If both fail, consider session invalid
   */
  useEffect(() => {
    const tryRestoreSession = async () => {
      const hasSession = await loadUserFromSession();
      if (!hasSession) {
        const refreshed = await refreshSession();
        if (!refreshed) {
          setUser(null);
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    };

    tryRestoreSession();
    return () => clearTimeout(refreshTimer.current);
  }, [loadUserFromSession, refreshSession]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

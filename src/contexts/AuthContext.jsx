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
   * ✅ Try to get user from /auth/me using accessToken cookie
   */
  const loadUserFromSession = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data.user ?? data);
      return true;
    } catch (err) {
      console.warn('❌ Access token invalid or expired:', err?.response?.status);
      return false;
    }
  }, []);

  /**
   * 🔁 Refresh session from refreshToken cookie
   */
  const refreshSession = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const { data } = await API.post('/auth/refresh-token');
      setUser(data.user ?? null);
      scheduleAutoRefresh();
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
   * ⏱ Schedule token refresh every 13 minutes
   */
  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(refreshSession, 13 * 60 * 1000);
  }, [refreshSession]);

  /**
   * ✅ Called after login to set user and begin refresh loop
   */
  const login = useCallback(
    (loginResponse) => {
      const userData = loginResponse.user ?? loginResponse;
      setUser(userData);
      scheduleAutoRefresh();
    },
    [scheduleAutoRefresh]
  );

  /**
   * ❌ Local logout: clear timers, state, cookies
   */
  const handleLogout = useCallback(() => {
    clearTimeout(refreshTimer.current);
    setUser(null);
    window.localStorage.setItem('logout-event', Date.now());
    window.location.href = '/login';
  }, []);

  /**
   * 🚪 Full logout: call server + cleanup
   */
  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      handleLogout();
    }
  }, [handleLogout]);

  /**
   * 🔄 Handle session update event (from Axios refresh)
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
   * 🧹 Logout in all tabs
   */
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'logout-event') handleLogout();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleLogout]);

  /**
   * 💤 Auto logout after 30 minutes of user inactivity
   */
  useEffect(() => {
    let idleTimer;
    const reset = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(logout, 30 * 60 * 1000);
    };
    ['mousemove', 'keydown', 'click'].forEach(event =>
      window.addEventListener(event, reset)
    );
    reset();
    return () => {
      clearTimeout(idleTimer);
      ['mousemove', 'keydown', 'click'].forEach(event =>
        window.removeEventListener(event, reset)
      );
    };
  }, [logout]);

  /**
   * 🚀 Try to restore session on first load
   */
  useEffect(() => {
    const tryRestore = async () => {
      const ok = await loadUserFromSession();
      if (!ok) {
        const refreshed = await refreshSession();
        if (!refreshed) {
          setUser(null);
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    };
    tryRestore();
    return () => clearTimeout(refreshTimer.current);
  }, [loadUserFromSession, refreshSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

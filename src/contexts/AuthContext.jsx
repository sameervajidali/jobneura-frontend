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
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshTimer = useRef(null);
  const isRefreshing = useRef(false);

  /**
   * Try fetching the current user using the accessToken cookie.
   * Returns true if /auth/me → 200, false on 401.
   */
  const loadUserFromSession = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data.user ?? data);
      return true;
    } catch {
      return false;
    }
  }, []);

  /**
   * Attempt to refresh tokens via the refreshToken cookie.
   *
   * @param {{ logoutOnFailure: boolean }} opts
   *    - logoutOnFailure: if true, will call handleLogout() on failure.
   *      We set this false during initial startup to avoid infinite loop.
   */
  const refreshSession = useCallback(
    async ({ logoutOnFailure = true } = {}) => {
      if (isRefreshing.current) return false;
      isRefreshing.current = true;
      try {
        const { data } = await API.post('/auth/refresh-token');
        setUser(data.user ?? null);
        scheduleAutoRefresh();
        return true;
      } catch (err) {
        console.warn('🔁 refreshSession failed:', err?.response?.status);
        if (logoutOnFailure) {
          handleLogout();
        }
        return false;
      } finally {
        isRefreshing.current = false;
      }
    },
    []
  );

  /**
   * Schedule the next automatic refresh in 13 minutes.
   */
  const scheduleAutoRefresh = useCallback(() => {
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession(); // here we use default logoutOnFailure=true
    }, 13 * 60 * 1000);
  }, [refreshSession]);

  /**
   * Call this after a successful login to set the user and start auto-refresh.
   */
  const login = useCallback(
    (loginResponse) => {
      const u = loginResponse.user ?? loginResponse;
      setUser(u);
      scheduleAutoRefresh();
    },
    [scheduleAutoRefresh]
  );

  /**
   * Core logout: clear timers, remove user, and redirect to /login.
   */
  const handleLogout = useCallback(() => {
    clearTimeout(refreshTimer.current);
    setUser(null);
    window.localStorage.setItem('logout-event', Date.now());
    window.location.href = '/login';
  }, []);

  /**
   * Full logout: call backend, then local cleanup.
   */
  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      handleLogout();
    }
  }, [handleLogout]);

  // Sync logout across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'logout-event') handleLogout();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [handleLogout]);

  // Allow manual session-refresh from Axios interceptor
  useEffect(() => {
    const onRefresh = (e) => {
      setUser(e.detail);
      scheduleAutoRefresh();
    };
    window.addEventListener('session-refresh', onRefresh);
    return () => window.removeEventListener('session-refresh', onRefresh);
  }, [scheduleAutoRefresh]);

  // Idle-timeout auto logout (30 min)
  useEffect(() => {
    let idleTimer;
    const reset = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => logout(), 30 * 60 * 1000);
    };
    ['mousemove', 'keydown', 'click'].forEach((ev) =>
      window.addEventListener(ev, reset)
    );
    reset();
    return () =>
      ['mousemove', 'keydown', 'click'].forEach((ev) =>
        window.removeEventListener(ev, reset)
      );
  }, [logout]);

  /**
   * 🚀 **On mount**, try to restore session:
   * 1. call /auth/me
   * 2. if that fails, call /auth/refresh-token **without** logging out on failure
   * 3. then finish loading (so UI can stop showing spinner)
   */
  useEffect(() => {
    const bootstrap = async () => {
      const ok = await loadUserFromSession();
      if (!ok) {
        await refreshSession({ logoutOnFailure: false });
      }
      setLoading(false);
      // let Axios interceptor know it's safe to start auto-refresh logic
      window.dispatchEvent(new Event('session-checked'));
    };
    bootstrap();
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

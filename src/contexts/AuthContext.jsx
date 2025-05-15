import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshTimer = useRef(null);
  const isRefreshing = useRef(false);
  const loginTimestamp = useRef(null);

  // 1️⃣ Try /auth/me
  const loadUserFromSession = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data.user ?? data);
      return true;
    } catch {
      return false;
    }
  }, []);

  // 5️⃣ Core logout — clear timers and redirect to login
  const handleLogout = useCallback(() => {
    clearTimeout(refreshTimer.current);
    if (loginTimestamp.current) {
      const elapsedMs = Date.now() - loginTimestamp.current;
      const mins = Math.floor(elapsedMs / 60000);
      const secs = Math.floor((elapsedMs % 60000) / 1000);
      console.log(`🔒 Auto-logged out after ${mins}m ${secs}s`);
    }
    setUser(null);
    setLoading(false);
    window.localStorage.setItem('logout-event', Date.now());
    navigate('/login', { replace: true });
  }, [navigate]);

  // 2️⃣ /auth/refresh-token + auto-schedule
  const refreshSession = useCallback(
    async ({ logoutOnFailure = true } = {}) => {
      if (isRefreshing.current) return false;
      isRefreshing.current = true;
      try {
        const { data } = await API.post('/auth/refresh-token');
        setUser((prev) => {
          const refreshed = data.user ?? {};
          if (typeof refreshed.role === 'string') {
            refreshed.role = { name: refreshed.role };
          }
          return { ...prev, ...refreshed };
        });
        // schedule next refresh in 10 minutes
        clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(
          () => refreshSession({ logoutOnFailure }),
          10 * 60 * 1000
        );
        return true;
      } catch (err) {
        console.warn('🔁 refreshSession failed:', err?.response?.status);
        if (logoutOnFailure) handleLogout();
        return false;
      } finally {
        isRefreshing.current = false;
      }
    },
    [handleLogout]
  );

  // 4️⃣ login(): set user and start refresh cycle
  const login = useCallback(
    (loginResponse) => {
      const u = loginResponse.user ?? loginResponse;
      setUser(u);
      loginTimestamp.current = Date.now();
      // schedule first refresh in 10 minutes
      clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(
        () => refreshSession({ logoutOnFailure: true }),
        10 * 60 * 1000
      );
    },
    [refreshSession]
  );

  // 6️⃣ logout(): notify server then cleanup
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

  // Axios-triggered session refresh
  useEffect(() => {
    const onRefresh = (e) => {
      setUser(e.detail);
      clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(
        () => refreshSession({ logoutOnFailure: true }),
        10 * 60 * 1000
      );
    };
    window.addEventListener('session-refresh', onRefresh);
    return () => window.removeEventListener('session-refresh', onRefresh);
  }, [refreshSession]);

  // Inactivity timeout (30 minutes)
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

  // Refresh on window focus (no logout on failure)
  useEffect(() => {
    const onFocus = () => {
      refreshSession({ logoutOnFailure: false });
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refreshSession]);

  // 🚀 Bootstrap on mount
  useEffect(() => {
    const bootstrap = async () => {
      const ok = await loadUserFromSession();
      if (!ok) {
        await refreshSession({ logoutOnFailure: false });
      }
      setLoading(false);
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

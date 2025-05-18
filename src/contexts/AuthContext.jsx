
// src/contexts/AuthContext.jsx
import React, {
  createContext, useContext,
  useState, useEffect,
  useCallback, useRef
} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const refreshTimer = useRef();

  // —————————————————————————————————————————————
  // 1️⃣ Bootstrap session from /auth/me
  const bootstrapSession = useCallback(async () => {
    console.log('[Auth] bootstrapSession start');
    try {
      const { data } = await API.get('/auth/me');
      console.log('[Auth] /auth/me OK:', data);
      if (isMounted.current) {
        setUser(data.user ?? data);
        localStorage.setItem('hasSession', 'true');
      }
    } catch (err) {
      console.warn('[Auth] /auth/me failed (no cookie?), skipping refresh', err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        console.log('[Auth] bootstrapSession done → dispatch session-checked');
        window.dispatchEvent(new Event('session-checked'));
      }
    }
  }, []);

  // —————————————————————————————————————————————
  // 2️⃣ Refresh-token helper (on-demand)
  const refreshSession = useCallback(async ({ logoutOnFailure = true } = {}) => {
    console.log('[Auth] refreshSession start', { logoutOnFailure });
    try {
      const { data } = await API.post('/auth/refresh-token');
      console.log('[Auth] refresh-token OK:', data);
      if (isMounted.current) {
        setUser(data.user ?? {});
        localStorage.setItem('hasSession', 'true');
      }
      // schedule next in 10m
      clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(
        () => refreshSession({ logoutOnFailure }),
        10 * 60 * 1000
      );
      return true;
    } catch (err) {
      console.error('[Auth] refresh-token ERROR:', err);
      if (logoutOnFailure) doLogout();
      return false;
    }
  }, []);

  // —————————————————————————————————————————————
  // 3️⃣ Login & Logout
  const doLogin = useCallback(payload => {
    console.log('[Auth] doLogin:', payload);
    const u = payload.user ?? payload;
    if (isMounted.current) setUser(u);
    localStorage.setItem('hasSession', 'true');
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(
      () => refreshSession({ logoutOnFailure: true }),
      10 * 60 * 1000
    );
  }, [refreshSession]);

  const doLogout = useCallback(() => {
    console.log('[Auth] doLogout');
    clearTimeout(refreshTimer.current);
    if (isMounted.current) setUser(null);
    setLoading(false);
    localStorage.removeItem('hasSession');
    navigate('/login', { replace: true });
  }, [navigate]);

  const logout = useCallback(async () => {
    console.log('[Auth] logout called');
    try {
      await API.post('/auth/logout');
      console.log('[Auth] server logout OK');
    } catch (e) {
      console.warn('[Auth] server logout ERR, continuing anyway', e);
    } finally {
      doLogout();
    }
  }, [doLogout]);

  // —————————————————————————————————————————————
  // 4️⃣ Mount → bootstrap
  useEffect(() => {
    bootstrapSession();
    return () => {
      isMounted.current = false;
      clearTimeout(refreshTimer.current);
    };
  }, [bootstrapSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login: doLogin, logout, refreshSession }}>
      {/* {loading
        ? <div className="flex items-center justify-center h-full">Loading session…</div>
        : children
      } */}
       {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

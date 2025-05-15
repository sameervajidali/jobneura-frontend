// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";    // your configured axios instance

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // refs for our auto-refresh timer & concurrency guard
  const refreshTimer = useRef();
  const isRefreshing = useRef(false);
  const loginTime    = useRef();

  // Helper: normalize whatever your API returns for role
  const normalizeRole = (u) => {
    if (!u) return "";
    let r = u.role;
    if (typeof r === "string") r = { name: r };
    return (r.name || "").toUpperCase();
  };

  // 1️⃣ Bootstrap: try /auth/me → fallback to refresh-token
  const bootstrapSession = useCallback(async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user ?? data);
    } catch {
      // try refresh-token once (won’t log you out on failure)
      await refreshSession({ logoutOnFailure: false });
    } finally {
      setLoading(false);
    }
  }, []);

  // 2️⃣ Single refreshSession + self-scheduling
  const refreshSession = useCallback(
    async ({ logoutOnFailure = true } = {}) => {
      if (isRefreshing.current) return false;
      isRefreshing.current = true;
      try {
        const { data } = await API.post("/auth/refresh-token");
        setUser((prev) => {
          const updated = data.user ?? {};
          // re-wrap flat role strings:
          if (typeof updated.role === "string") {
            updated.role = { name: updated.role };
          }
          return { ...prev, ...updated };
        });
        // schedule next refresh in 10m
        clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(
          () => refreshSession({ logoutOnFailure }),
          10 * 60 * 1000
        );
        return true;
      } catch (err) {
        if (logoutOnFailure) doLogout();
        return false;
      } finally {
        isRefreshing.current = false;
      }
    },
    []
  );

  // 3️⃣ Login: seed user + start refresh loop
  const doLogin = useCallback(
    (payload) => {
      const u = payload.user ?? payload;
      setUser(u);
      loginTime.current = Date.now();
      // first refresh in 10m
      clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(
        () => refreshSession({ logoutOnFailure: true }),
        10 * 60 * 1000
      );
    },
    [refreshSession]
  );

  // 4️⃣ Logout cleanup
  const doLogout = useCallback(() => {
    clearTimeout(refreshTimer.current);
    setUser(null);
    setLoading(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  // 5️⃣ Public logout.Call server then local cleanup.
  const logout = useCallback(async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      /* ignore */
    } finally {
      doLogout();
    }
  }, [doLogout]);

  // 6️⃣ Auto-retry 401s via Axios interceptor
  useEffect(() => {
    const id = API.interceptors.response.use(
      res => res,
      async err => {
        const original = err.config;
        if (
          err.response?.status === 401 &&
          !original._retry
        ) {
          original._retry = true;
          const ok = await refreshSession({ logoutOnFailure: false });
          if (ok) return API(original);
        }
        return Promise.reject(err);
      }
    );
    return () => API.interceptors.response.eject(id);
  }, [refreshSession]);

  // 7️⃣ On mount, bootstrap session
  useEffect(() => {
    bootstrapSession();
    return () => clearTimeout(refreshTimer.current);
  }, [bootstrapSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: doLogin,
        logout,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

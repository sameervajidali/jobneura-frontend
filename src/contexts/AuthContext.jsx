// // src/contexts/AuthContext.jsx
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback
// } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/axios";    // your configured axios instance

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();
//   const [user, setUser]       = useState(null);
//   const [loading, setLoading] = useState(true);

//   // refs for our auto-refresh timer & concurrency guard
//   const refreshTimer = useRef();
//   const isRefreshing = useRef(false);
//   const loginTime    = useRef();

//   // Helper: normalize whatever your API returns for role
//   const normalizeRole = (u) => {
//     if (!u) return "";
//     let r = u.role;
//     if (typeof r === "string") r = { name: r };
//     return (r.name || "").toUpperCase();
//   };

//   // 1️⃣ Bootstrap: try /auth/me → fallback to refresh-token
//   const bootstrapSession = useCallback(async () => {
//     try {
//       const { data } = await API.get("/auth/me");
//       setUser(data.user ?? data);
//     } catch {
//       // try refresh-token once (won’t log you out on failure)
//       await refreshSession({ logoutOnFailure: false });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // 2️⃣ Single refreshSession + self-scheduling
//   const refreshSession = useCallback(
//     async ({ logoutOnFailure = true } = {}) => {
//       if (isRefreshing.current) return false;
//       isRefreshing.current = true;
//       try {
//         const { data } = await API.post("/auth/refresh-token");
//         setUser((prev) => {
//           const updated = data.user ?? {};
//           // re-wrap flat role strings:
//           if (typeof updated.role === "string") {
//             updated.role = { name: updated.role };
//           }
//           return { ...prev, ...updated };
//         });
//         // schedule next refresh in 10m
//         clearTimeout(refreshTimer.current);
//         refreshTimer.current = setTimeout(
//           () => refreshSession({ logoutOnFailure }),
//           10 * 60 * 1000
//         );
//         return true;
//       } catch (err) {
//         if (logoutOnFailure) doLogout();
//         return false;
//       } finally {
//         isRefreshing.current = false;
//       }
//     },
//     []
//   );

//   // 3️⃣ Login: seed user + start refresh loop
//   const doLogin = useCallback(
//     (payload) => {
//       const u = payload.user ?? payload;
//       setUser(u);
//       loginTime.current = Date.now();
//       // first refresh in 10m
//       clearTimeout(refreshTimer.current);
//       refreshTimer.current = setTimeout(
//         () => refreshSession({ logoutOnFailure: true }),
//         10 * 60 * 1000
//       );
//     },
//     [refreshSession]
//   );

//   // 4️⃣ Logout cleanup
//   const doLogout = useCallback(() => {
//     clearTimeout(refreshTimer.current);
//     setUser(null);
//     setLoading(false);
//     navigate("/login", { replace: true });
//   }, [navigate]);

//   // 5️⃣ Public logout.Call server then local cleanup.
//   const logout = useCallback(async () => {
//     try {
//       await API.post("/auth/logout");
//     } catch {
//       /* ignore */
//     } finally {
//       doLogout();
//     }
//   }, [doLogout]);

//   // 6️⃣ Auto-retry 401s via Axios interceptor
//   useEffect(() => {
//     const id = API.interceptors.response.use(
//       res => res,
//       async err => {
//         const original = err.config;
//         if (
//           err.response?.status === 401 &&
//           !original._retry
//         ) {
//           original._retry = true;
//           const ok = await refreshSession({ logoutOnFailure: false });
//           if (ok) return API(original);
//         }
//         return Promise.reject(err);
//       }
//     );
//     return () => API.interceptors.response.eject(id);
//   }, [refreshSession]);

//   // 7️⃣ On mount, bootstrap session
//   useEffect(() => {
//     bootstrapSession();
//     return () => clearTimeout(refreshTimer.current);
//   }, [bootstrapSession]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login: doLogin,
//         logout,
//         refreshSession
//       }}
//     >
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
  useCallback,
  useRef
} from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimer = useRef();
  const isMounted    = useRef(true);

  // ——————————————————————————————————————————————————
  // BOOTSTRAP /auth/me
  const bootstrapSession = useCallback(async () => {
    console.log('[Auth] bootstrapSession start');
    try {
      const { data } = await API.get("/auth/me");
      console.log('[Auth] /auth/me success:', data);
      if (isMounted.current) setUser(data.user ?? data);
    } catch (err) {
      console.warn('[Auth] /auth/me failed, will try refresh:', err);
      try {
        const ok = await refreshSession({ logoutOnFailure: false });
        console.log('[Auth] refreshSession returned:', ok);
      } catch {}
    } finally {
      console.log('[Auth] bootstrapSession finally – clearing loading');
      if (isMounted.current) {
        setLoading(false);
        window.dispatchEvent(new Event('session-checked'));
      }
    }
  }, []);

  // ——————————————————————————————————————————————————
  // REFRESH
  const refreshSession = useCallback(async ({ logoutOnFailure = true } = {}) => {
    console.log('[Auth] refreshSession start', { logoutOnFailure });
    try {
      const { data } = await API.post("/auth/refresh-token");
      console.log('[Auth] refresh-token success:', data);
      if (isMounted.current) setUser(data.user ?? {});
      // schedule next
      clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(() => {
        refreshSession({ logoutOnFailure });
      }, 10 * 60 * 1000);
      return true;
    } catch (err) {
      console.error('[Auth] refresh-token error:', err);
      if (logoutOnFailure) doLogout();
      return false;
    }
  }, []);

  // ——————————————————————————————————————————————————
  // LOGIN / LOGOUT
  const doLogin = useCallback(payload => {
    console.log('[Auth] doLogin payload:', payload);
    const u = payload.user ?? payload;
    if (isMounted.current) setUser(u);
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => refreshSession({ logoutOnFailure: true }), 10 * 60 * 1000);
  }, [refreshSession]);

  const doLogout = useCallback(() => {
    console.log('[Auth] doLogout');
    clearTimeout(refreshTimer.current);
    if (isMounted.current) {
      setUser(null);
      setLoading(false);
    }
    navigate("/login", { replace: true });
  }, [navigate]);

  const logout = useCallback(async () => {
    console.log('[Auth] logout called');
    try {
      await API.post("/auth/logout");
      console.log('[Auth] server logout OK');
    } catch (err) {
      console.warn('[Auth] server logout error, continuing:', err);
    } finally {
      doLogout();
    }
  }, [doLogout]);

  // ——————————————————————————————————————————————————
  // INTERCEPTOR for manual 401 retry
  useEffect(() => {
    console.log('[Auth] setting up axios interceptor');
    const id = API.interceptors.response.use(
      res => res,
      async err => {
        console.log('[Auth] axios interceptor caught 401? status=', err.response?.status);
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          const ok = await refreshSession({ logoutOnFailure: false });
          if (ok) return API(original);
        }
        return Promise.reject(err);
      }
    );
    return () => API.interceptors.response.eject(id);
  }, [refreshSession]);

  // ——————————————————————————————————————————————————
  // MOUNT / UNMOUNT
  useEffect(() => {
    bootstrapSession();
    return () => {
      console.log('[Auth] AuthProvider unmounting');
      isMounted.current = false;
      clearTimeout(refreshTimer.current);
    };
  }, [bootstrapSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login: doLogin, logout, refreshSession }}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <span>Loading session…</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

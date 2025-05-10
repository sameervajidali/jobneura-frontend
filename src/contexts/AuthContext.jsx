// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";
// import API from "../services/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const refreshTimer = useRef(null);
//   const isRefreshing = useRef(false);

//   // Load user data from session (e.g., on first load)
//   const loadUserFromSession = async () => {
//     try {
//       const { data } = await API.get("/auth/me");
//       setUser(data.user ?? data);
//     } catch (err) {
//       console.warn("Session invalid or expired:", err?.response?.status);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh token session silently
//   const refreshSession = useCallback(async () => {
//     if (isRefreshing.current) return;
//     isRefreshing.current = true;
//     try {
//       const { data } = await API.post("/auth/refresh-token");
//       setUser(data.user ?? null);
//       scheduleAutoRefresh(); // reset timer on refresh
//     } catch (err) {
//       console.error("Refresh failed:", err);
//       setUser(null);
//     } finally {
//       isRefreshing.current = false;
//     }
//   }, []);

//   // Auto background refresh every 13 mins (for a 15 min token expiry)
//   const scheduleAutoRefresh = useCallback(() => {
//     if (refreshTimer.current) clearTimeout(refreshTimer.current);
//     refreshTimer.current = setTimeout(() => {
//       refreshSession();
//     }, 13 * 60 * 1000); // 13 minutes
//   }, [refreshSession]);

//   // Manual login (after auth success)
//   const login = useCallback(async (loginResponse) => {
//     try {
//       const userData = loginResponse.user ?? loginResponse;
//       setUser(userData);
//       await loadUserFromSession(); // to verify token is valid
//       scheduleAutoRefresh();
//     } catch (err) {
//       console.error("Login verification failed:", err);
//       setUser(null);
//       throw err;
//     }
//   }, [scheduleAutoRefresh]);

//   // Manual logout
//   const logout = useCallback(async () => {
//     try {
//       await API.post("/auth/logout");
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       clearTimeout(refreshTimer.current);
//       setUser(null);
//     }
//   }, []);

//   // On first app load
//   useEffect(() => {
//     loadUserFromSession().then(() => scheduleAutoRefresh());
//     return () => clearTimeout(refreshTimer.current);
//   }, [scheduleAutoRefresh]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         logout,
//         refreshSession,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isRefreshing = useRef(false);
  const refreshTimer = useRef(null);

  // Load session on mount
  const loadUserFromSession = useCallback(async () => {
  try {
    const { data } = await API.get("/auth/me");
    setUser(data.user ?? data);
    return true;
  } catch (err) {
    setUser(null);
    return false; // ✨ important
  } finally {
    setLoading(false);
  }
}, []);


  // Background token refresh
  const refreshSession = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const { data } = await API.post("/auth/refresh-token");
      setUser(data.user ?? null);
      scheduleAutoRefresh();
    } catch (err) {
      console.error("🔁 Refresh failed:", err?.response?.status);
      setUser(null);
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  // Setup timer (13 minutes)
  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, 13 * 60 * 1000);
  }, [refreshSession]);

  // Handle login response
const login = useCallback(async (loginResponse) => {
  try {
    const userData = loginResponse.user ?? loginResponse;
    setUser(userData);
    localStorage.setItem("hasSession", "true");
    scheduleAutoRefresh();
  } catch (err) {
    setUser(null);
    throw err;
  }
}, [scheduleAutoRefresh]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      clearTimeout(refreshTimer.current);
      setUser(null);
    }
  }, []);

  // On initial load
  useEffect(() => {
    loadUserFromSession();
    return () => clearTimeout(refreshTimer.current);
  }, [loadUserFromSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


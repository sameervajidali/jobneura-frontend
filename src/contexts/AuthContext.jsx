
// // AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import API from "../services/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Store tokens and user data
//   const storeAuthData = (userData, accessToken, refreshToken) => {
//     setUser(userData);
//     localStorage.setItem("hasSession", "true");
//     // if (accessToken) {
//     //   localStorage.setItem("accessToken", accessToken);
//     // }
//     // if (refreshToken) {
//     //   localStorage.setItem("refreshToken", refreshToken);
//     // }
//   };

//   // Clear all auth data
//   const clearAuthData = () => {
//     setUser(null);
//     localStorage.removeItem("hasSession");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   };

//   const fetchUserData = async () => {
//     try {
//       const { data } = await API.get("/auth/me");
//       return data.user ?? data;
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);
//       throw err;
//     }
//   };

//   const refreshUser = async () => {
//     const hasSession = localStorage.getItem("hasSession") === "true";
//     if (!hasSession) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const userData = await fetchUserData();
//       storeAuthData(userData);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         try {
//           // Attempt to refresh token
//           const { data } = await API.post("/auth/refresh-token");
//           storeAuthData(data.user, data.accessToken, data.refreshToken);
//         } catch (refreshError) {
//           clearAuthData();
//         }
//       } else {
//         clearAuthData();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (loginResponse) => {
//     try {
//       const userData = loginResponse.user ?? loginResponse;
//       const accessToken = loginResponse.accessToken;
//       const refreshToken = loginResponse.refreshToken;
      
//       storeAuthData(userData, accessToken, refreshToken);
      
//       // Verify the login by fetching fresh user data
//       const freshUserData = await fetchUserData();
//       storeAuthData(freshUserData);
//     } catch (err) {
//       console.error("Login verification failed:", err);
//       clearAuthData();
//       throw err; // Re-throw so the calling component can handle
//     }
//   };

//   const logout = async () => {
//     try {
//       await API.post("/auth/logout");
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       clearAuthData();
//     }
//   };

//   // Add cleanup and prevent multiple refreshes
//   useEffect(() => {
//     let isMounted = true;
//     const controller = new AbortController();

//     const initAuth = async () => {
//       await refreshUser();
//     };

//     if (isMounted) {
//       initAuth();
//     }

//     return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       login,
//       logout,
//       refreshUser: fetchUserData // Expose if needed
//     }}>
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
  const refreshTimer = useRef(null);
  const isRefreshing = useRef(false);

  // Load user data from session (e.g., on first load)
  const loadUserFromSession = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user ?? data);
    } catch (err) {
      console.warn("Session invalid or expired:", err?.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Refresh token session silently
  const refreshSession = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const { data } = await API.post("/auth/refresh-token");
      setUser(data.user ?? null);
      scheduleAutoRefresh(); // reset timer on refresh
    } catch (err) {
      console.error("Refresh failed:", err);
      setUser(null);
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  // Auto background refresh every 13 mins (for a 15 min token expiry)
  const scheduleAutoRefresh = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, 13 * 60 * 1000); // 13 minutes
  }, [refreshSession]);

  // Manual login (after auth success)
  const login = useCallback(async (loginResponse) => {
    try {
      const userData = loginResponse.user ?? loginResponse;
      setUser(userData);
      await loadUserFromSession(); // to verify token is valid
      scheduleAutoRefresh();
    } catch (err) {
      console.error("Login verification failed:", err);
      setUser(null);
      throw err;
    }
  }, [scheduleAutoRefresh]);

  // Manual logout
  const logout = useCallback(async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearTimeout(refreshTimer.current);
      setUser(null);
    }
  }, []);

  // On first app load
  useEffect(() => {
    loadUserFromSession().then(() => scheduleAutoRefresh());
    return () => clearTimeout(refreshTimer.current);
  }, [scheduleAutoRefresh]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

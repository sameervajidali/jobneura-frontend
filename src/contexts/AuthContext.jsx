// import React, { createContext, useContext, useState, useEffect } from "react";
// import API from "../services/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch the latest user data from backend (on login or refresh)
//   const fetchUserData = async () => {
//     try {
//       const { data } = await API.get("/auth/me");  // Fetch the latest user data from the backend
//       setUser(data.user ?? data);  // Ensure correct user data is set
//       localStorage.setItem("hasSession", "true");  // Mark session as active
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);
//       setUser(null);  // Clear user if fetching fails
//       localStorage.removeItem("hasSession");  // Remove session if fetching fails
//     }
//   };

//   // Call to refresh user data from session or token
//   const refreshUser = async () => {
//     const hasSession = localStorage.getItem("hasSession") === "true";
//     if (!hasSession) {
//       setLoading(false);  // No session found, stop loading
//       return;
//     }

//     try {
//       // 1) Try to fetch user data from session
//       await fetchUserData();
//     } catch (err) {
//       // 2) If failed, try refreshing the session
//       if (err.response?.status === 401) {
//         try {
//           await API.post("/auth/refresh-token");
//           await fetchUserData();  // Retry fetching after refreshing token
//         } catch (refreshError) {
//           setUser(null);  // If refresh fails, clear user
//           localStorage.removeItem("hasSession");  // Clear session
//         }
//       } else {
//         setUser(null);  // Handle any other errors
//         localStorage.removeItem("hasSession");  // Clear session
//       }
//     } finally {
//       setLoading(false);  // End loading, regardless of success/failure
//     }
//   };

//   // Call to login user and fetch their data after login
//   const login = async (payload) => {
//     console.log("Login called with user:", payload.user);  // Log user to verify it's correctly passed
//     try {
//       const u = payload.user ?? payload;  // Ensure the user object is correctly set
//       setUser(u);  // Update the user state
//       localStorage.setItem("hasSession", "true");  // Set session in localStorage
//       await fetchUserData();  // Fetch latest user data from the backend
//     } catch (err) {
//       console.error("Login failed:", err);
//       setUser(null);
//       localStorage.removeItem("hasSession");  // Remove session on failure
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await API.post("/auth/logout");  // Call logout API endpoint
//     } catch {
//       // Ignore error and continue with logout
//     }
//     setUser(null);  // Clear user state
//     localStorage.removeItem("hasSession");  // Clear session from localStorage
//   };

//   // Refresh user data on initial load
//   useEffect(() => {
//     refreshUser();  // Fetch user data if session exists
//   }, []);  // This effect only runs on initial load

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Store tokens and user data
  const storeAuthData = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem("hasSession", "true");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  // Clear all auth data
  const clearAuthData = () => {
    setUser(null);
    localStorage.removeItem("hasSession");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const fetchUserData = async () => {
    try {
      const { data } = await API.get("/auth/me");
      return data.user ?? data;
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      throw err;
    }
  };

  const refreshUser = async () => {
    const hasSession = localStorage.getItem("hasSession") === "true";
    if (!hasSession) {
      setLoading(false);
      return;
    }

    try {
      const userData = await fetchUserData();
      storeAuthData(userData);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          // Attempt to refresh token
          const { data } = await API.post("/auth/refresh-token");
          storeAuthData(data.user, data.accessToken, data.refreshToken);
        } catch (refreshError) {
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginResponse) => {
    try {
      const userData = loginResponse.user ?? loginResponse;
      const accessToken = loginResponse.accessToken;
      const refreshToken = loginResponse.refreshToken;
      
      storeAuthData(userData, accessToken, refreshToken);
      
      // Verify the login by fetching fresh user data
      const freshUserData = await fetchUserData();
      storeAuthData(freshUserData);
    } catch (err) {
      console.error("Login verification failed:", err);
      clearAuthData();
      throw err; // Re-throw so the calling component can handle
    }
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuthData();
    }
  };

  // Add cleanup and prevent multiple refreshes
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const initAuth = async () => {
      await refreshUser();
    };

    if (isMounted) {
      initAuth();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      refreshUser: fetchUserData // Expose if needed
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
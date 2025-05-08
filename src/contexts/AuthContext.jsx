
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
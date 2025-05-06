// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Attempt to restore session by hitting /auth/me, then fallback to refresh-token
  const refreshUser = async () => {
    const hasSession = localStorage.getItem("hasSession") === "true";
    if (!hasSession) {
      setLoading(false);
      return;
    }

    try {
      // 1) Try to fetch current user
      const { data } = await API.get("/auth/me");
      setUser(data.user ?? data);
      localStorage.setItem("hasSession", "true");
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          // 2) Try refreshing token if unauthorized
          await API.post("/auth/refresh-token");
          const { data } = await API.get("/auth/me");
          setUser(data.user ?? data);
          localStorage.setItem("hasSession", "true");
        } catch {
          // Refresh failed → clear session
          setUser(null);
          localStorage.removeItem("hasSession");
        }
      } else {
        // Other error → clear session
        setUser(null);
        localStorage.removeItem("hasSession");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Accept the raw user object
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("hasSession", "true");
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem("hasSession");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,   // true while /auth/me or refresh-token is in flight
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a session might exist (based on a localStorage flag)
  const mayHaveSession = localStorage.getItem("hasSession") === "true";

  const refreshUser = async () => {
    if (!mayHaveSession) {
      setLoading(false);
      return;
    }

    try {
      // Try to fetch current session
      const { data } = await API.get("/auth/me");
      setUser(data);
      localStorage.setItem("hasSession", "true");
      console.log("✅ Session restored:", data);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          // Try to refresh token
          await API.post("/auth/refresh-token");
          const { data } = await API.get("/auth/me");
          setUser(data);
          localStorage.setItem("hasSession", "true");
          console.log("🔄 Token refreshed and session restored:", data);
        } catch (refreshErr) {
          console.warn("❌ Failed to refresh session:", refreshErr);
          setUser(null);
          localStorage.removeItem("hasSession");
        }
      } else {
        console.warn("❌ Unexpected error:", err);
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

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("hasSession", "true");
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (_) {
      // ignore logout failure
    }
    setUser(null);
    localStorage.removeItem("hasSession");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

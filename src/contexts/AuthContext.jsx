import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to restore from cookie + refresh-token
  const refreshUser = async () => {
    const hasSession = localStorage.getItem("hasSession") === "true";
    if (!hasSession) {
      setLoading(false);
      return;
    }

    try {
      // 1) see if our cookie already authorizes us
      const { data } = await API.get("/auth/me");
      setUser(data.user ?? data);  // Ensure we handle both scenarios where user might be in data or directly as data
      localStorage.setItem("hasSession", "true");
    } catch (err) {
      if (err.response?.status === 401) {
        // 2) if not, try refreshing
        try {
          await API.post("/auth/refresh-token");
          const { data } = await API.get("/auth/me");
          setUser(data.user ?? data);
          localStorage.setItem("hasSession", "true");
        } catch {
          // refresh failed
          setUser(null);
          localStorage.removeItem("hasSession");
        }
      } else {
        // some other error
        setUser(null);
        localStorage.removeItem("hasSession");
      }
    } finally {
      // no matter what, we’re done trying to restore
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []); // Only run once on initial load

  // Call this on real login or after a successful profile update
  function login(payload) {
    console.log("Login called with user:", payload.user); // Log user to verify it's correctly passed
    const u = payload.user ?? payload;
    setUser(u);
    localStorage.setItem("hasSession", "true");
  }
  

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      // Ignore error, proceed with logout
    }
    setUser(null);
    localStorage.removeItem("hasSession");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);  // ← “is the session still restoring?”

  // Try to restore an existing session (accessToken in httpOnly cookie)…
  const refreshUser = async () => {
    const hasSession = localStorage.getItem("hasSession") === "true";
    if (!hasSession) {
      setLoading(false);
      return;
    }

    try {
      // 1) hit /auth/me
      const { data } = await API.get("/auth/me");
      setUser(data.user ?? data);
      localStorage.setItem("hasSession", "true");
    } catch (err) {
      // 2) if 401, try refresh-token
      if (err.response?.status === 401) {
        try {
          await API.post("/auth/refresh-token");
          const { data } = await API.get("/auth/me");
          setUser(data.user ?? data);
          localStorage.setItem("hasSession", "true");
        } catch {
          // failed to refresh
          setUser(null);
          localStorage.removeItem("hasSession");
        }
      } else {
        // some other error
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

  // -- login now accepts the raw user object --
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("hasSession", "true");
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      /* silent */
    }
    setUser(null);
    localStorage.removeItem("hasSession");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,   // expose so pages can show “Loading session…” while true
        login,
        logout,
        setUser,   // handy if you ever want to do a direct set
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

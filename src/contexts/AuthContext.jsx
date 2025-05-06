// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // Try to restore session from cookie/refresh flow
  const refreshUser = async () => {
    const hasSession = localStorage.getItem("hasSession") === "true";
    if (!hasSession) {
      setSessionLoading(false);
      return;
    }

    try {
      // 1) Try to get /auth/me
      const { data } = await API.get("/auth/me");
      setUser(data.user ?? data);
      localStorage.setItem("hasSession", "true");
    } catch (err) {
      // 2) If 401, try refresh-token
      if (err.response?.status === 401) {
        try {
          await API.post("/auth/refresh-token");
          const { data } = await API.get("/auth/me");
          setUser(data.user ?? data);
          localStorage.setItem("hasSession", "true");
        } catch {
          setUser(null);
          localStorage.removeItem("hasSession");
        }
      } else {
        // any other error: clear
        setUser(null);
        localStorage.removeItem("hasSession");
      }
    } finally {
      setSessionLoading(false);
    }
  };

  // on mount, kick off the restore flow
  useEffect(() => {
    refreshUser();
  }, []);

  // call when you have a fresh user (login or profile update)
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("hasSession", "true");
    // if somehow you call login while sessionLoading is still true,
    // clear it out so your pages render immediately
    if (sessionLoading) setSessionLoading(false);
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setUser(null);
    localStorage.removeItem("hasSession");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionLoading,  // true only while restoring from cookie/refresh
        login,
        logout,
        setUser,         // handy if you ever want to tweak it directly
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

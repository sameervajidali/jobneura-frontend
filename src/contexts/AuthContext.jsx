
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data via API
  const refreshUser = async () => {
    try {
      // Try to get current user
      const { data } = await API.get("/auth/me");
      setUser(data);
    } catch (err) {
      // If unauthorized, try refresh token flow
      if (err.response?.status === 401) {
        try {
          await API.post("/auth/refresh-token");
          const { data } = await API.get("/auth/me");
          setUser(data);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // On mount, refresh user data
    refreshUser();
  }, []);

  // Login and logout handlers
  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (_) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


// src/contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import API from "../services/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check if a session might exist (based on a localStorage flag)
//   const mayHaveSession = localStorage.getItem("hasSession") === "true";

//   const refreshUser = async () => {
//     if (!mayHaveSession) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await API.get("/auth/me");
//       setUser(data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         try {
//           await API.post("/auth/refresh-token");
//           const { data } = await API.get("/auth/me");
//           setUser(data);
//         } catch {
//           setUser(null);
//           localStorage.removeItem("hasSession");
//         }
//       } else {
//         setUser(null);
//         localStorage.removeItem("hasSession");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshUser();
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("hasSession", "true");
//   };

//   const logout = async () => {
//     try {
//       await API.post("/auth/logout");
//     } catch (_) {}
//     setUser(null);
//     localStorage.removeItem("hasSession");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

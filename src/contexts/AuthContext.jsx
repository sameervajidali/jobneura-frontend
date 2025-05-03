// // src/contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import API from "../services/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user,    setUser]    = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
    

//     async function bootstrap() {
//       try {
//         // 1) Try getting current user
//         const { data } = await API.get("/auth/me");
//         if (mounted) setUser(data);
//       } catch (err) {
//         // 2) If 401, try one refresh
//         if (err.response?.status === 401) {
//           try {
//             await API.post("/auth/refresh-token");
//             const { data } = await API.get("/auth/me");
//             if (mounted) setUser(data);
//           } catch {
//             if (mounted) setUser(null);
//           }
//         } else {
//           if (mounted) setUser(null);
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     bootstrap();
//     return () => { mounted = false };
//   }, []);

//   const login = (userData) => setUser(userData);

//   const logout = async () => {
//     try { await API.post("/auth/logout"); } catch(_) {}
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
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

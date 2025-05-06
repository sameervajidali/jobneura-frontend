// // src/contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import API from "../services/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const refreshUser = async () => {
//     const mayHaveSession = localStorage.getItem("hasSession") === "true";

//     if (!mayHaveSession) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await API.get("/auth/me");
//       setUser(data.user || data);
//       localStorage.setItem("hasSession", "true");
//       console.log("✅ Session restored:", data.user || data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         try {
//           await API.post("/auth/refresh-token");
//           const { data } = await API.get("/auth/me");
//           setUser(data.user || data);
//           localStorage.setItem("hasSession", "true");
//           console.log("🔄 Token refreshed and session restored:", data.user || data);
//         } catch (refreshErr) {
//           console.warn("❌ Failed to refresh session:", refreshErr);
//           setUser(null);
//           localStorage.removeItem("hasSession");
//         }
//       } else {
//         console.warn("❌ Unexpected error:", err);
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
//     } catch (_) {
//       // Silent fail is okay
//     }
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



// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react"
import API from "../services/axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    const ok = localStorage.getItem("hasSession")==="true"
    if (!ok) { setLoading(false); return }

    try {
      const { data } = await API.get("/auth/me")
      setUser(data.user ?? data)
      localStorage.setItem("hasSession","true")
    } catch (err) {
      if (err.response?.status===401) {
        try {
          await API.post("/auth/refresh-token")
          const { data } = await API.get("/auth/me")
          setUser(data.user ?? data)
          localStorage.setItem("hasSession","true")
        } catch {
          setUser(null)
          localStorage.removeItem("hasSession")
        }
      } else {
        setUser(null)
        localStorage.removeItem("hasSession")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refreshUser() }, [])

  const login = ({ user }) => {
    setUser(user)
    localStorage.setItem("hasSession","true")
  }
  const logout = async () => {
    try { await API.post("/auth/logout") } catch {}
    setUser(null)
    localStorage.removeItem("hasSession")
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

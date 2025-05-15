// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { ADMIN_ROLES } from "../constants/roles";
// import LoginForm from "../components/auth/LoginForm";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, loading } = useAuth();

//   const from = location.state?.from?.pathname || "/dashboard";

//   useEffect(() => {
//     if (!loading && user) {
//       const role = user.role.name?.toUpperCase(); // ✅ ensure uppercase match
//       console.log("🔐 User after login:", user);
// console.log("🔐 Role check:", user.role?.toUpperCase(), ADMIN_ROLES.includes(user.role?.toUpperCase()));

//       if (ADMIN_ROLES.includes(role)) {
//         navigate("/admin", { replace: true });
//       } else {
//         navigate(from, { replace: true });
//       }
//     }
//   }, [user, loading, navigate, from]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">Checking session...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
//       <LoginForm />
//     </div>
//   );
// }


// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/axios";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_ROLES } from "../constants/roles";
import LoginForm from "../components/auth/LoginForm";

// Helper to normalize the user.role shape
function getUserRole(user) {
  if (!user) return "";
  if (typeof user.role === "string") return user.role.toUpperCase();
  return user.role.name?.toUpperCase() || "";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // after‐login fallback
  const from = location.state?.from?.pathname || "/dashboard";

  // THIS is the only place we navigate
  const handleSubmit = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // 1) call your login API
      const { data } = await API.post("/auth/login", credentials);

      // 2) tell context about the new user + start refresh cycle
      login(data);

      // 3) decide where to go
      const role = getUserRole(data.user ?? data);
      if (ADMIN_ROLES.includes(role)) {
        navigate("/admin", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}

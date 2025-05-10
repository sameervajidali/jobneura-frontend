// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6 text-center">Checking access…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = user.role?.toUpperCase();
  const allowed = allowedRoles.map(r => r.toUpperCase());

  if (!allowed.includes(userRole)) {
  const fallback = userRole === "SUPERADMIN" || userRole === "ADMIN"
    ? "/admin"
    : "/dashboard";

  return <Navigate to={fallback} replace />;
}


  return <Outlet />;
}

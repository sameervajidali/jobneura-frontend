// src/components/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6 text-center">Loading session…</div>;
  }

  if (!user) {
    // Pass intended destination via location.state, not localStorage
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// src/components/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6 text-center">Checking session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

// src/components/auth/RequireRole.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RequireRole({ roles = [], children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6 text-center">Loading permissions...</div>;

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
}

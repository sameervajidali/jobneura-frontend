import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Convert to uppercase to ensure match
  const userRole = user.role?.toUpperCase();
  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}


import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ADMIN_ROLES } from '../constants/roles';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6 text-center">Checking access…</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    // If trying to access admin, go to /admin/login, else /login
    const isAdminRoute = location.pathname.startsWith("/admin");
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  }

  // Extract role string
  const rawName = user.role?.name || user.role;
  const userRole = typeof rawName === 'string' ? rawName.toUpperCase() : '';

  // Normalize allowed roles
  const allowed = allowedRoles.map(r => r.toUpperCase());

  // If not allowed, logout and redirect to login
  if (!allowed.includes(userRole)) {
    const isAdminRoute = location.pathname.startsWith("/admin");
    return <Navigate to={isAdminRoute ? "/login" : "/login"} state={{ from: location }} replace />;
  }

  // Authorized: render child routes
  return <Outlet />;
}


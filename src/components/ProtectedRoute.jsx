// // src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { ADMIN_ROLES } from '../constants/roles';

// export default function ProtectedRoute({ allowedRoles = [] }) {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   // While we load session data, don't render routes
//   if (loading) {
//     return <div className="p-6 text-center">Checking access…</div>;
//   }

//   // If not logged in, redirect to login and save attempt path
//   if (!user) {
//   return <Navigate to="/login" state={{ from: location }} replace />;
// }


//   // Safely extract the role name string
//   const rawName = user.role?.name;
//   const userRole = typeof rawName === 'string' ? rawName.toUpperCase() : '';

//   // Normalize allowed roles to uppercase
//   const allowed = allowedRoles.map(r => r.toUpperCase());

//   // If user does not have permission, redirect
//   if (!allowed.includes(userRole)) {
//     // Admins and SuperAdmins go to admin users list
//     const adminFallback = '/admin/users';
//     const fallback = ADMIN_ROLES.includes(userRole) ? adminFallback : '/dashboard';
//     return <Navigate to={fallback} replace />;
//   }

//   // Authorized: render child routes
//   return <Outlet />;
// }

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


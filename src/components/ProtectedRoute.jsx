// // src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// /**
//  * Renders child routes only if the current user’s role
//  * is in the allowedRoles array. Otherwise redirects to /login
//  * or a /403 page.
//  */
// export default function ProtectedRoute({ allowedRoles }) {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <div>Loading…</div>;
//   }

//   // Not logged in → go to login, but keep the original path in state
//   if (!user) {
//     return (
//       <Navigate
//         to="/login"
//         state={{ from: location }}
//         replace
//       />
//     );
//   }

//   // Logged in but not in an allowed role → 403
//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/403" replace />;
//   }

//   // OK! Render the child routes
//   return <Outlet />;
// }


// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading…</div>;
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Normalize role check
  const userRole = user.role?.toLowerCase();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

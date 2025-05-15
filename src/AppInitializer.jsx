// src/AppInitializer.jsx
import React, { useEffect, useRef } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROLES } from './constants/roles';

export default function AppInitializer({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const didRedirect = useRef(false);

  useEffect(() => {
    if (!loading && !didRedirect.current) {
      didRedirect.current = true;
      if (!user) return;

      const path = location.pathname;
      const rawName = user.role?.name ?? '';
      const role = rawName.toUpperCase();

      // Landing-page redirect
      if (path === '/' || path === '/login') {
        if (ADMIN_ROLES.includes(role)) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
        return;
      }
      // Deep-link guards
      if (path.startsWith('/admin') && !ADMIN_ROLES.includes(role)) {
        navigate('/dashboard', { replace: true });
        return;
      }
      if (path.startsWith('/dashboard') && ADMIN_ROLES.includes(role)) {
        navigate('/admin/users', { replace: true });
        return;
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading session…</p>
      </div>
    );
  }
  return <>{children}</>;
}

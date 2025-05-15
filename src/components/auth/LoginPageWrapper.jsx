// src/pages/auth/LoginPageWrapper.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPageWrapper() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🚫 Do not redirect or render login form until session is checked
  if (loading) {
    return <div className="p-6 text-center">Loading session…</div>;
  }

  if (user) {
    const fromStorage = localStorage.getItem('loginRedirectFrom');
    const fromState = location.state?.from?.pathname;
    const fallback = '/dashboard';

    const redirectPath = fromStorage || fromState || fallback;
    localStorage.removeItem('loginRedirectFrom');

    return <Navigate to={redirectPath} replace />;
  }

  return <LoginForm />;
}

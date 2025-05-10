// src/pages/LoginPageWrapper.jsx
import React from 'react';
import LoginPage from './LoginPage';
import { useLocation } from 'react-router-dom';

export default function LoginPageWrapper() {
  const location = useLocation();

  // Store 'from' in localStorage so it can survive full reloads
  if (location.state?.from?.pathname) {
    localStorage.setItem('loginRedirectFrom', location.state.from.pathname);
  }

  return <LoginPage />;
}

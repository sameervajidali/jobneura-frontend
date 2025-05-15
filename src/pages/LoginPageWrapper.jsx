// src/pages/LoginPageWrapper.jsx
import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_ROLES } from "../constants/roles";
import LoginPage from "./LoginPage";

export default function LoginPageWrapper() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until session is loaded
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking session…</p>
      </div>
    );
  }

  // Already logged in → redirect properly
  if (user) {
    const roleRaw = user.role?.name;
    const role = typeof roleRaw === "string" ? roleRaw.toUpperCase() : "";

    const stored = localStorage.getItem("loginRedirectFrom");
    const fromState = location.state?.from?.pathname;

    const finalRedirect =
      stored && stored !== "/login"
        ? stored
        : fromState && fromState !== "/login"
        ? fromState
        : ADMIN_ROLES.includes(role)
        ? "/admin/dashboard"
        : "/user/dashboard";

    localStorage.removeItem("loginRedirectFrom");

    return <Navigate to={finalRedirect} replace />;
  }

  // Not logged in → show login form
  return <LoginPage />;
}

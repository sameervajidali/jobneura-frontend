import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_ROLES } from "../constants/roles";
import LoginPage from "./LoginPage";

export default function LoginPageWrapper() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      const role = user.role?.toUpperCase();
      const stored = localStorage.getItem("loginRedirectFrom");

      if (ADMIN_ROLES.includes(role)) {
        navigate("/admin", { replace: true });
      } else if (stored && stored !== "/login") {
        navigate(stored, { replace: true });
        localStorage.removeItem("loginRedirectFrom");
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [loading, user]);

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking session…</p>
      </div>
    );
  }

  return <LoginPage />;
}

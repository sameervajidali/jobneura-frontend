import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';

export default function LoginPageWrapper() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🕐 Wait until session is fully loaded
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Checking session…</div>;
  }

  if (user) {
    const roleRaw = user.role?.name;
    const role = typeof roleRaw === "string" ? roleRaw.toUpperCase() : "";
    const fromStorage = localStorage.getItem("loginRedirectFrom");
    const fromState = location.state?.from?.pathname;

    const redirectTo =
      fromStorage && fromStorage !== "/login"
        ? fromStorage
        : fromState && fromState !== "/login"
        ? fromState
        : role === "USER"
        ? "/user/dashboard"
        : "/admin/dashboard";

    localStorage.removeItem("loginRedirectFrom");
    return <Navigate to={redirectTo} replace />;
  }

  return <LoginPage />;
}

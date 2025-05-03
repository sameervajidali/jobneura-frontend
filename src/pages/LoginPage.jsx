
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_ROLES } from "../constants/roles";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Path the user attempted before redirect, or default dashboards
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (!loading && user) {
      // Redirect admins to admin dashboard
      if (ADMIN_ROLES.includes(user.role)) {
        navigate("/admin", { replace: true });
      } else {
        // Non-admins go to their intended or regular dashboard
        navigate(from, { replace: true });
      }
    }
  }, [user, loading, navigate, from]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <LoginForm />
    </div>
  );
}

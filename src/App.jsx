// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Public Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import HelpCenterPage from "./pages/HelpCenterPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import QuizLandingPage from "./pages/QuizLandingPage.jsx";
import AccountActivationPage from "./pages/AccountActivation.jsx";
import AccountActivationInfo from "./pages/AccountActivationInfo.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// Dashboard Pages
import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/Profile";
import ChangePassword from "./components/profile/ChangePassword";

// Admin Pages
import AdminDashboardLayout from "./layouts/AdminDashboard.jsx";
import AdminDashboardHome from "./pages/admin/AdminDashboardHome.jsx";
import AdminUsersPage from "./pages/admin/Users/index.jsx";
import UserDetails from "./pages/admin/Users/UserDetails.jsx";
import UserForm from "./pages/admin/Users/UserForm.jsx";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";

// Context and Guards
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ADMIN_ROLES } from "./constants/roles.js";
import AdminQuizPanel from "./pages/admin/AdminQuizPanel.jsx";
import CreateQuizForm from "./pages/admin/Quiz/CreateQuizForm.jsx";
import EditQuizPage from "./pages/admin/Quiz/EditQuizPage.jsx";
import BulkUploadQuestionsPage from "./pages/admin/Quiz/BulkUploadQuestionsPage.jsx";
import QuestionListPage from "./pages/admin/Quiz/QuestionListPage.jsx";
import QuestionForm from "./pages/admin/Quiz/QuestionForm.jsx";
import AssignQuizPage from "./pages/admin/Quiz/AssignQuizPage.jsx";

// 🌟 AppInit: handles redirects post-login (or session restoration)
function AppInitializer({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user && location.pathname === "/login") {
      const role = user.role?.toUpperCase();
      const isAdmin = ADMIN_ROLES.includes(role);
      const redirectTo = isAdmin ? "/admin" : "/dashboard";
      console.log("🔁 App Init: role =", role, "→ redirect:", redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [loading, user, location.pathname, navigate]);

  if (loading || (!user && localStorage.getItem("hasSession") === "true")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading session…</p>
      </div>
    );
  }

  return <>{children}</>;
}

// 🌟 Layout logic based on route + role
function LayoutWrapper() {
  const { user } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin =
    location.pathname.startsWith("/admin") &&
    user &&
    ADMIN_ROLES.includes(user.role?.toUpperCase());

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className={`flex-grow ${!isDashboard && !isAdmin ? "pt-16" : ""}`}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/quizzes" element={<QuizLandingPage />} />
          <Route path="/activate" element={<AccountActivationPage />} />
          <Route path="/account-activation-info" element={<AccountActivationInfo />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* Admin Dashboard */}
          <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}>
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboardHome />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="users/:id/edit" element={<UserForm />} />
              <Route path="users/new" element={<UserForm />} />           

            {/* ─── Quiz Management ──────────────────────────────────────── */}
              <Route path="quizzes" element={<AdminQuizPanel />} />
              <Route path="quizzes/create" element={<CreateQuizForm />} />
              <Route path="quizzes/:quizId/edit" element={<EditQuizPage />} />
              <Route path="quizzes/:quizId/bulk-upload" element={<BulkUploadQuestionsPage />} />

              <Route path="quizzes/:quizId/questions" element={<QuestionListPage />} />
              <Route path="quizzes/:quizId/questions/new" element={<QuestionForm />} />
              <Route path="quizzes/:quizId/questions/:questionId/edit" element={<QuestionForm />} />

              {/* …inside your <Route path="/admin" …> block… */}
              <Route path="quizzes/:quizId/assign" element={<AssignQuizPage />} />

          </Route>
           </Route>
          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isDashboard && !isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppInitializer>
            <LayoutWrapper />
          </AppInitializer>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

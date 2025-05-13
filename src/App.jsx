// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useEffect } from "react";

// Public Pages
import HomePage from "./pages/HomePage";
//import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ContactPage from "./pages/ContactPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import QuizLandingPage from "./pages/QuizLandingPage";
import AccountActivationPage from "./pages/AccountActivation";
import AccountActivationInfo from "./pages/AccountActivationInfo";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Dashboard Pages
import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/Profile";
import ChangePassword from "./components/profile/ChangePassword";

// Admin Pages
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboardHome from "./pages/admin/AdminDashboardHome";
import AdminUsersPage from "./pages/admin/Users";
import UserDetails from "./pages/admin/Users/UserDetails";
import UserForm from "./pages/admin/Users/UserForm";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

// Context and Guards
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { ADMIN_ROLES } from "./constants/roles";

// Admin Features
import AdminQuizPanel from "./pages/admin/AdminQuizPanel";
import CreateQuizForm from "./pages/admin/Quiz/CreateQuizForm";
import EditQuizPage from "./pages/admin/Quiz/EditQuizPage";
import BulkUploadQuestionsPage from "./pages/admin/Quiz/BulkUploadQuestionsPage";
import QuestionListPage from "./pages/admin/Quiz/QuestionListPage";
import QuestionForm from "./pages/admin/Quiz/QuestionForm";
import AssignQuizPage from "./pages/admin/Quiz/AssignQuizPage";
import AdminLeaderboardPage from "./pages/admin/AdminLeaderboardPage";
import UserHistoryPage from "./pages/admin/Users/UserHistoryPage";
import ProfilePage from "./pages/admin/ProfilePage";
import ChangePasswordPage from "./pages/admin/ChangePasswordPage";
import BulkUploadQuizzesPage from "./pages/admin/Quiz/BulkUploadQuizzesPage";

// Quiz
import QuizExplorerPage from "./pages/QuizExplorerPage";
import QuizStartPage from "./pages/QuizStartPage";
import QuizResultPage from "./pages/QuizResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPageWrapper from "./pages/LoginPageWrapper";
import AdminRolesPage from "./pages/admin/Roles/AdminRolesPage";
import RoleForm from "./pages/admin/Roles/RoleForm";
import ReportsPage from "./pages/admin/Reports/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import TicketListPage from "./pages/admin/TicketListPage";
import TicketDetailsPage from "./pages/admin/TicketDetailsPage";
import CategoryForm from "./pages/admin/CategoryForm";
import TopicsPage from "./pages/admin/TopicsPage";
import TopicForm from "./pages/admin/TopicForm";
import CategoriesPage from "./pages/admin/CategoriesPage";

// 🌟 AppInit: handles session wait
function AppInitializer({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Fix: prevent users being stuck in admin route
  // useEffect(() => {
  //   if (!loading && user) {
  //     const path = location.pathname;
  //     const role = user.role?.toUpperCase();

  //     if (path.startsWith('/admin') && !ADMIN_ROLES.includes(role)) {
  //       navigate('/dashboard', { replace: true });
  //     }

  //     if (path.startsWith('/dashboard') && ADMIN_ROLES.includes(role)) {
  //       navigate('/admin', { replace: true });
  //     }
  //   }
  // }, [loading, user, location.pathname]);

  useEffect(() => {
    if (!loading && user) {
      const path = location.pathname;

      // 🔍 Debug logging
      console.group("🔐 redirectUser debug");
      console.log("Full user object:", user);
      console.log("user.role:", user.role);
      console.log("user.role?.name:", user.role?.name);
      console.log("Type of user.role?.name:", typeof user.role?.name);
      const rawName = user.role?.name;
      const role =
        typeof rawName === "string"
          ? rawName.toUpperCase()
          : `<INVALID: ${typeof rawName}>`;
      console.log("Computed role string:", role);
      console.groupEnd();

      // your redirect logic
      if (path.startsWith("/admin") && !ADMIN_ROLES.includes(role)) {
        navigate("/dashboard", { replace: true });
      }
      if (path.startsWith("/dashboard") && ADMIN_ROLES.includes(role)) {
        navigate("/admin/users", { replace: true });
      }
    }
  }, [loading, user, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading session…</p>
      </div>
    );
  }

  return <>{children}</>;
}

// 🌐 Layout wrapper for navbar/footer logic
function LayoutWrapper() {
  const { user } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin =
    user?.role.name &&
    ADMIN_ROLES.includes(user.role.name.toUpperCase()) &&
    location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className={`flex-grow ${!isDashboard && !isAdmin ? "pt-16" : ""}`}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPageWrapper />} />

          {/* Quizzes & Leaderboard */}
          <Route path="/quizzes" element={<QuizExplorerPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/quiz/:quizId/start" element={<QuizStartPage />} />
          <Route
            path="/quiz/:quizId/result/:attemptId"
            element={<QuizResultPage />}
          />

          {/* Account & Recovery */}
          <Route path="/activate" element={<AccountActivationPage />} />
          <Route
            path="/account-activation-info"
            element={<AccountActivationInfo />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}
          >
            <Route path="" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboardHome />} />
              <Route path="dashboard" element={<AdminDashboardHome />} />{" "}
              {/* ← ADD THIS */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="roles" element={<AdminRolesPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="tickets" element={<TicketListPage />} />
              <Route path="tickets/:ticketId" element={<TicketDetailsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="categories/new" element={<CategoryForm />} />
              <Route path="categories/:id/edit" element={<CategoryForm />} />
              <Route path="topics" element={<TopicsPage />} />
              <Route path="topics/new" element={<TopicForm />} />
              <Route path="topics/:id/edit" element={<TopicForm />} />
              <Route path="roles/new" element={<RoleForm />} />
              <Route path="roles/:id/edit" element={<RoleForm />} />
              <Route path="users/new" element={<UserForm />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="users/:id/edit" element={<UserForm />} />
              <Route path="users/:id/history" element={<UserHistoryPage />} />
              <Route path="quizzes" element={<AdminQuizPanel />} />
              <Route path="quizzes/create" element={<CreateQuizForm />} />
              <Route path="quizzes/:quizId/edit" element={<EditQuizPage />} />
              <Route
                path="quizzes/:quizId/bulk-upload"
                element={<BulkUploadQuestionsPage />}
              />
              <Route
                path="quizzes/bulk-upload"
                element={<BulkUploadQuizzesPage />}
              />
              <Route
                path="quizzes/:quizId/questions"
                element={<QuestionListPage />}
              />
              <Route
                path="quizzes/:quizId/questions/new"
                element={<QuestionForm />}
              />
              <Route
                path="quizzes/:quizId/questions/:questionId/edit"
                element={<QuestionForm />}
              />
              <Route
                path="quizzes/:quizId/assign"
                element={<AssignQuizPage />}
              />
              <Route path="leaderboard" element={<AdminLeaderboardPage />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
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

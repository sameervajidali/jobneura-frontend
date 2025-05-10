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
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
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

// 🌟 AppInit: handles session wait
function AppInitializer({ children }) {
  const { user, loading } = useAuth();

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
    user?.role && ADMIN_ROLES.includes(user.role.toUpperCase()) &&
    location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className={`flex-grow ${!isDashboard && !isAdmin ? "pt-16" : ""}`}>
        <Routes>
          {/* Public Pages */}
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

          {/* Quizzes & Leaderboard */}
          <Route path="/quizzes" element={<QuizExplorerPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/quiz/:quizId/start" element={<QuizStartPage />} />
          <Route path="/quiz/:quizId/result/:attemptId" element={<QuizResultPage />} />

          {/* Account & Recovery */}
          <Route path="/activate" element={<AccountActivationPage />} />
          <Route path="/account-activation-info" element={<AccountActivationInfo />} />
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
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />

              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/new" element={<UserForm />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="users/:id/edit" element={<UserForm />} />
              <Route path="users/:id/history" element={<UserHistoryPage />} />

              <Route path="quizzes" element={<AdminQuizPanel />} />
              <Route path="quizzes/create" element={<CreateQuizForm />} />
              <Route path="quizzes/:quizId/edit" element={<EditQuizPage />} />
              <Route path="quizzes/:quizId/bulk-upload" element={<BulkUploadQuestionsPage />} />
              <Route path="quizzes/bulk-upload" element={<BulkUploadQuizzesPage />} />
              <Route path="quizzes/:quizId/questions" element={<QuestionListPage />} />
              <Route path="quizzes/:quizId/questions/new" element={<QuestionForm />} />
              <Route path="quizzes/:quizId/questions/:questionId/edit" element={<QuestionForm />} />
              <Route path="quizzes/:quizId/assign" element={<AssignQuizPage />} />

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

// src/App.jsx
import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
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
import Uquiz from "./components/dashboard/Uquiz";


import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/Profile";
import ChangePassword from "./components/profile/ChangePassword";

import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

import AdminDashboardHome from "./pages/admin/AdminDashboardHome";
import AdminUsersPage from "./pages/admin/Users";
import UserDetails from "./pages/admin/Users/UserDetails";
import UserForm from "./pages/admin/Users/UserForm";

// Admin Pages

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
import AdminBlogListPage from "./pages/admin/blogs/AdminBlogListPage";

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
import AdminJobsPage from "./pages/admin/jobs/AdminJobsPage";
import SeoManager from "./pages/admin/SeoManager";
import AdminBlogEditPage from "./pages/admin/blogs/AdminBlogEditPage";
import CategoryTopicsPage from "./pages/admin/CategoryTopicsPage";
// … import any other admin pages …

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ADMIN_ROLES } from "./constants/roles";
import JobsPage from "./pages/JobsPage";
import AdminBlogReviewEditPage from "./pages/admin/blogs/AdminBlogReviewEditPage";
import TutorialsPage from "./pages/TutorialsPage";
import BlogPage from "./pages/BlogPage";
import AdminTutorialsPage from "./pages/admin/AdminTutorialsPage";
import SubTopicsPage from "./pages/admin/subTopicPage";
import SubTopicForm from "./pages/admin/SubTopicForm"; // for add/edit
import SubTopicBulkUploadPage from "./pages/admin/SubTopicBulkUploadPage"; // create if missing

// --- AppInitializer: waits for session check before rendering ---
function AppInitializer({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const didRedirect = useRef(false);

  useEffect(() => {
    if (!loading && user && !didRedirect.current) {
      // didRedirect.current = true;
      // const path = location.pathname;

      // if we have a `from` (quiz or any protected route), let redirectUser handle it
      const from = location.state?.from?.pathname;
      if (from) return;

      didRedirect.current = true;
      const path = location.pathname;
      const role = (user.role?.name || "").toUpperCase();

      // landing‐page redirect
      if (path === "/" || path === "/login") {
        if (ADMIN_ROLES.includes(role)) {
          return navigate("/admin", { replace: true });
        }
        return navigate("/dashboard", { replace: true });
      }

      // deep‐link guards

      if (path.startsWith("/admin") && !ADMIN_ROLES.includes(role)) {
        return navigate("/dashboard", { replace: true });
      }
      if (path.startsWith("/dashboard") && ADMIN_ROLES.includes(role)) {
        return navigate("/admin/users", { replace: true });
      }
    }
  }, [loading, user, location.pathname, navigate]);

  // if (loading) {
  //   return <div className="p-6 text-center">Loading session…</div>;
  // }
  return <>{children}</>;
}

// --- LayoutWrapper: shows Navbar/Footer only on public pages ---
function LayoutWrapper() {
  const { user } = useAuth();
  const location = useLocation();
  const role = (user?.role?.name || "").toUpperCase();

  const isUserDashboard =
    !ADMIN_ROLES.includes(role) && location.pathname.startsWith("/dashboard");
  const isAdminRoute =
    ADMIN_ROLES.includes(role) && location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* only public navbar */}
      {!isAdminRoute && <Navbar />}

      <main
        className={`flex-grow ${
          !isUserDashboard && !isAdminRoute ? "pt-16" : ""
        }`}
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/activate" element={<AccountActivationPage />} />
          {/* Quizzes & Leaderboard */}
          <Route path="/quizzes" element={<QuizExplorerPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/quiz/:quizId/start" element={<QuizStartPage />} />
          <Route
            path="/quiz/:quizId/result/:attemptId"
            element={<QuizResultPage />}
          />
          <Route
            path="/account-activation-info"
            element={<AccountActivationInfo />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/quizzes" element={<QuizLandingPage />} />
          {/* … other public quiz routes … */}

          {/* User Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="quizzes" element={<Uquiz />} />

          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}
          >
            <Route path="" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboardHome />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/new" element={<UserForm />} />
              <Route path="users/:id" element={<UserDetails />} />
              {/* … other admin sub-routes … */}
              <Route path="quizzes" element={<AdminQuizPanel />} />
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
              <Route path="categories/:id/topics" element={<CategoryTopicsPage />} />
              <Route path="topics" element={<TopicsPage />} />
              <Route path="topics/new" element={<TopicForm />} />
              <Route path="topics/:id/edit" element={<TopicForm />} />
              <Route path="topics/:topicId/subtopics" element={<SubTopicsPage />} />
              <Route path="topics/:topicId/subtopics/new" element={<SubTopicForm />} />
              <Route path="topics/:topicId/subtopics/:subtopicId/edit" element={<SubTopicForm />} />
              <Route path="topics/:topicId/subtopics/bulk-upload" element={<SubTopicBulkUploadPage />} />
              <Route path="roles/new" element={<RoleForm />} />
              <Route path="roles/:id/edit" element={<RoleForm />} />
              <Route path="users/new" element={<UserForm />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="users/:id/edit" element={<UserForm />} />
              <Route path="users/:id/history" element={<UserHistoryPage />} />
              <Route path="quizzes" element={<AdminQuizPanel />} />
              <Route path="quizzes/create" element={<CreateQuizForm />} />
              <Route path="quizzes/:quizId/edit" element={<EditQuizPage />} />
              <Route path="blogs" element={<AdminBlogListPage />} />
              <Route path="tutorials" element={<AdminTutorialsPage />} />
              <Route path="blogs/new" element={<AdminBlogEditPage />} />
              <Route path="blogs/:blogId" element={<AdminBlogEditPage />} />
              <Route path="blogs/review/:blogId" element={<AdminBlogReviewEditPage />} />
              <Route path="jobs" element={<AdminJobsPage />} />
              <Route path="seo-manager" element={<SeoManager />} />
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

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* only public footer */}
      {!isUserDashboard && !isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInitializer>
          <LayoutWrapper />
        </AppInitializer>
      </AuthProvider>
    </ThemeProvider>
  );
}

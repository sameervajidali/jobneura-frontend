// src/LayoutWrapper.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ADMIN_ROLES } from './constants/roles';

// Import all pages and layouts
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import QuizLandingPage from './pages/QuizLandingPage';
import AccountActivationPage from './pages/AccountActivation';
import AccountActivationInfo from './pages/AccountActivationInfo';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LoginPageWrapper from './pages/LoginPageWrapper';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Profile from './pages/Profile';
import ChangePassword from './components/profile/ChangePassword';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AdminUsersPage from './pages/admin/Users';
// ...other admin page imports

export default function LayoutWrapper() {
  const { user } = useAuth();
  const location = useLocation();
  const rawRoleName = user?.role?.name;
  const role = typeof rawRoleName === 'string' ? rawRoleName.toUpperCase() : '';
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdmin = ADMIN_ROLES.includes(role) && location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className={`flex-grow ${!isDashboard && !isAdmin ? 'pt-16' : ''}`}>        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* ...other public routes... */}
          <Route path="/login" element={<LoginPageWrapper />} />

          {/* User Dashboard */}
          <Route path="/dashboard/*" element={<ProtectedRoute allowedRoles={[]} />}>                
            <Route index element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
            <Route path="profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            <Route path="change-password" element={<DashboardLayout><ChangePassword /></DashboardLayout>} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin/*" element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}>                
            <Route index element={<AdminDashboardLayout><AdminDashboardHome /></AdminDashboardLayout>} />
            <Route path="users" element={<AdminDashboardLayout><AdminUsersPage /></AdminDashboardLayout>} />
            {/* ...other admin routes... */}
          </Route>

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDashboard && !isAdmin && <Footer />}
    </div>
  );
}

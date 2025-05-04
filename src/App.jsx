// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // Pages
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
// import ChangePassword from './components/profile/ChangePassword';
// import AboutPage from "./pages/AboutPage.jsx";
// import TermsPage from "./pages/TermsPage.jsx";
// import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
// import HelpCenterPage from "./pages/HelpCenterPage.jsx";
// import ContactPage from "./pages/ContactPage.jsx";
// import FeaturesPage from "./pages/FeaturesPage.jsx";
// import PricingPage from "./pages/PricingPage.jsx";
// import QuizLandingPage from "./pages/QuizLandingPage.jsx";
// import AccountActivationPage from "./pages/AccountActivation.jsx";
// import AccountActivationInfo from "./pages/AccountActivationInfo.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";
// import Profile from "./pages/Profile";
// import DashboardHome from "./pages/DashboardHome";
// import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// // Admin Pages
// import AdminDashboardLayout from "./layouts/AdminDashboard.jsx";
// import AdminDashboardHome from "./pages/admin/AdminDashboardHome.jsx";

// // Layouts
// import DashboardLayout from "./layouts/DashboardLayout.jsx";
// import Navbar from "./components/layouts/Navbar.jsx";
// import Footer from "./components/layouts/Footer.jsx";

// // Route guards
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { ADMIN_ROLES } from "./constants/roles.js";

// // Context
// import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
// import { ThemeProvider } from "./contexts/ThemeContext.jsx";

// function AppInitializer({ children }) {
//   const { loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">Loading session…</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

// function LayoutWrapper() {
//   const location = useLocation();
//   const isDashboard = location.pathname.startsWith("/dashboard");

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />

//       <div className={`flex-grow ${!isDashboard ? "pt-16" : ""}`}>
//         <Routes>
//           {/* Public */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/terms" element={<TermsPage />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//           <Route path="/help" element={<HelpCenterPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/features" element={<FeaturesPage />} />
//           <Route path="/pricing" element={<PricingPage />} />
//           <Route path="/quizzes" element={<QuizLandingPage />} />
//           <Route path="/activate" element={<AccountActivationPage />} />
//           <Route path="/account-activation-info" element={<AccountActivationInfo />} />
//           <Route path="/reset-password" element={<ResetPasswordPage />} />

//           {/* Dashboard */}
//           <Route path="/dashboard" element={<DashboardLayout />}>
//             <Route index element={<DashboardHome />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="change-password" element={<ChangePassword />} />
//           </Route>

//           {/* Admin Dashboard */}
//           <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}>
//             <Route path="/admin" element={<AdminDashboardLayout />}>
//               <Route index element={<AdminDashboardHome />} />
//             </Route>
//           </Route>

//           {/* Any authenticated user fallback */}
//           <Route element={<PrivateRoute />}>
//             <Route path="/dashboard/*" element={<DashboardLayout />} />
//           </Route>

//           {/* 404 */}
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </div>

//       {!isDashboard && <Footer />}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Router>
//           <AppInitializer>
//             <LayoutWrapper />
//           </AppInitializer>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ChangePassword from "./components/profile/ChangePassword";
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
import Profile from "./pages/Profile";
import DashboardHome from "./pages/DashboardHome";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// Admin Pages
import AdminDashboardLayout from "./layouts/AdminDashboard.jsx";
import AdminDashboardHome from "./pages/admin/AdminDashboardHome.jsx";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";

// Route guards
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ADMIN_ROLES } from "./constants/roles.js";

// Context
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function AppInitializer({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading session…</p>
      </div>
    );
  }

  return <>{children}</>;
}

function LayoutWrapper() {
  const { user } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin =
    location.pathname.startsWith("/admin") &&
    user &&
    ADMIN_ROLES.includes(user.role);

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
          <Route
            path="/account-activation-info"
            element={<AccountActivationInfo />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* Admin Dashboard */}
          <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}>
            <Route path="/admin/*" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboardHome />} />
            </Route>
          </Route>

          {/* Any authenticated user fallback */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* 404 */}
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

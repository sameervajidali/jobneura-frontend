// src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/axios";
import AuthLayout from "../components/auth/AuthLayout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      setType("error");
      setMessage("Invalid or expired token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 8) {
      return setMessage("Password must be at least 8 characters.");
    }
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    setSubmitting(true);
    setMessage(null);
    setType("");

    try {
      await API.post("/auth/reset-password", { token, password });


      setType("success");
      setMessage("✅ Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setType("error");
      setMessage(err.response?.data?.message || "❌ Failed to reset password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-extrabold text-indigo-600 text-center mb-1">
        JobNeura
      </h1>
      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
        Reset Your Password
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Choose a new password below.
      </p>

      {message && (
        <div className={`text-sm text-center mb-4 px-4 py-2 rounded ${
          type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:shadow-md hover:scale-[1.02] transition duration-200"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}

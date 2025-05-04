// src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import API from "../services/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
  
    console.log("📤 Submitting password reset request for:", email);
  
    try {
      const res = await API.post("/auth/request-password-reset", { email });
      console.log("✅ Backend responded:", res.data);
  
      setStatus({ type: "success", message: "✅ Reset link sent. Check your email." });
    } catch (err) {
      console.log("❌ Error during password reset:", err);
      setStatus({
        type: "error",
        message: err.response?.data?.message || "❌ Failed to send reset link.",
      });
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
        Forgot Password?
      </h2>

      <p className="text-sm text-center text-gray-500 mb-6">
        Enter your email and we’ll send you a secure link to reset your password.
      </p>

      {status && (
        <div
          className={`text-sm text-center mb-4 px-4 py-2 rounded ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:shadow-md hover:scale-[1.02] transition duration-200 disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-xs text-center text-gray-500 mt-4">
        Remembered? {" "}
        <Link
          to="/login"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
}

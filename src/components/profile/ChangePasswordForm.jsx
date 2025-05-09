// ChangePassword.jsx
// This component allows users to change their password. It includes fields for the current password, new password, and confirmation of the new password. It also provides feedback on password strength and whether the new passwords match.
import React, { useState } from "react";
import API from "../../services/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { useEffect } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasPassword, setHasPassword] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setHasPassword(data.hasPassword);
      } catch (err) {
        console.error("Failed to fetch user info");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasPassword && !currentPassword) {
      setType("error");
      return setMessage("Please enter your current password.");
    }
    

    setLoading(true);
    setMessage(null);

    try {
      await API.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      setType("success");
      setMessage("✅ Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setType("error");
      setMessage(
        err.response?.data?.message || "❌ Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 4:
        return { label: "Strong", color: "bg-green-500" };
      case 3:
        return { label: "Medium", color: "bg-yellow-500" };
      case 2:
        return { label: "Weak", color: "bg-orange-400" };
      default:
        return { label: "Very Weak", color: "bg-red-500" };
    }
  };

  const { label: strengthLabel, color: strengthColor } =
    getPasswordStrength(newPassword);

  const inputWrapper = "relative";
  const inputBase =
    "w-full pr-12 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const iconBase =
    "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        {/* Current Password */}
        {hasPassword && (
          <div className={inputWrapper}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={inputBase}
            />
            <div
              className={iconBase}
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        )}

        {/* New Password */}
        <div className={inputWrapper}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={inputBase}
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer z-10"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </div>
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 group">
              <FiInfo className="text-gray-400 cursor-pointer" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                Password must be at least 8 characters, include 1 uppercase, 1
                number, and 1 special character.
              </div>
            </div>
          </div>

          {newPassword.length > 0 && (
            <>
              <ul className="mt-2 text-sm space-y-1 text-gray-600">
                <li className={newPassword.length >= 8 ? "text-green-600" : ""}>
                  {newPassword.length >= 8 ? "✓" : "✗"} Minimum 8 characters
                </li>
                <li
                  className={/[A-Z]/.test(newPassword) ? "text-green-600" : ""}
                >
                  {/[A-Z]/.test(newPassword) ? "✓" : "✗"} At least one uppercase
                  letter
                </li>
                <li
                  className={/[0-9]/.test(newPassword) ? "text-green-600" : ""}
                >
                  {/[0-9]/.test(newPassword) ? "✓" : "✗"} At least one number
                </li>
                <li
                  className={
                    /[^A-Za-z0-9]/.test(newPassword) ? "text-green-600" : ""
                  }
                >
                  {/[^A-Za-z0-9]/.test(newPassword) ? "✓" : "✗"} At least one
                  special character
                </li>
              </ul>
              <div className="mt-3">
                <div className="text-xs text-gray-600 mb-1">
                  Strength: {strengthLabel}
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${strengthColor}`}
                    style={{
                      width: `${
                        strengthLabel === "Strong"
                          ? 100
                          : strengthLabel === "Medium"
                          ? 75
                          : strengthLabel === "Weak"
                          ? 50
                          : 25
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Confirm Password */}
        <div className={inputWrapper}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={inputBase}
            />
            <div
              className={iconBase}
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-sm ${
                confirmPassword === newPassword
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {confirmPassword === newPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

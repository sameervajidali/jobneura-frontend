import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AccountActivationPage() {
  const [status, setStatus] = useState("loading");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    axios
      .get(`/auth/activate-account?token=${token}`, { withCredentials: true })
      .then(() => {
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        console.error("Activation error:", err.response?.data || err.message);
        setStatus("error");
      });
  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-md w-full">
        {status === "loading" && (
          <>
            <h2 className="text-indigo-600 text-xl font-semibold mb-2">
              Activating your account...
            </h2>
            <p className="text-gray-500">Please wait</p>
          </>
        )}
        {status === "success" && (
          <>
            <h2 className="text-green-600 text-xl font-bold mb-2">✅ Account Activated</h2>
            <p className="text-gray-600">Redirecting to login...</p>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-red-600 text-xl font-bold mb-2">❌ Activation Failed</h2>
            <p className="text-gray-600 mb-4">
              The activation link is invalid or expired.
            </p>
            <button
              onClick={() => navigate("/resend-activation")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Resend Activation Link
            </button>
          </>
        )}
      </div>
    </div>
  );
}

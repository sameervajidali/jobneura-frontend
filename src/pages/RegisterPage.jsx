// src/pages/RegisterPage.jsx
import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;

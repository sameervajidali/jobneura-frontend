// src/pages/admin/ChangePasswordPage.jsx
import React from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import ChangePasswordForm from '../../components/profile/ChangePasswordForm';

export default function ChangePasswordPage() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-lg">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <ChangePasswordForm />
      </div>
    </AdminDashboardLayout>
  );
}

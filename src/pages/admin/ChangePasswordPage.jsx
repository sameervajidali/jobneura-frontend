import React from 'react'
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout'
import ChangePasswordForm from '../../components/profile/ChangePasswordForm'

export default function ChangePasswordPage() {
  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        <ChangePasswordForm />
      </div>
    </AdminDashboardLayout>
  )
}

// src/pages/admin/ChangePasswordPage.jsx
import React from 'react'
import ChangePasswordForm from '../../components/profile/ChangePasswordForm'

export default function ChangePasswordPage() {
  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Page title & subtitle */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900">Change Password</h1>
        <p className="text-sm text-gray-500">Secure your account by updating your password</p>
      </div>

      {/* The form itself */}
      <ChangePasswordForm />
    </div>
  )
}

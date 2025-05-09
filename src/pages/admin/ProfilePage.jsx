// src/pages/admin/ProfilePage.jsx
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import API from '../../services/axios'
import ProfileForm from '../../components/profile/ProfileForm'

export default function ProfilePage() {
  const { user, login } = useAuth()

  // after updating profile, re‐fetch fresh user
  const handleRefresh = async () => {
    try {
      const { data } = await API.get('/auth/me')
      login(data.user)
    } catch (err) {
      console.error('Refresh failed', err)
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Page title & breadcrumb */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Profile</h1>
        <p className="text-sm text-gray-500">Update your personal information and avatar</p>
      </div>

      {/* The actual form */}
      <ProfileForm user={user} onRefresh={handleRefresh} />
    </div>
  )
}

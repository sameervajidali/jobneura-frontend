import React from 'react'
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout'
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
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
        <ProfileForm user={user} onRefresh={handleRefresh} />
      </div>
    </AdminDashboardLayout>
  )
}

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
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
      <ProfileForm user={user} onRefresh={handleRefresh} />
    </>
  )
}

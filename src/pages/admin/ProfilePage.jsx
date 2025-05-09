// src/pages/admin/ProfilePage.jsx
import React from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboard';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../services/axios';
import ProfileForm from '../../components/profile/ProfileForm';

export default function ProfilePage() {
  const { user, login } = useAuth();

  // after a successful update in the form we'll re-fetch the fresh user
  const handleRefresh = async () => {
    try {
      const { data } = await API.get('/auth/me');
      login(data.user);
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Admin Profile</h1>
        <ProfileForm user={user} onRefresh={handleRefresh} />
      </div>
    </AdminDashboardLayout>
  );
}

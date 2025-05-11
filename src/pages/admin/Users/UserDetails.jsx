// src/pages/admin/Users/UserDetails.jsx
import React, { useEffect, useState } from 'react';
import UserDetailsCard from '../../../components/admin/UserDetailsCard.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../../services/userService';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError('');
      try {
        const data = await getUserById(id);
        // API might return { user: {...} } or just {...}
        const u = data.user ?? data;
        setUser(u);
      } catch (err) {
        console.error('Failed to load user:', err);
        setError('Could not load user details.');
        // redirect back to list after a brief pause
        setTimeout(() => navigate('/admin/users'), 1500);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id, navigate]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading…</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 underline mb-6"
      >
        ← Back to users
      </button>

      <UserDetailsCard user={user} />
    </div>
  );
}

// src/pages/admin/UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../services/axios';
import { FaArrowLeft } from 'react-icons/fa';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/admin/users/${id}`);
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6">Loading user details...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-600 hover:underline flex items-center gap-1"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">User Details</h2>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <strong>Name:</strong> <span>{user.name}</span>
        </div>
        <div>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div>
          <strong>Role:</strong> <span>{user.role}</span>
        </div>
        <div>
          <strong>Status:</strong> <span>{user.active ? 'Active' : 'Inactive'}</span>
        </div>
        <div>
          <strong>Created:</strong> <span>{new Date(user.createdAt).toLocaleString()}</span>
        </div>
        <div>
          <strong>Updated:</strong> <span>{new Date(user.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

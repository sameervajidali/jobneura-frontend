
// src/pages/admin/UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }      from 'react-router-dom';
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import API from '../../../services/axios';

export default function UserDetails() {
  const { id }     = useParams();      // grabs :id from /admin/users/:id
  const navigate   = useNavigate();

  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    API.get(`/admin/users/${id}`)
      .then(res => {
        // if your backend nests under data.user
        const u = res.data.user ?? res.data;
        setUser(u);
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-600">Loading user…</p>;
  if (error)   return <p className="text-red-600">{error}</p>;
  if (!user)   return <p className="text-gray-600">No user found.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Users
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">User Details</h2>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-100 shadow-md">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">
              <FaUser className="inline mr-2 text-indigo-500" />
              {user.name}
            </p>
            <p className="text-sm text-gray-600">
              <FaEnvelope className="inline mr-2 text-indigo-500" />
              {user.email}
            </p>
            {user.phone && (
              <p className="text-sm text-gray-600">
                <FaPhone className="inline mr-2 text-indigo-500" />
                {user.phone}
              </p>
            )}
            {user.location && (
              <p className="text-sm text-gray-600">
                <FaMapMarkerAlt className="inline mr-2 text-indigo-500" />
                {user.location}
              </p>
            )}
          </div>
        </div>

        {user.bio && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{user.bio}</p>
          </div>
        )}

        {user.role && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Role</h3>
            <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
              {user.role.toUpperCase()}
            </span>
          </div>
        )}

        {/* add extra fields (skills, languages, etc.) here as needed */}
      </div>
    </div>
  );
}

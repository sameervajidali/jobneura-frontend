// src/components/AdminNavbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ADMIN_ROLES, 
  MODERATOR_ROLES, 
  SUPPORT_ROLES, 
  CREATOR_ROLES 
} from '../constants/roles';

export function AdminNavbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <NavLink to="/admin" className="text-white hover:underline">
          Dashboard
        </NavLink>
        {MODERATOR_ROLES.includes(user.role) && (
          <NavLink to="/admin/moderation" className="text-white hover:underline">
            Moderation
          </NavLink>
        )}
        {CREATOR_ROLES.includes(user.role) && (
          <NavLink to="/admin/creators" className="text-white hover:underline">
            Creators
          </NavLink>
        )}
        {SUPPORT_ROLES.includes(user.role) && (
          <NavLink to="/admin/support" className="text-white hover:underline">
            Support Tickets
          </NavLink>
        )}
        {ADMIN_ROLES.includes(user.role) && (
          <NavLink to="/admin/users" className="text-white hover:underline">
            User Management
          </NavLink>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-200">{user.name}</span>
        <button
          onClick={logout}
          className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

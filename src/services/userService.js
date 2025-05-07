// src/services/userService.js
import API from './axios.js';

/**
 * User Management API
 */

/**
 * Fetch all users (admin only)
 * GET /admin/users
 * Supports optional pagination wrapper: { total, page, limit, users: [] }
 */
export function getAllUsers() {
  return API.get('/admin/users').then(res => {
    const data = res.data;
    // If response is { users: [...] }, unwrap it
    if (data.users && Array.isArray(data.users)) {
      return data.users;
    }
    // If response is already an array
    if (Array.isArray(data)) {
      return data;
    }
    // Otherwise return empty list
    return [];
  });
}

/**
 * Fetch a single user by ID (admin only)
 * GET /admin/users/:userId
 */
export function getUserById(userId) {
  return API.get(`/admin/users/${userId}`)
    .then(res => res.data);
}

/**
 * Create a new user (admin only)
 * POST /admin/users
 */
export function createUser(payload) {
  return API.post('/admin/users', payload)
    .then(res => res.data);
}

/**
 * Update an existing user (admin only)
 * PATCH /admin/users/:userId
 */
export function updateUser(userId, payload) {
  return API.patch(`/admin/users/${userId}`, payload)
    .then(res => res.data);
}

/**
 * Delete a user (admin only)
 * DELETE /admin/users/:userId
 */
export function deleteUser(userId) {
  return API.delete(`/admin/users/${userId}`)
    .then(res => res.data);
}

// Default export for convenience
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

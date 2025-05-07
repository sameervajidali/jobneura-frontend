import API from './axios.js';

/**
 * User Management API
 */

/**
 * Fetch all users (admin only)
 * GET /admin/users
 */
/** Fetch all users (admin only) */
export function getAllUsers() {
    return API.get('/admin/users')
      .then(res => {
        const data = res.data;
        // if paginated, unwrap
        if (data.users && Array.isArray(data.users)) {
          return data.users;
        }
        return Array.isArray(data) ? data : [];
      });
  }
  

/**
 * Fetch a single user by ID (admin only)
 * GET /admin/users/:userId
 * @param {string} userId
 */
export function getUserById(userId) {
  return API.get(`/admin/users/${userId}`).then(res => res.data);
}

/**
 * Create a new user (admin only)
 * POST /admin/users
 * @param {Object} payload { name, email, role, password, ... }
 */
export function createUser(payload) {
  return API.post('/admin/users', payload).then(res => res.data);
}

/**
 * Update an existing user (admin only)
 * PATCH /admin/users/:userId
 * @param {string} userId
 * @param {Object} payload fields to update
 */
export function updateUser(userId, payload) {
  return API.patch(`/admin/users/${userId}`, payload).then(res => res.data);
}

/**
 * Delete a user (admin only)
 * DELETE /admin/users/:userId
 * @param {string} userId
 */
export function deleteUser(userId) {
  return API.delete(`/admin/users/${userId}`).then(res => res.data);
}

// Default export for convenience
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

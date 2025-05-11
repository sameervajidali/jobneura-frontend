// // src/services/userService.js
// import API from './axios.js';

// /**
//  * User Management API
//  */

// /**
//  * Fetch all users (admin only)
//  * GET /admin/users
//  * Supports optional pagination wrapper: { total, page, limit, users: [] }
//  */
// export function getAllUsers() {
//   return API.get('/admin/users').then(res => {
//     const data = res.data;
//     // If response is { users: [...] }, unwrap it
//     if (data.users && Array.isArray(data.users)) {
//       return data.users;
//     }
//     // If response is already an array
//     if (Array.isArray(data)) {
//       return data;
//     }
//     // Otherwise return empty list
//     return [];
//   });
// }

// /**
//  * Fetch a single user by ID (admin only)
//  * GET /admin/users/:userId
//  */
// export function getUserById(userId) {
//   return API.get(`/admin/users/${userId}`)
//     .then(res => res.data);
// }

// /**
//  * Create a new user (admin only)
//  * POST /admin/users
//  */
// export function createUser(payload) {
//   return API.post('/admin/users', payload)
//     .then(res => res.data);
// }

// /**
//  * Update an existing user (admin only)
//  * PATCH /admin/users/:userId
//  */
// export function updateUser(userId, payload) {
//   return API.patch(`/admin/users/${userId}`, payload)
//     .then(res => res.data);
// }

// /**
//  * Delete a user (admin only)
//  * DELETE /admin/users/:userId
//  */
// export function deleteUser(userId) {
//   return API.delete(`/admin/users/${userId}`)
//     .then(res => res.data);
// }

// export function getUserHistory(userId) {
//   return API.get(`/admin/users/${userId}/history`)
//     .then(res => ({
//       user: res.data.user,
//       attempts: res.data.attempts || [],
//       loginHistory: res.data.loginHistory || [],
//     }));
// }




// // Default export for convenience
// export default {
//   getAllUsers,
//   getUserHistory,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser
// };


// src/services/userService.js
import API from './axios.js';

/**
 * User Management API
 */

/**
 * Fetch all end-users (USER role)
 * GET /admin/users
 * Returns: Array of user objects
 */
export function getAllUsers() {
  return API.get('/admin/users')
    .then(res => Array.isArray(res.data) ? res.data : (res.data.users || []));
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
 * PUT /admin/users/:userId
 */
export function updateUser(userId, payload) {
  return API.put(`/admin/users/${userId}`, payload)
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

/**
 * Get a specific user's history (admin only)
 * GET /admin/users/:userId/history
 */
export function getUserHistory(userId) {
  return API.get(`/admin/users/${userId}/history`)
    .then(res => ({
      user: res.data.user,
      attempts: res.data.attempts || [],
      loginHistory: res.data.loginHistory || []
    }));
}

/**
 * Role Management API
 */

/**
 * Fetch all roles (SUPERADMIN only)
 * GET /admin/roles
 * Returns: Array of role objects
 */
export function getAllRoles() {
  return API.get('/admin/roles')
    .then(res => Array.isArray(res.data) ? res.data : (res.data.roles || []));
}

/**
 * Fetch a single role by ID (SUPERADMIN only)
 * GET /admin/roles/:roleId
 */
export function getRoleById(roleId) {
  return API.get(`/admin/roles/${roleId}`)
    .then(res => res.data);
}

/**
 * Create a new role (SUPERADMIN only)
 * POST /admin/roles
 */
export function createRole(payload) {
  return API.post('/admin/roles', payload)
    .then(res => res.data);
}

/**
 * Update an existing role (SUPERADMIN only)
 * PUT /admin/roles/:roleId
 */
export function updateRole(roleId, payload) {
  return API.put(`/admin/roles/${roleId}`, payload)
    .then(res => res.data);
}

/**
 * Delete a role (SUPERADMIN only)
 * DELETE /admin/roles/:roleId
 */
export function deleteRole(roleId) {
  return API.delete(`/admin/roles/${roleId}`)
    .then(res => res.data);
}

// Default export
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserHistory,
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};

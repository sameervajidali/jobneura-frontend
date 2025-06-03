// src/services/tutorialsService.js

import API from './axios'; // Axios instance with session-based authentication

/**
 * Get all public tutorials
 */
export function getPublicTutorials() {
  return API.get('/tutorials').then(res => res.data);
}

/**
 * Get a tutorial by ID
 */
export function getTutorialById(tutorialId) {
  return API.get(`/tutorials/${tutorialId}`).then(res => res.data);
}

/**
 * Get all tutorial categories
 */
export function getTutorialCategories() {
  return API.get('/tutorials/categories').then(res => res.data);
}

/**
 * Create a new tutorial (Admin/Creator)
 */
export function createTutorial(tutorialData) {
  return API.post('/admin/tutorials', tutorialData).then(res => res.data);
}

/**
 * Update an existing tutorial (Admin/Creator)
 */
export function updateTutorial(tutorialId, updateData) {
  return API.patch(`/admin/tutorials/${tutorialId}`, updateData).then(res => res.data);
}

/**
 * Delete a tutorial (Admin/Creator)
 */
export function deleteTutorial(tutorialId) {
  return API.delete(`/admin/tutorials/${tutorialId}`).then(res => res.data);
}

/**
 * Bulk update tutorials (Admin/Creator)
 */
export function bulkUpdateTutorials(updateArray) {
  return API.patch('/admin/tutorials/bulk-update', updateArray).then(res => res.data);
}

/**
 * Create a tutorial category (Admin)
 */
export function createTutorialCategory(categoryData) {
  return API.post('/admin/tutorial-categories', categoryData).then(res => res.data);
}

/**
 * Update a tutorial category (Admin)
 */
export function updateTutorialCategory(categoryId, updateData) {
  return API.patch(`/admin/tutorial-categories/${categoryId}`, updateData).then(res => res.data);
}

/**
 * Delete a tutorial category (Admin)
 */
export function deleteTutorialCategory(categoryId) {
  return API.delete(`/admin/tutorial-categories/${categoryId}`).then(res => res.data);
}

// ──────────────────────────────────────────────
// Export all as default for easy import
const tutorialsService = {
  getPublicTutorials,
  getTutorialById,
  getTutorialCategories,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  bulkUpdateTutorials,
  createTutorialCategory,
  updateTutorialCategory,
  deleteTutorialCategory,
};

export default tutorialsService;

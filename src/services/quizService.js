// // src/services/quizService.js
// import API from './axios';       // your preconfigured axios instance

// export const getAllQuizzes = () =>
//   API.get('/quizzes/admin/quizzes').then(res => res.data);

// export const createQuiz = payload =>
//   API.post('/quizzes/admin/quizzes', payload).then(res => res.data);

// export const getQuizById = quizId =>
//   API.get(`/quizzes/admin/quizzes/${quizId}`).then(res => res.data);

// export const updateQuiz = (quizId, payload) =>
//   API.patch(`/quizzes/admin/quizzes/${quizId}`, payload).then(res => res.data);

// export const bulkUploadQuestions = (quizId, questions) =>
//   API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions })
//      .then(res => res.data);

// // (…and similarly for bulkUploadFromFile if you want)


// src/services/quizService.js
import API from './axios.js';

/**
 * Quiz Management API
 */

// ─── Quiz CRUD ──────────────────────────────────────────────────────────────
/**
 * Fetch all quizzes (admin only)
 * GET /quizzes/admin/quizzes
 */

console.log(API)
export function getAllQuizzes() {
  return API.get('/quizzes/admin/quizzes').then(res => res.data);
}

/**
 * Create a new quiz (admin only)
 * POST /quizzes/admin/quizzes
 * @param {Object} payload { title, category, topic, level, duration, totalMarks, isActive }
 */
export function createQuiz(payload) {
  return API.post('/quizzes/admin/quizzes', payload)
    .then(res => res.data);
}

/**
 * Get a quiz by ID (admin only)
 * GET /quizzes/admin/quizzes/:quizId
 * @param {string} quizId
 */
export function getQuizById(quizId) {
  return API.get(`/quizzes/admin/quizzes/${quizId}`)
    .then(res => res.data);
}

/**
 * Update a quiz (admin only)
 * PATCH /quizzes/admin/quizzes/:quizId
 * @param {string} quizId
 * @param {Object} payload fields to update
 */
export function updateQuiz(quizId, payload) {
  return API.patch(`/quizzes/admin/quizzes/${quizId}`, payload)
    .then(res => res.data);
}

// ─── Quiz Attempt ───────────────────────────────────────────────────────────
/**
 * Submit a quiz attempt
 * POST /quizzes/submit
 * @param {Object} payload { quizId, timeTaken, answers }
 */
export function submitQuizAttempt(payload) {
  return API.post('/quizzes/submit', payload)
    .then(res => res.data);
}

/**
 * Fetch current user's quiz attempt history
 * GET /quizzes/my-attempts
 */
export function getUserAttempts() {
  return API.get('/quizzes/my-attempts')
    .then(res => res.data);
}

// ─── Leaderboard ────────────────────────────────────────────────────────────
/**
 * Fetch leaderboard entries
 * GET /quizzes/leaderboard?category=&topic=&level=&timePeriod=
 * @param {Object} params { category, topic?, level?, timePeriod? }
 */
export function getLeaderboard(params = {}) {
  return API.get('/quizzes/leaderboard', { params })
    .then(res => res.data);
}

// ─── Bulk Upload Questions ──────────────────────────────────────────────────
/**
 * Bulk upload questions via JSON (admin only)
 * POST /quizzes/admin/quizzes/:quizId/bulk-upload
 * @param {string} quizId
 * @param {Array} questions array of question objects
 */
export function bulkUploadQuestions(quizId, questions) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions })
    .then(res => res.data);
}

/**
 * Bulk upload questions via CSV file (admin only)
 * POST /quizzes/admin/quizzes/:quizId/bulk-upload-file
 * @param {string} quizId
 * @param {File} file CSV/XLSX file object
 */
export function bulkUploadQuestionsFile(quizId, file) {
  const formData = new FormData();
  formData.append('file', file);

  return API.post(
    `/quizzes/admin/quizzes/${quizId}/bulk-upload-file`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ).then(res => res.data);
}



// at bottom of quizService.js

/** Fetch current assignments for a quiz */
// AFTER — correct path under /api/quizzes
// AFTER (correct)
export function getQuizAssignments(quizId) {
  return API.get(`/quizzes/admin/quizzes/${quizId}/assignments`)
    .then(res => {
      const d = res.data;
      return Array.isArray(d)
        ? d
        : Array.isArray(d.assignments)
          ? d.assignments
          : [];
    });
}

export function assignQuiz(quizId, userIds) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/assign`, { userIds })
            .then(res => res.data);
}
export function unassignQuiz(quizId, userId) {
  return API.delete(`/quizzes/admin/quizzes/${quizId}/assign/${userId}`)
            .then(res => res.data);
}

/**
 * Fetch leaderboard entries
 * GET /leaderboard?category=&topic=&level=&timePeriod=
 */
export function getLeaderboard({ category, topic, level, timePeriod = 'all-time' }) {
  return API.get('/leaderboard', {
    params: { category, topic, level, timePeriod }
  }).then(res => res.data);
}



// ─── Export as default for convenience ──────────────────────────────────────
export default {
  getAllQuizzes,
  getQuizAssignments,
  assignQuiz,
  unassignQuiz,
  createQuiz,
  getLeaderboard,
  getQuizById,
  updateQuiz,
  submitQuizAttempt,
  getUserAttempts,
  getLeaderboard,
  bulkUploadQuestions,
  bulkUploadQuestionsFile
};

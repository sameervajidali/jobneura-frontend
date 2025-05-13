// // src/services/quizService.js

// import API from './axios'; // ✅ Axios instance for API calls

// // ─────────────────────────────────────────────────────────────
// // 📦 Quiz CRUD (Admin)
// // ─────────────────────────────────────────────────────────────
// export function getAllQuizzes() {
//   return API.get('/quizzes/admin/quizzes').then(res => res.data);
// }

// export function createQuiz(payload) {
//   return API.post('/quizzes/admin/quizzes', payload).then(res => res.data);
// }

// export function getQuizById(quizId) {
//   return API.get(`/quizzes/admin/quizzes/${quizId}`).then(res => res.data);
// }

// export function updateQuiz(quizId, payload) {
//   return API.patch(`/quizzes/admin/quizzes/${quizId}`, payload).then(res => res.data);
// }

// // ─────────────────────────────────────────────────────────────
// // 📝 Quiz Attempts (User)
// // ─────────────────────────────────────────────────────────────
// export function submitQuizAttempt(payload) {
//   return API.post('/quizzes/submit', payload).then(res => res.data);
// }

// export function getUserAttempts() {
//   return API.get('/quizzes/my-attempts').then(res => res.data);
// }

// // ─────────────────────────────────────────────────────────────
// // 🏆 Leaderboard (Public)
// // ─────────────────────────────────────────────────────────────
// export function getLeaderboard(params = {}) {
//   return API.get('/quizzes/leaderboard', { params }).then(res => {
//     const d = res.data;
//     console.log("📊 Raw leaderboard response:", d);
//     return {
//       items: Array.isArray(d.items) ? d.items : [],
//       total: typeof d.total === 'number' ? d.total : 0,
//     };
//   });
// }

// // ─────────────────────────────────────────────────────────────
// // 📤 Bulk Upload: Questions (Admin)
// // ─────────────────────────────────────────────────────────────
// export function bulkUploadQuestions(quizId, questions) {
//   return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions })
//     .then(res => res.data);
// }

// export function bulkUploadQuestionsFile(quizId, file) {
//   const formData = new FormData();
//   formData.append('file', file);
//   return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload-file`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }).then(res => res.data);
// }

// // ─────────────────────────────────────────────────────────────
// // 👥 Quiz Assignments (Admin)
// // ─────────────────────────────────────────────────────────────
// export function getQuizAssignments(quizId) {
//   return API.get(`/quizzes/admin/quizzes/${quizId}/assignments`).then(res => {
//     const d = res.data;
//     return Array.isArray(d) ? d : (Array.isArray(d.assignments) ? d.assignments : []);
//   });
// }

// export function assignQuiz(quizId, userIds) {
//   return API.post(`/quizzes/admin/quizzes/${quizId}/assign`, { userIds })
//     .then(res => res.data);
// }

// export function unassignQuiz(quizId, userId) {
//   return API.delete(`/quizzes/admin/quizzes/${quizId}/assign/${userId}`)
//     .then(res => res.data);
// }

// // ─────────────────────────────────────────────────────────────
// // 🌍 Public Quiz Listings
// // ─────────────────────────────────────────────────────────────
// export function getQuizzes(params = {}) {
//   return API.get('/quizzes', { params }).then(res => {
//     return Array.isArray(res.data.quizzes)
//       ? res.data.quizzes
//       : (Array.isArray(res.data) ? res.data : []);
//   });
// }

// // ─────────────────────────────────────────────────────────────
// // 📊 Attempt Details & Stats
// // ─────────────────────────────────────────────────────────────
// export function getAttemptById(attemptId) {
//   return API.get(`/quizzes/attempts/${attemptId}`).then(res => res.data);
// }

// export function getAttemptStats(attemptId) {
//   return API.get(`/quizzes/attempts/${attemptId}/stats`).then(res => res.data);
// }

// export function getQuizTopThree(quizId, timePeriod = 'week') {
//   return API.get(`/quizzes/${quizId}/top-three`, { params: { timePeriod } })
//     .then(res => res.data);
// }

// // ─────────────────────────────────────────────────────────────
// // 📥 Bulk Upload: Quizzes File (Admin)
// // ─────────────────────────────────────────────────────────────
// export function bulkUploadQuizzes(file) {
//   const formData = new FormData();
//   formData.append('file', file);

//   return API.post('/quizzes/admin/quizzes/bulk-upload-file', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }).then(res => res.data);
// }

// // ─────────────────────────────────────────────────────────────
// // 📂 Sidebar Filters & Topic Grouping (Public)
// // ─────────────────────────────────────────────────────────────
// export const fetchSidebarFilters = async () => {
//   const [categories, levels] = await Promise.all([
//     API.get('/quizzes/distinct/category'),
//     API.get('/quizzes/distinct/level')
//   ]);
//   return {
//     categories: categories.data,
//     levels: levels.data,
//   };
// };

// export const fetchGroupedTopics = async () => {
//   const res = await API.get('/quizzes/grouped-topics');
//   return res.data; // [{ category: 'Programming', topics: [...] }, ...]
// };

// export const fetchDistinctTopics = async () => {
//   const res = await API.get('/quizzes/distinct/topic');
//   return res.data; // ["Java", "Python", ...]
// };

// // ─────────────────────────────────────────────────────────────
// // 🌐 Export All As Default Service
// // ─────────────────────────────────────────────────────────────
// const quizService = {
//   getAllQuizzes,
//   bulkUploadQuizzes,
//   createQuiz,
//   getQuizById,
//   fetchSidebarFilters,
//   fetchGroupedTopics,
//   fetchDistinctTopics,
//   updateQuiz,
//   submitQuizAttempt,
//   getUserAttempts,
//   getLeaderboard,
//   bulkUploadQuestions,
//   bulkUploadQuestionsFile,
//   getQuizAssignments,
//   assignQuiz,
//   unassignQuiz,
//   getQuizzes,
//   getAttemptById,
//   getAttemptStats,
//   getQuizTopThree,
// };

// export default quizService;




// src/services/quizService.js
import API from './axios'; // Axios instance, baseURL includes `/api`

// ─────────────────────────────────────────────────────────────
// 📦 Quiz CRUD (Admin)
// Base path: /api/quizzes/admin/quizzes
// ─────────────────────────────────────────────────────────────

/**
 * Fetch all quizzes (Admin view)
 * GET /api/quizzes/admin/quizzes
 */
export function getAllQuizzes() {
  return API.get('/quizzes/admin/quizzes')
    .then(res => res.data);
}

/**
 * Create a new quiz
 * POST /api/quizzes/admin/quizzes
 */
export function createQuiz(payload) {
  return API.post('/quizzes/admin/quizzes', payload)
    .then(res => res.data);
}

/**
 * Fetch a single quiz by ID (Admin view)
 * GET /api/quizzes/admin/quizzes/:quizId
 */
export function getQuizById(quizId) {
  return API.get(`/quizzes/admin/quizzes/${quizId}`)
    .then(res => res.data);
}

/**
 * Update quiz metadata
 * PATCH /api/quizzes/admin/quizzes/:quizId
 */
export function updateQuiz(quizId, payload) {
  return API.patch(`/quizzes/admin/quizzes/${quizId}`, payload)
    .then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📝 Quiz Attempts (User)
// Base path: /api/quizzes/...
// ─────────────────────────────────────────────────────────────

/**
 * Submit a quiz attempt
 * POST /api/quizzes/submit
 */
export function submitQuizAttempt(payload) {
  return API.post('/quizzes/submit', payload)
    .then(res => res.data);
}

/**
 * Get current user's quiz attempts
 * GET /api/quizzes/my-attempts
 */
export function getUserAttempts() {
  return API.get('/quizzes/my-attempts')
    .then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 🏆 Leaderboard (Public)
// Base path: /api/quizzes...
// ─────────────────────────────────────────────────────────────

/**
 * Get global leaderboard
 * GET /api/quizzes/leaderboard
 */
export function getLeaderboard(params = {}) {
  return API.get('/quizzes/leaderboard', { params })
    .then(res => {
      const d = res.data;
     
      return {
        items: Array.isArray(d.items) ? d.items : [],
        total: typeof d.total === 'number' ? d.total : 0,
      };
    });
}

// ─────────────────────────────────────────────────────────────
// 📤 Bulk Upload: Questions (Admin)
// Base paths:
//   JSON: POST /api/quizzes/admin/quizzes/:quizId/bulk-upload
//   File: POST /api/quizzes/admin/quizzes/:quizId/bulk-upload-file
// ─────────────────────────────────────────────────────────────

/**
 * Bulk-upload questions via JSON array
 * POST /api/quizzes/admin/quizzes/:quizId/bulk-upload
 */
export function bulkUploadQuestions(quizId, questions) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions })
    .then(res => res.data);
}

/**
 * Bulk-upload questions via CSV/XLSX file
 * POST /api/quizzes/admin/quizzes/:quizId/bulk-upload-file
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

// ─────────────────────────────────────────────────────────────
// 👥 Quiz Assignments (Admin)
// Base paths: /api/quizzes/admin/quizzes/:quizId/assign...
// ─────────────────────────────────────────────────────────────

/**
 * Get assignments for a quiz
 * GET /api/quizzes/admin/quizzes/:quizId/assignments
 */
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

/**
 * Assign users to a quiz
 * POST /api/quizzes/admin/quizzes/:quizId/assign
 */
export function assignQuiz(quizId, userIds) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/assign`, { userIds })
    .then(res => res.data);
}

/**
 * Unassign a user from a quiz
 * DELETE /api/quizzes/admin/quizzes/:quizId/assign/:userId
 */
export function unassignQuiz(quizId, userId) {
  return API.delete(`/quizzes/admin/quizzes/${quizId}/assign/${userId}`)
    .then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 🌍 Public Quiz Listings
// Base path: /api/quizzes
// ─────────────────────────────────────────────────────────────

/**
 * Get public quizzes (with filters)
 * GET /api/quizzes? …
 */
export function getQuizzes(params = {}) {
  return API.get('/quizzes', { params })
    .then(res => {
      const data = res.data;
      return Array.isArray(data.quizzes)
        ? data.quizzes
        : Array.isArray(data)
          ? data
          : [];
    });
}

// ─────────────────────────────────────────────────────────────
// 📊 Attempt Details & Stats
// Base paths: /api/quizzes/attempts/:attemptId...
// ─────────────────────────────────────────────────────────────

/**
 * Get a specific attempt
 * GET /api/quizzes/attempts/:attemptId
 */
export function getAttemptById(attemptId) {
  return API.get(`/quizzes/attempts/${attemptId}`)
    .then(res => res.data);
}

/**
 * Get stats for an attempt
 * GET /api/quizzes/attempts/:attemptId/stats
 */
export function getAttemptStats(attemptId) {
  return API.get(`/quizzes/attempts/${attemptId}/stats`)
    .then(res => res.data);
}

/**
 * Get top 3 scores for a quiz
 * GET /api/quizzes/:quizId/top-three?timePeriod=week
 */
export function getQuizTopThree(quizId, timePeriod = 'week') {
  return API.get(`/quizzes/${quizId}/top-three`, { params: { timePeriod } })
    .then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📥 Bulk Upload: Quizzes File (Admin)
// Base path: /api/quizzes/admin/quizzes/bulk-upload-file
// ─────────────────────────────────────────────────────────────

/**
 * Bulk-upload multiple quizzes via CSV/XLSX
 * POST /api/quizzes/admin/quizzes/bulk-upload-file
 */
export function bulkUploadQuizzes(file) {
  const formData = new FormData();
  formData.append('file', file);

  return API.post('/quizzes/admin/quizzes/bulk-upload-file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 🌐 Sidebar Filters & Topic Grouping (Public)
// Endpoints: /api/quizzes/distinct/... and /api/quizzes/grouped-topics
// ─────────────────────────────────────────────────────────────


/**
 * Fetch distinct topics (for filtering).
 * This returns an array of unique topics that are not grouped by category.
 * Example: ['Java', 'Python', 'Go', ...]
 */
export const fetchDistinctTopics = async () => {
  try {
    const res = await API.get('/quizzes/distinct/topic');  // Endpoint for distinct topics
    return res.data;  // Example: ["Java", "Python", "Go", ...]
  } catch (error) {
   
    return [];  // Return empty array in case of an error
  }
};



// ── Highlights ───────────────────────────────────────────────────────────
export function fetchJustAdded(limit = 3) {
  return API.get('/quizzes/highlight/just-added', { params: { limit } })
    .then(res => res.data);
}

export function fetchTrending(limit = 5) {
  return API.get('/quizzes/highlight/trending', { params: { limit } })
    .then(res => res.data);
}

export function fetchDailySpotlight() {
  return API.get('/quizzes/highlight/daily-spotlight')
    .then(res => res.data);
}



/**
 * Fetch exactly the 3 arrays your sidebar needs:
 *  - categories: [{ _id, name }, …]
 *  - topics:     [{ _id, name }, …]
 *  - levels:     ['Beginner','…']
 */
// after
// after
// src/services/quizService.js
export const fetchSidebarFilters = async () => {
  const [catsRes, topsRes, lvlsRes] = await Promise.all([
    API.get('/quizzes/distinct/category'),
    API.get('/quizzes/distinct/topic'),
    API.get('/quizzes/distinct/level')
  ]);
  return {
    categories: catsRes.data,  // [{_id,name},…]
    topics:     topsRes.data,  // [{_id,name},…]
    levels:     lvlsRes.data   // ['Beginner','Intermediate',…]
  };
};


/**
 * Fetch grouping of topics under each category:
 *   [{ category: 'Programming', topics: ['JavaScript', …] }, …]
 */
export async function fetchGroupedTopics() {
  const res = await API.get('/quizzes/grouped-topics');
  // expects [{ category: 'Programming', topics: ['JavaScript','Python',…] }, …]
  return res.data;
}



// ─────────────────────────────────────────────────────────────
// Default export of all quiz service functions
// ─────────────────────────────────────────────────────────────
const quizService = {
   fetchSidebarFilters,
  fetchGroupedTopics,
  getAllQuizzes,
  createQuiz,
  getQuizById,
  updateQuiz,
  submitQuizAttempt,
  getUserAttempts,
  getLeaderboard,
  bulkUploadQuestions,
  bulkUploadQuestionsFile,
  getQuizAssignments,
  assignQuiz,
  unassignQuiz,
  getQuizzes,
  getAttemptById,
  getAttemptStats,
  getQuizTopThree,
  bulkUploadQuizzes,
  fetchSidebarFilters,
  fetchGroupedTopics,
  fetchDistinctTopics,
   fetchJustAdded,
  fetchTrending,
  fetchDailySpotlight,
};

export default quizService;

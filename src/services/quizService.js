// // src/services/quizService.js
// import API from './axios';  // no .js, API is your axios instance

// // ─── Quiz CRUD (admin) ─────────────────────────────────────────────────────
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
//   return API
//     .patch(`/quizzes/admin/quizzes/${quizId}`, payload)
//     .then(res => res.data);
// }

// // ─── Quiz Attempts ──────────────────────────────────────────────────────────
// export function submitQuizAttempt(payload) {
//   return API.post('/quizzes/submit', payload).then(res => res.data);
// }

// export function getUserAttempts() {
//   return API.get('/quizzes/my-attempts').then(res => res.data);
// }

// // ─── Leaderboard ────────────────────────────────────────────────────────────
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


// // ─── Bulk‐Upload Questions (admin) ───────────────────────────────────────────
// export function bulkUploadQuestions(quizId, questions) {
//   return API
//     .post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions })
//     .then(res => res.data);
// }

// export function bulkUploadQuestionsFile(quizId, file) {
//   const formData = new FormData();
//   formData.append('file', file);
//   return API
//     .post(
//       `/quizzes/admin/quizzes/${quizId}/bulk-upload-file`,
//       formData,
//       { headers: { 'Content-Type': 'multipart/form-data' } }
//     )
//     .then(res => res.data);
// }

// // ─── Quiz Assignments (admin) ───────────────────────────────────────────────
// export function getQuizAssignments(quizId) {
//   return API
//     .get(`/quizzes/admin/quizzes/${quizId}/assignments`)
//     .then(res => {
//       const d = res.data;
//       return Array.isArray(d)
//         ? d
//         : Array.isArray(d.assignments)
//           ? d.assignments
//           : [];
//     });
// }

// export function assignQuiz(quizId, userIds) {
//   return API
//     .post(`/quizzes/admin/quizzes/${quizId}/assign`, { userIds })
//     .then(res => res.data);
// }

// export function unassignQuiz(quizId, userId) {
//   return API
//     .delete(`/quizzes/admin/quizzes/${quizId}/assign/${userId}`)
//     .then(res => res.data);
// }

// // ─── Public Quiz Listing ────────────────────────────────────────────────────
// export function getQuizzes(params = {}) {
//   return API.get('/quizzes', { params })
//     .then(res => {
//       // if your server returns { quizzes: [...], total: ... }
//       return Array.isArray(res.data.quizzes)
//         ? res.data.quizzes
//         : Array.isArray(res.data)
//           ? res.data
//           : [];
//     });
// }

// // ─── Attempt Details & Stats ────────────────────────────────────────────────
// export function getAttemptById(attemptId) {
//   return API.get(`/quizzes/attempts/${attemptId}`).then(res => res.data);
// }

// export function getAttemptStats(attemptId) {
//   return API.get(`/quizzes/attempts/${attemptId}/stats`).then(res => res.data);
// }

// export function getQuizTopThree(quizId, timePeriod = 'week') {
//   return API
//     .get(`/quizzes/${quizId}/top-three`, { params: { timePeriod } })
//     .then(res => res.data);
// }

// /**
//  * Bulk upload quizzes via CSV/XLSX file (admin only)
//  * POST /quizzes/admin/quizzes/bulk-upload-file
//  * @param {File} file CSV/XLSX
//  */
// // src/services/quizService.js

// /**
//  * Bulk upload multiple quizzes via CSV/XLSX file (admin only)
//  * POST /quizzes/admin/bulk-upload-file
//  * @param {File} file CSV/XLSX file object
//  */
// // POST /quizzes/admin/quizzes/bulk-upload-file
// export function bulkUploadQuizzes(file) {
//   const formData = new FormData()
//   formData.append('file', file)

//   return API.post(
//     '/quizzes/admin/quizzes/bulk-upload-file',
//     formData,
//     { headers: { 'Content-Type': 'multipart/form-data' } }
//   ).then(res => res.data)
// }



// export const fetchSidebarFilters = async () => {
//   const [categories, levels] = await Promise.all([
//     API.get('/quizzes/distinct/category'),
//     API.get('/quizzes/distinct/level')
//   ]);
//   return {
//     categories: categories.data,
//     levels: levels.data
//   };
// };

// export const fetchGroupedTopics = async () => {
//   const res = await API.get('/quizzes/grouped-topics');
//   return res.data; // [{ category: 'Programming', topics: ['Java', 'Python'] }, ...]
// };

// export const fetchDistinctTopics = async () => {
//   const res = await API.get('/quizzes/distinct/topic');
//   return res.data; // ["Java", "Python", ...]

// };

// // ─── Default Export (convenience) ───────────────────────────────────────────
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

import API from './axios'; // ✅ Axios instance for API calls

// ─────────────────────────────────────────────────────────────
// 📦 Quiz CRUD (Admin)
// ─────────────────────────────────────────────────────────────
export function getAllQuizzes() {
  return API.get('/quizzes/admin/quizzes').then(res => res.data);
}

export function createQuiz(payload) {
  return API.post('/quizzes/admin/quizzes', payload).then(res => res.data);
}

export function getQuizById(quizId) {
  return API.get(`/quizzes/admin/quizzes/${quizId}`).then(res => res.data);
}

export function updateQuiz(quizId, payload) {
  return API.patch(`/quizzes/admin/quizzes/${quizId}`, payload).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📝 Quiz Attempts (User)
// ─────────────────────────────────────────────────────────────
export function submitQuizAttempt(payload) {
  return API.post('/quizzes/submit', payload).then(res => res.data);
}

export function getUserAttempts() {
  return API.get('/quizzes/my-attempts').then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 🏆 Leaderboard (Public)
// ─────────────────────────────────────────────────────────────
export function getLeaderboard(params = {}) {
  return API.get('/quizzes/leaderboard', { params }).then(res => {
    const d = res.data;
    console.log("📊 Raw leaderboard response:", d);
    return {
      items: Array.isArray(d.items) ? d.items : [],
      total: typeof d.total === 'number' ? d.total : 0,
    };
  });
}

// ─────────────────────────────────────────────────────────────
// 📤 Bulk Upload: Questions (Admin)
// ─────────────────────────────────────────────────────────────
export function bulkUploadQuestions(quizId, questions) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions })
    .then(res => res.data);
}

export function bulkUploadQuestionsFile(quizId, file) {
  const formData = new FormData();
  formData.append('file', file);
  return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload-file`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 👥 Quiz Assignments (Admin)
// ─────────────────────────────────────────────────────────────
export function getQuizAssignments(quizId) {
  return API.get(`/quizzes/admin/quizzes/${quizId}/assignments`).then(res => {
    const d = res.data;
    return Array.isArray(d) ? d : (Array.isArray(d.assignments) ? d.assignments : []);
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

// ─────────────────────────────────────────────────────────────
// 🌍 Public Quiz Listings
// ─────────────────────────────────────────────────────────────
export function getQuizzes(params = {}) {
  return API.get('/quizzes', { params }).then(res => {
    return Array.isArray(res.data.quizzes)
      ? res.data.quizzes
      : (Array.isArray(res.data) ? res.data : []);
  });
}

// ─────────────────────────────────────────────────────────────
// 📊 Attempt Details & Stats
// ─────────────────────────────────────────────────────────────
export function getAttemptById(attemptId) {
  return API.get(`/quizzes/attempts/${attemptId}`).then(res => res.data);
}

export function getAttemptStats(attemptId) {
  return API.get(`/quizzes/attempts/${attemptId}/stats`).then(res => res.data);
}

export function getQuizTopThree(quizId, timePeriod = 'week') {
  return API.get(`/quizzes/${quizId}/top-three`, { params: { timePeriod } })
    .then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📥 Bulk Upload: Quizzes File (Admin)
// ─────────────────────────────────────────────────────────────
export function bulkUploadQuizzes(file) {
  const formData = new FormData();
  formData.append('file', file);

  return API.post('/quizzes/admin/quizzes/bulk-upload-file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📂 Sidebar Filters & Topic Grouping (Public)
// ─────────────────────────────────────────────────────────────
export const fetchSidebarFilters = async () => {
  const [categories, levels] = await Promise.all([
    API.get('/quizzes/distinct/category'),
    API.get('/quizzes/distinct/level')
  ]);
  return {
    categories: categories.data,
    levels: levels.data,
  };
};

export const fetchGroupedTopics = async () => {
  const res = await API.get('/quizzes/grouped-topics');
  return res.data; // [{ category: 'Programming', topics: [...] }, ...]
};

export const fetchDistinctTopics = async () => {
  const res = await API.get('/quizzes/distinct/topic');
  return res.data; // ["Java", "Python", ...]
};

// ─────────────────────────────────────────────────────────────
// 🌐 Export All As Default Service
// ─────────────────────────────────────────────────────────────
const quizService = {
  getAllQuizzes,
  bulkUploadQuizzes,
  createQuiz,
  getQuizById,
  fetchSidebarFilters,
  fetchGroupedTopics,
  fetchDistinctTopics,
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
};

export default quizService;



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
//   return API
//     .get('/quizzes/leaderboard', { params })
//     .then(res => {
//       const d = res.data;
//       // always return an array
//       if (Array.isArray(d)) return d;
//       if (Array.isArray(d.leaderboard)) return d.leaderboard;
//       return [];
//     });
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



// // ─── Default Export (convenience) ───────────────────────────────────────────
// const quizService = {
//   getAllQuizzes,
//   bulkUploadQuizzes,
//   createQuiz,
//   getQuizById,
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
import API from './axios';

// ─── Quiz CRUD (admin) ─────────────────────────────────────────────────────
export async function getAllQuizzes() {
  try {
    const res = await API.get('/quizzes/admin/quizzes');
    return res.data || [];
  } catch (err) {
    console.error('Error in getAllQuizzes:', err);
    return [];
  }
}

export async function createQuiz(payload) {
  try {
    const res = await API.post('/quizzes/admin/quizzes', payload);
    return res.data;
  } catch (err) {
    console.error('Error in createQuiz:', err);
    throw err;
  }
}

export async function getQuizById(quizId) {
  try {
    const res = await API.get(`/quizzes/admin/quizzes/${quizId}`);
    return res.data;
  } catch (err) {
    console.error('Error in getQuizById:', err);
    return null;
  }
}

export async function updateQuiz(quizId, payload) {
  try {
    const res = await API.patch(`/quizzes/admin/quizzes/${quizId}`, payload);
    return res.data;
  } catch (err) {
    console.error('Error in updateQuiz:', err);
    throw err;
  }
}

// ─── Quiz Attempts ──────────────────────────────────────────────────────────
export async function submitQuizAttempt(payload) {
  try {
    const res = await API.post('/quizzes/submit', payload);
    return res.data;
  } catch (err) {
    console.error('Error in submitQuizAttempt:', err);
    throw err;
  }
}

export async function getUserAttempts() {
  try {
    const res = await API.get('/quizzes/my-attempts');
    return res.data || [];
  } catch (err) {
    console.error('Error in getUserAttempts:', err);
    return [];
  }
}

// ─── Leaderboard ────────────────────────────────────────────────────────────
export async function getLeaderboard(params = {}) {
  try {
    const res = await API.get('/quizzes/leaderboard', { params });
    const d = res.data;
    if (Array.isArray(d)) return d;
    if (Array.isArray(d.leaderboard)) return d.leaderboard;
    return [];
  } catch (err) {
    console.error('Error in getLeaderboard:', err);
    return [];
  }
}

// ─── Bulk‐Upload Questions (admin) ───────────────────────────────────────────
export async function bulkUploadQuestions(quizId, questions) {
  try {
    const res = await API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions });
    return res.data;
  } catch (err) {
    console.error('Error in bulkUploadQuestions:', err);
    throw err;
  }
}

export async function bulkUploadQuestionsFile(quizId, file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await API.post(
      `/quizzes/admin/quizzes/${quizId}/bulk-upload-file`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data;
  } catch (err) {
    console.error('Error in bulkUploadQuestionsFile:', err);
    throw err;
  }
}

// ─── Quiz Assignments (admin) ───────────────────────────────────────────────
export async function getQuizAssignments(quizId) {
  try {
    const res = await API.get(`/quizzes/admin/quizzes/${quizId}/assignments`);
    const d = res.data;
    return Array.isArray(d) ? d : Array.isArray(d.assignments) ? d.assignments : [];
  } catch (err) {
    console.error('Error in getQuizAssignments:', err);
    return [];
  }
}

export async function assignQuiz(quizId, userIds) {
  try {
    const res = await API.post(`/quizzes/admin/quizzes/${quizId}/assign`, { userIds });
    return res.data;
  } catch (err) {
    console.error('Error in assignQuiz:', err);
    throw err;
  }
}

export async function unassignQuiz(quizId, userId) {
  try {
    const res = await API.delete(`/quizzes/admin/quizzes/${quizId}/assign/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Error in unassignQuiz:', err);
    throw err;
  }
}

// ─── Public Quiz Listing ────────────────────────────────────────────────────
export async function getQuizzes(params = {}) {
  try {
    const res = await API.get('/quizzes', { params });
    return Array.isArray(res.data?.quizzes) ? res.data.quizzes : Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('Error in getQuizzes:', err);
    return [];
  }
}

// ─── Attempt Details & Stats ────────────────────────────────────────────────
export async function getAttemptById(attemptId) {
  try {
    const res = await API.get(`/quizzes/attempts/${attemptId}`);
    return res.data;
  } catch (err) {
    console.error('Error in getAttemptById:', err);
    return null;
  }
}

export async function getAttemptStats(attemptId) {
  try {
    const res = await API.get(`/quizzes/attempts/${attemptId}/stats`);
    return res.data;
  } catch (err) {
    console.error('Error in getAttemptStats:', err);
    return null;
  }
}

export async function getQuizTopThree(quizId, timePeriod = 'week') {
  try {
    const res = await API.get(`/quizzes/${quizId}/top-three`, { params: { timePeriod } });
    return res.data;
  } catch (err) {
    console.error('Error in getQuizTopThree:', err);
    return [];
  }
}

export async function bulkUploadQuizzes(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await API.post(
      '/quizzes/admin/quizzes/bulk-upload-file',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data;
  } catch (err) {
    console.error('Error in bulkUploadQuizzes:', err);
    throw err;
  }
}

// ─── Default Export ─────────────────────────────────────────────────────────
const quizService = {
  getAllQuizzes,
  bulkUploadQuizzes,
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
};

export default quizService;

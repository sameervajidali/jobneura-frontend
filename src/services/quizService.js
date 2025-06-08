
// src/services/quizService.js
import API from './axios'; // Axios instance, baseURL includes `/api`

// ─────────────────────────────────────────────────────────────
// 📦 Quiz CRUD (Admin)
// ─────────────────────────────────────────────────────────────

export function getAllQuizzes() {
  return API.get('/quizzes/admin/quizzes').then(res => res.data);
}

export function createQuiz(payload) {
  return API.post('/quizzes/admin/quizzes', payload).then(res => res.data);
}

export function getQuizById(id) {
  return API.get(`/quizzes/admin/quizzes/${id}`).then(res => res.data.quiz || res.data);
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
  return API.post(`/quizzes/admin/quizzes/${quizId}/bulk-upload`, { questions }).then(res => res.data);
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
    return Array.isArray(d) ? d : Array.isArray(d.assignments) ? d.assignments : [];
  });
}

export function assignQuiz(quizId, userIds) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/assign`, { userIds }).then(res => res.data);
}

export function unassignQuiz(quizId, userId) {
  return API.delete(`/quizzes/admin/quizzes/${quizId}/assign/${userId}`).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 🌍 Public Quiz Listings
// ─────────────────────────────────────────────────────────────

export function getQuizzes(params = {}) {
  return API.get('/quizzes', { params }).then(res => {
    const data = res.data;
    return Array.isArray(data.quizzes) ? data.quizzes : Array.isArray(data) ? data : [];
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
  return API.get(`/quizzes/${quizId}/top-three`, { params: { timePeriod } }).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📥 Bulk Upload: Quizzes File (Admin)
// ─────────────────────────────────────────────────────────────

export function bulkUploadQuizzes(file, config = {}) {
  const formData = new FormData();
  formData.append('file', file);
  return API.post(
    '/quizzes/admin/quizzes/bulk-upload-file',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' }, responseType: 'blob', ...config }
  ).then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 📥 Admin Downloads (CSV Export)
// ─────────────────────────────────────────────────────────────

export function downloadAllQuizzes() {
  return API.get('/quizzes/admin/export/quizzes', { responseType: 'blob' });
}

export function downloadAllCategories() {
  return API.get('/quizzes/admin/export/categories', { responseType: 'blob' });
}

export function downloadAllTopics() {
  return API.get('/quizzes/admin/export/topics', { responseType: 'blob' });
}

// ─────────────────────────────────────────────────────────────
// 🌐 Sidebar Filters & Topic Grouping (Public)
// ─────────────────────────────────────────────────────────────

export async function fetchSidebarFilters() {
  const [catsRes, topsRes, lvlsRes] = await Promise.all([
    API.get('/quizzes/distinct/category'),
    API.get('/quizzes/distinct/topic'),
    API.get('/quizzes/distinct/level'),
  ]);
  return {
    categories: catsRes.data,
    topics: topsRes.data,
    levels: lvlsRes.data,
  };
}

export async function fetchGroupedTopics() {
  const res = await API.get('/quizzes/grouped-topics');
  return res.data;
}

export async function fetchDistinctTopics() {
  try {
    const res = await API.get('/quizzes/distinct/topic');
    return res.data;
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// 🔥 Highlights (Just Added / Trending / Spotlight)
// ─────────────────────────────────────────────────────────────

export function fetchJustAdded(limit = 3) {
  return API.get('/quizzes/highlight/just-added', { params: { limit } }).then(res => res.data);
}

export function fetchTrending(limit = 5) {
  return API.get('/quizzes/highlight/trending', { params: { limit } }).then(res => res.data);
}

export function fetchDailySpotlight() {
  return API.get('/quizzes/highlight/daily-spotlight').then(res => res.data);
}

// ─────────────────────────────────────────────────────────────
// 🆕 Admin Reports APIs (Newly added to match backend)
// ─────────────────────────────────────────────────────────────

export function getDAUReport(params) {
  // params: { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
  return API.get('/quizzes/admin/reports/dau', { params }).then(res => res.data);
}

export function getCategoryEngagement() {
  return API.get('/quizzes/admin/reports/category-engagement').then(res => res.data);
}

export function getExportHistory() {
  return API.get('/quizzes/admin/reports/export-history').then(res => res.data);
}

export function getAlerts() {
  return API.get('/quizzes/admin/reports/alerts').then(res => res.data);
}

export function saveAlertConfig(payload) {
  // payload: { dauThreshold: number, sendEmail: boolean }
  return API.post('/quizzes/admin/reports/alerts', payload).then(res => res.data);
}


export async function getRecommendedQuizzes(quizId) {
  const res = await axios.get(`/quizzes/${quizId}/recommended`);
  return res.data.recommendedQuizzes; // Adjust this line to your backend response
}


// ─────────────────────────────────────────────────────────────
// 🧩 Export all quiz service functions
// ─────────────────────────────────────────────────────────────

const quizService = {
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
  downloadAllQuizzes,
  downloadAllCategories,
  downloadAllTopics,
  fetchSidebarFilters,
  fetchGroupedTopics,
  fetchDistinctTopics,
  fetchJustAdded,
  fetchTrending,
  fetchDailySpotlight,
  getDAUReport,
  getCategoryEngagement,
  getExportHistory,
  getAlerts,
  saveAlertConfig,
  getRecommendedQuizzes
};

export default quizService;

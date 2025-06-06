// src/services/subTopicService.js
import API from "./axios";

// ─────────────────────────────────────────────────────────
// ✅ GET ALL SUBTOPICS (optionally filtered by topic)
export function getAllSubTopics(params = {}) {
  return API.get("/admin/subtopics", { params }).then(res => res.data.subtopics || res.data);
}

// ✅ GET SINGLE SUBTOPIC BY ID
export function getSubTopicById(id) {
  return API.get(`/admin/subtopics/${id}`).then(res => res.data.subtopic || res.data);
}

// ✅ CREATE NEW SUBTOPIC
export function createSubTopic(payload) {
  return API.post("/admin/subtopics", payload).then(res => res.data.subtopic || res.data);
}

// ✅ UPDATE SUBTOPIC
export function updateSubTopic(id, payload) {
  return API.put(`/admin/subtopics/${id}`, payload).then(res => res.data.subtopic || res.data);
}

// ✅ DELETE SUBTOPIC
export function deleteSubTopic(id) {
  return API.delete(`/admin/subtopics/${id}`).then(res => res.data);
}

// ✅ BULK UPLOAD via CSV/XLSX
export function bulkUploadSubTopics(formData) {
  return API.post("/admin/subtopics/bulk-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then(res => res.data);
}

// ✅ BULK UPLOAD via JSON Paste
export function bulkUploadSubTopicsJSON(payload) {
  return API.post("/admin/subtopics/bulk-json", payload).then(res => res.data);
}

// ─────────────────────────────────────────────────────────
// ✅ Export Service Object
const subTopicService = {
  getAllSubTopics,
  getSubTopicById,
  createSubTopic,
  updateSubTopic,
  deleteSubTopic,
  bulkUploadSubTopics,
  bulkUploadSubTopicsJSON,
};

export default subTopicService;

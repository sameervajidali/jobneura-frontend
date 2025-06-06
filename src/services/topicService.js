// src/services/topicService.js
import API from "./axios";

// ─────────────────────────────────────────────────────────
// ✅ GET ALL TOPICS (optionally filter by type/category)
export function getAllTopics(params = {}) {
  return API.get("/admin/topics", { params })
    .then(res => res.data.topics || res.data);
}

// ✅ GET SINGLE TOPIC BY ID
export function getTopicById(id) {
  return API.get(`/admin/topics/${id}`)
    .then(res => res.data.topic || res.data);
}

// ✅ CREATE NEW TOPIC
export function createTopic(payload) {
  return API.post("/admin/topics", payload)
    .then(res => res.data.topic || res.data);
}

// ✅ UPDATE EXISTING TOPIC
export function updateTopic(id, payload) {
  return API.put(`/admin/topics/${id}`, payload)
    .then(res => res.data.topic || res.data);
}

// ✅ DELETE TOPIC
export function deleteTopic(id) {
  return API.delete(`/admin/topics/${id}`)
    .then(res => res.data);
}

// ✅ BULK UPLOAD TOPICS (CSV or XLSX)
export function bulkUploadTopics(formData) {
  return API.post("/admin/topics/bulk-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(res => res.data);
}

// ─────────────────────────────────────────────────────────
// ✅ EXPORT AS SINGLE SERVICE OBJECT
const topicService = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  bulkUploadTopics,
};

export default topicService;

// src/services/topicService.js
import API from "./axios";

// ─── Topics ────────────────────────────────────────────────────────────
export function getAllTopics() {
  return API.get("/admin/topics").then(res => res.data.topics || res.data);
}
export function getTopicById(id) {
  return API.get(`/admin/topics/${id}`).then(res => res.data.topic || res.data);
}
export function createTopic(payload) {
  return API.post("/admin/topics", payload).then(res => res.data);
}
export function updateTopic(id, payload) {
  return API.put(`/admin/topics/${id}`, payload).then(res => res.data);
}
export function deleteTopic(id) {
  return API.delete(`/admin/topics/${id}`).then(res => res.data);
}

const topicService = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
};
export default topicService;

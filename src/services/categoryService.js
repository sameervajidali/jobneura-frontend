// src/services/categoryService.js
import API from "./axios";

// ─── Categories ────────────────────────────────────────────────────────────
export function getAllCategories() {
  return API.get("/admin/categories").then(res => res.data.categories || res.data);
}
export function getCategoryById(id) {
  return API.get(`/admin/categories/${id}`).then(res => res.data.category || res.data);
}
export function createCategory(payload) {
  return API.post("/admin/categories", payload).then(res => res.data);
}
export function updateCategory(id, payload) {
  return API.put(`/admin/categories/${id}`, payload).then(res => res.data);
}
export function deleteCategory(id) {
  return API.delete(`/admin/categories/${id}`).then(res => res.data);
}

const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
export default categoryService;

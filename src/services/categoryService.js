// src/services/categoryService.js
import API from "./axios";

// ─────────────────────────────────────────────────────────
// ✅ GET ALL CATEGORIES (with optional type filter)
export function getAllCategories(params = {}) {
  return API.get("/admin/categories", { params })
    .then(res => res.data.categories || res.data);
}

// ✅ GET SINGLE CATEGORY BY ID
export function getCategoryById(id) {
  return API.get(`/admin/categories/${id}`)
    .then(res => res.data.category || res.data);
}

// ✅ CREATE NEW CATEGORY
export function createCategory(payload) {
  return API.post("/admin/categories", payload)
    .then(res => res.data.category || res.data);
}

// ✅ UPDATE EXISTING CATEGORY
export function updateCategory(id, payload) {
  return API.put(`/admin/categories/${id}`, payload)
    .then(res => res.data.category || res.data);
}

// ✅ DELETE CATEGORY
export function deleteCategory(id) {
  return API.delete(`/admin/categories/${id}`)
    .then(res => res.data);
}

// ✅ BULK UPLOAD CATEGORIES (CSV/XLSX File)
export function bulkUploadCategories(formData) {
  return API.post("/admin/categories/bulk-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then(res => res.data);
}

// ─────────────────────────────────────────────────────────
// ✅ EXPORT SERVICE OBJECT
const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkUploadCategories,
};

export default categoryService;

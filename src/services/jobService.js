// import API from "./axios";

// // PUBLIC: Fetch all visible jobs
// const getAllPublic = () =>
//   API.get("/jobs/public").then(res => res.data.jobs);

// const getAllAdmin = () =>
//   API.get("/jobs/admin/jobs").then(res => res.data.jobs);

// //
// // PUBLIC: Get a single job by ID
// const getById = (id) =>
//   API.get(`/jobs/${id}`).then(res => res.data);

// // ADMIN: Create a job (requires token + admin role)
// const create = (data) =>
//   API.post("/jobs/admin/jobs", data).then(res => res.data);

// // ADMIN: Update a job
// const update = (id, data) =>
//   API.put(`/jobs/admin/jobs/${id}`, data).then(res => res.data);

// // ADMIN: Delete a job
// const remove = (id) =>
//   API.delete(`/jobs/admin/jobs/${id}`).then(res => res.data);

// // ADMIN: Bulk upload jobs via CSV
// const bulkUpload = (formData) =>
//   API.post("/jobs/admin/jobs/bulk-upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }).then(res => res.data);

// export default {
//   getAllPublic,
//   getAllAdmin,
//   getById,
//   create,
//   update,
//   remove,
//   bulkUpload,
// };


// src/services/jobService.js
import API from "./axios";

const ADMIN_BASE = "/jobs/admin/jobs";

export default {
  getPublicJobs: (params = {}) =>
    API.get("/jobs/public", { params }).then(res => res.data),

  // Returns { jobs, total, page, limit }
  getAdminJobs: (params = {}) =>
    API.get(ADMIN_BASE, { params }).then(res => res.data),

  getJobById: (id) =>
    API.get(`/jobs/${id}`).then(res => res.data),

  createJob: (data) =>
    API.post(ADMIN_BASE, data).then(res => res.data),

  updateJob: (id, data) =>
    API.put(`${ADMIN_BASE}/${id}`, data).then(res => res.data),

  deleteJob: (id) =>
    API.delete(`${ADMIN_BASE}/${id}`).then(res => res.data),

  bulkUploadJobs: (formData) =>
    API.post(`${ADMIN_BASE}/bulk-upload`, formData).then(res => res.data),
};

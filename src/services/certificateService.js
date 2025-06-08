// src/services/certificateService.js
import axios from './axios'; // Make sure this is your pre-configured axios instance

// ------------------------------------------------------
// 1️⃣ Issue a single certificate (Admin only)
//    Usage: Admin panel, auto-issue after quiz, etc.
//    Expects: { user, title, score, ... } (see backend model)
// ------------------------------------------------------
export async function issueCertificate(data) {
  // POST /api/certificates/admin/issue
  // `data` = { user, title, score, ... }
  const res = await axios.post('/api/certificates/admin/issue', data);
  // Returns: { certificate: {...} }
  return res.data.certificate;
}

// ------------------------------------------------------
// 2️⃣ Bulk issue certificates (Admin only)
//    Usage: For batch awards, events, etc.
//    Expects: [{ user, title, ... }, ...]
// ------------------------------------------------------
export async function bulkIssueCertificates(certificates) {
  // POST /api/certificates/admin/bulk-issue
  // `certificates` = array of cert objects
  const res = await axios.post('/api/certificates/admin/bulk-issue', { certificates });
  // Returns: { certificates: [...] }
  return res.data.certificates;
}

// ------------------------------------------------------
// 3️⃣ Publicly verify a certificate by ID (QR code support)
//    Usage: For the public verify/QR page
//    Expects: /api/certificates/verify/:certificateId
// ------------------------------------------------------
export async function verifyCertificate(certificateId) {
  // GET /api/certificates/verify/:certificateId
  // Returns: { valid: true/false, certificate: {...} }
  const res = await axios.get(`/api/certificates/verify/${certificateId}`);
  return res.data; // { valid, certificate, ... }
}

// ------------------------------------------------------
// 4️⃣ Get all certificates for a user (User dashboard)
//    Usage: User profile "My Certificates"
//    Secure: Only for logged-in user or admin
//    Expects: /api/certificates?user=<userId>
// ------------------------------------------------------
export async function getUserCertificates(userId) {
  // GET /api/certificates?user=<userId>
  // Returns: { certificates: [...] }
  const res = await axios.get('/api/certificates', { params: { user: userId } });
  return res.data.certificates;
}

// ------------------------------------------------------
// 5️⃣ Get a certificate by its internal Mongo ID
//    Usage: Admin detail view or private download
//    Expects: /api/certificates/:id
// ------------------------------------------------------
export async function getCertificateById(id) {
  // GET /api/certificates/:id
  // Returns: { certificate: {...} }
  const res = await axios.get(`/api/certificates/${id}`);
  return res.data.certificate;
}

export default {
  issueCertificate,
  bulkIssueCertificates,
  verifyCertificate,
  getUserCertificates,
  getCertificateById,
};

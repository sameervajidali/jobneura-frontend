import axios from './axios';

// 1️⃣ Issue single certificate (Admin)
export async function issueCertificate(data) {
  const res = await axios.post('/certificates/admin/issue', data);
  return res.data.certificate;
}

// 2️⃣ Bulk issue certificates (Admin)
export async function bulkIssueCertificates(certificates) {
  const res = await axios.post('/certificates/admin/bulk-issue', { certificates });
  return res.data.certificates;
}

// 3️⃣ Public verify (returns HTML, not JSON!)
export async function verifyCertificate(certificateId) {
  const res = await axios.get(`/certificates/verify/${certificateId}`, {
    headers: { Accept: 'application/json' } // <-- only if your backend supports JSON
  });
  return res.data; // May be HTML string if not JSON!
}

// 4️⃣ Get all certificates for logged-in user (recommended!)
export async function getMyCertificates() {
  // Only fetches for current authenticated user
  const res = await axios.get('/certificates');
  return res.data.certificates;
}

// 5️⃣ (OPTIONAL, Admin) Get all certificates for specific user (if backend supports)
// Only works if you build a route: GET /api/certificates?user=<id> for admins
export async function getUserCertificates(userId) {
  const res = await axios.get('/certificates', { params: { user: userId } });
  return res.data.certificates;
}

// 6️⃣ (OPTIONAL, Admin) Get certificate by internal Mongo ID (if backend supports)
// Only works if you add GET /api/certificates/:id route in your backend
export async function getCertificateById(id) {
  const res = await axios.get(`/certificates/${id}`);
  return res.data.certificate;
}

export default {
  issueCertificate,
  bulkIssueCertificates,
  verifyCertificate,
  getMyCertificates,
  getUserCertificates,
  getCertificateById,
};

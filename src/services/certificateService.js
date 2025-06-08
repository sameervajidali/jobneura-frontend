// import axios from './axios';

// // 1️⃣ Issue single certificate (Admin)
// export async function issueCertificate(data) {
//   const res = await axios.post('/certificates/admin/issue', data);
//   return res.data.certificate;
// }

// // 2️⃣ Bulk issue certificates (Admin)
// export async function bulkIssueCertificates(certificates) {
//   const res = await axios.post('/certificates/admin/bulk-issue', { certificates });
//   return res.data.certificates;
// }

// // 3️⃣ Public verify (returns HTML, not JSON!)
// export async function verifyCertificate(certificateId) {
//   const res = await axios.get(`/certificates/verify/${certificateId}`, {
//     headers: { Accept: 'application/json' } // <-- only if your backend supports JSON
//   });
//   return res.data; // May be HTML string if not JSON!
// }

// // 4️⃣ Get all certificates for logged-in user (recommended!)
// export async function getMyCertificates() {
//   // Only fetches for current authenticated user
//   const res = await axios.get('/certificates');
//   return res.data.certificates;
// }

// // 5️⃣ (OPTIONAL, Admin) Get all certificates for specific user (if backend supports)
// // Only works if you build a route: GET /api/certificates?user=<id> for admins
// export async function getUserCertificates(userId) {
//   const res = await axios.get('/certificates', { params: { user: userId } });
//   return res.data.certificates;
// }

// // 6️⃣ (OPTIONAL, Admin) Get certificate by internal Mongo ID (if backend supports)
// // Only works if you add GET /api/certificates/:id route in your backend
// export async function getCertificateById(id) {
//   const res = await axios.get(`/certificates/${id}`);
//   return res.data.certificate;
// }

// export default {
//   issueCertificate,
//   bulkIssueCertificates,
//   verifyCertificate,
//   getMyCertificates,
//   getUserCertificates,
//   getCertificateById,
// };


// src/services/certificateService.js

import axios from './axios';

// Utility: Normalize a single certificate from backend result
function normalizeCertificate(cert) {
  if (!cert) return null;
  // Add additional transformation as schema evolves
  return {
    ...cert,
    issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
    expirationDate: cert.expirationDate ? new Date(cert.expirationDate) : null,
    // Optionally handle score fields for legacy or mixed data
    score: cert.score ?? cert.percentage ?? null,
    rawScore: cert.rawScore ?? null,
    totalQuestions: cert.totalQuestions ?? null,
  };
}

// Utility: Normalize an array of certificates
function normalizeCertificates(certs) {
  if (!Array.isArray(certs)) return [];
  return certs.map(normalizeCertificate);
}

// 1️⃣ Issue single certificate (Admin)
export async function issueCertificate(data) {
  try {
    const res = await axios.post('/certificates/admin/issue', data);
    return normalizeCertificate(res.data.certificate);
  } catch (err) {
    // Optionally log to Sentry, etc.
    console.error('Issue Certificate Failed:', err?.response?.data || err.message);
    return null;
  }
}

// 2️⃣ Bulk issue certificates (Admin)
export async function bulkIssueCertificates(certificates) {
  try {
    const res = await axios.post('/certificates/admin/bulk-issue', { certificates });
    return normalizeCertificates(res.data.certificates);
  } catch (err) {
    console.error('Bulk Issue Certificates Failed:', err?.response?.data || err.message);
    return [];
  }
}

// 3️⃣ Public verify (returns JSON, not HTML)
export async function verifyCertificate(certificateId) {
  try {
    const res = await axios.get(`/certificates/verify/${certificateId}`, {
      headers: { Accept: 'application/json' }
    });
    // .valid is boolean, .certificate is object if found
    return {
      valid: res.data.valid,
      certificate: normalizeCertificate(res.data.certificate),
      message: res.data.message
    };
  } catch (err) {
    // Not found is not an error, just invalid
    if (err.response?.status === 404) {
      return { valid: false, certificate: null, message: "Certificate not found" };
    }
    console.error('Verify Certificate Error:', err?.response?.data || err.message);
    return { valid: false, certificate: null, message: "Verification failed" };
  }
}

// 4️⃣ Get all certificates for logged-in user
export async function getMyCertificates() {
  try {
    const res = await axios.get('/certificates');
    return normalizeCertificates(res.data.certificates);
  } catch (err) {
    console.error('Get My Certificates Failed:', err?.response?.data || err.message);
    return [];
  }
}

// 5️⃣ (Admin) Get all certificates for a specific user
export async function getUserCertificates(userId) {
  try {
    const res = await axios.get('/certificates', { params: { user: userId } });
    return normalizeCertificates(res.data.certificates);
  } catch (err) {
    console.error('Get User Certificates Failed:', err?.response?.data || err.message);
    return [];
  }
}

// 6️⃣ (Admin) Get certificate by internal Mongo ID
export async function getCertificateById(id) {
  try {
    const res = await axios.get(`/certificates/${id}`);
    return normalizeCertificate(res.data.certificate);
  } catch (err) {
    console.error('Get Certificate By ID Failed:', err?.response?.data || err.message);
    return null;
  }
}

// 7️⃣ (OPTIONAL) Delete certificate (Admin, not recommended for prod, but may be useful for moderation)
export async function deleteCertificate(certificateId) {
  try {
    await axios.delete(`/certificates/admin/${certificateId}`);
    return true;
  } catch (err) {
    console.error('Delete Certificate Failed:', err?.response?.data || err.message);
    return false;
  }
}

export default {
  issueCertificate,
  bulkIssueCertificates,
  verifyCertificate,
  getMyCertificates,
  getUserCertificates,
  getCertificateById,
  deleteCertificate, // optional
};

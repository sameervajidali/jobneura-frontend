// src/pages/admin/BulkUploadQuizzesPage.jsx
import React, { useState } from 'react';
import { bulkUploadQuizzes } from '../../../services/quizService';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

export default function BulkUploadQuizzesPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('❌ Please select a CSV file first.');
      return;
    }
    setUploading(true);
    setStatus('⏳ Uploading…');
    try {
      const resultRows = await bulkUploadQuizzes(file);

      const successCount = resultRows.filter(r => r.status === 'Success').length;
      const failCount = resultRows.filter(r => r.status === 'Failed').length;
      setStatus(`✅ Upload done. Success: ${successCount}, Failed: ${failCount}`);

      // Download CSV report
      if (resultRows.length) downloadReport(resultRows);
    } catch (err) {
      console.error('Bulk quizzes upload error:', err);
      const msg = err.response?.data?.message || err.message;
      setStatus(`❌ Upload failed: ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  const downloadReport = (data) => {
    try {
      const csv = unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'quizzes_upload_report.csv');
    } catch (err) {
      console.error('CSV download error:', err);
      setStatus('❌ Failed to download report.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Bulk Upload Quizzes</h2>
      <p className="text-gray-600 mb-3">
        Upload a CSV file containing quizzes (title,category,topic,level,duration,totalMarks,isActive).
      </p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading…' : 'Upload Quizzes'}
      </button>
      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
}

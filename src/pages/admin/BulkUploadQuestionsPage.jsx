// File: frontend/src/pages/admin/BulkUploadQuestionsPage.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/axios";

export default function BulkUploadQuestionsPage() {
  const { quizId } = useParams();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus(null);
    try {
      await API.post(`/admin/quizzes/${quizId}/bulk-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus({ type: "success", message: "Questions uploaded successfully." });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Upload failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">📤 Bulk Upload Questions</h2>

      {status && (
        <div className={`mb-4 p-2 rounded text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.message}</div>
      )}

      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="mb-4 block w-full"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        File must include: <strong>question, options (comma-separated), correctAnswer</strong>
      </div>
    </div>
  );
}

// src/pages/admin/Quiz/BulkUploadQuizzesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bulkUploadQuizzesFile } from '../../../services/quizService';
import { FaUpload, FaArrowLeft } from 'react-icons/fa';

export default function BulkUploadQuizzesPage() {
  const navigate = useNavigate();
  const [file, setFile]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFileChange = e => {
    setMessage(null);
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setMessage({ type:'error', text:'Please select a CSV or XLSX file.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const data = await bulkUploadQuizzesFile(file);
      setMessage({
        type:'success',
        text: `Successfully imported ${data.count ?? data.length ?? 'all'} quizzes!`
      });
    } catch (err) {
      setMessage({
        type:'error',
        text: err.response?.data?.message || 'Upload failed. Check your file format.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-indigo-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-bold">Bulk Upload Quizzes</h1>
      <p className="text-gray-600">
        Upload a CSV or Excel file to create multiple quizzes in one go.
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File (CSV or XLSX)
          </label>
          <input
            type="file"
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-700">
              Selected file: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          <FaUpload className="mr-2" />
          {loading ? 'Uploading…' : 'Import Quizzes'}
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

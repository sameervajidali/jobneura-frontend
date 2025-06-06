import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaFileDownload } from "react-icons/fa";

export default function SubTopicBulkUploadPage() {
  const { topicId } = useParams();
  const [file, setFile] = useState(null);
  const [jsonText, setJsonText] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select a file.");
    setLoading(true);
    setMessage("");
    setSuccess(false);
    setErrors([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `/api/admin/subtopics/bulk-upload?topic=${topicId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(`✅ ${res.data.message || "SubTopics uploaded successfully!"}`);
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Upload failed.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const uploadJSON = async () => {
    try {
      const parsedData = JSON.parse(jsonText);
      setLoading(true);
      setMessage("");
      setSuccess(false);
      setErrors([]);

      const res = await axios.post(
        `/api/admin/subtopics/bulk-json?topic=${topicId}`,
        { subtopics: parsedData },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(`✅ ${res.data.message}`);
      setSuccess(true);
      if (res.data.errors?.length) {
        setErrors(res.data.errors);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid JSON or upload failed.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Bulk Upload SubTopics
      </h1>

      {message && (
        <p
          className={`text-sm text-center font-medium ${
            success ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 p-3 rounded text-sm text-red-800 dark:text-red-300 space-y-1">
          <strong>Some entries failed:</strong>
          <ul className="list-disc list-inside">
            {errors.map((e, idx) => (
              <li key={idx}>
                <strong>{e.name || "Unnamed"}:</strong> {e.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload CSV/XLSX
          </label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="w-full text-sm bg-white border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={uploadFile}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FaUpload className="inline mr-2" /> Upload File
          </button>
        </div>

        {/* JSON Paste */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Paste JSON
          </label>
          <textarea
            rows={6}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full text-sm bg-white border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            placeholder='[{"name": "Intro", "description": "...", "order": 1, "isVisible": true}]'
          />
          <button
            onClick={uploadJSON}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaUpload className="inline mr-2" /> Upload JSON
          </button>
        </div>

        {/* Download Template */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="/mnt/data/subtopic_bulk_template.xlsx"
            download
            className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            <FaFileDownload className="mr-2" /> Download Excel Template
          </a>
        </div>
      </div>
    </div>
  );
}

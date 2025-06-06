// src/pages/admin/SubTopicBulkUploadPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function SubTopicBulkUploadPage() {
  const { topicId } = useParams();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Bulk Upload SubTopics for Topic ID: {topicId}</h2>
      {/* Add CSV Upload or JSON Paste UI here */}
      <p className="text-gray-500">Paste your JSON or upload a CSV/XLSX file here.</p>
    </div>
  );
}

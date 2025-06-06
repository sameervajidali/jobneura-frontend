import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import subTopicService from "../../services/subTopicService";
import { FaPlus, FaEdit, FaTrash, FaUpload } from "react-icons/fa";

export default function SubTopicsPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [subTopics, setSubTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subTopicService.getAllSubTopics({ topic: topicId }).then((data) => {
      setSubTopics(data);
      setLoading(false);
    });
  }, [topicId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub-topic?")) return;
    await subTopicService.deleteSubTopic(id);
    setSubTopics((prev) => prev.filter((s) => s._id !== id));
  };

  if (loading) return <p className="p-6">Loading SubTopics…</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">SubTopics</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/admin/topics/${topicId}/subtopics/new`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <FaPlus className="inline mr-2" /> Add SubTopic
          </button>
          <button
            onClick={() => navigate(`/admin/topics/${topicId}/subtopics/bulk-upload`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FaUpload className="inline mr-2" /> Bulk Upload
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">SubTopic</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {subTopics.length > 0 ? (
              subTopics.map((sub, idx) => (
                <tr key={sub._id}>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-200">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-700 dark:text-indigo-400">{sub.name}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/topics/${topicId}/subtopics/${sub._id}/edit`)}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No subtopics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

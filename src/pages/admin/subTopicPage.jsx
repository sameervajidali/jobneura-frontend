import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import subTopicService from "../../services/subTopicService";
import { FaPlus, FaEdit, FaTrash, FaUpload, FaEye, FaEyeSlash, FaDownload } from "react-icons/fa";

export default function SubTopicsPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [subTopics, setSubTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await subTopicService.getAllSubTopics({ topic: topicId });
        setSubTopics(data);
      } catch (err) {
        console.error("Failed to load subtopics", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [topicId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub-topic?")) return;
    await subTopicService.deleteSubTopic(id);
    setSubTopics((prev) => prev.filter((s) => s._id !== id));
  };

  const filtered = subTopics.filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const downloadCSV = () => {
    const csv = [
      ["Name", "Description", "Order", "Visible"],
      ...filtered.map(s => [s.name, s.description, s.order, s.isVisible])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subtopics.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          SubTopics List ({filtered.length})
        </h1>

        <div className="flex flex-col sm:flex-row sm:gap-2 gap-3">
          <input
            type="text"
            placeholder="Search SubTopics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full sm:w-64 dark:bg-gray-800 dark:text-white"
          />

          <button onClick={downloadCSV} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            <FaDownload className="inline mr-2" /> Export CSV
          </button>

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

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Order</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Visible</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">Loading…</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No subtopics found.</td>
              </tr>
            ) : (
              filtered.map((sub, idx) => (
                <tr key={sub._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-300">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-700 dark:text-indigo-400">{sub.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{sub.order || 0}</td>
                  <td className="px-6 py-4 text-center">
                    {sub.isVisible ? (
                      <FaEye className="text-green-500 inline" title="Visible" />
                    ) : (
                      <FaEyeSlash className="text-gray-400 inline" title="Hidden" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/topics/${topicId}/subtopics/${sub._id}/edit`)}
                      className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                      title="Edit"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      title="Delete"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

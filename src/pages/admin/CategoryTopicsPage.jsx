import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import topicService from "../../services/topicService";
import categoryService from "../../services/categoryService";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryTopicsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const cat = await categoryService.getCategoryById(id);
        setCategory(cat);
        const all = await topicService.getAllTopics({ category: id });
        setTopics(all);
      } catch (error) {
        console.error("Failed to load category topics:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async (topicId) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await topicService.deleteTopic(topicId);
      setTopics(prev => prev.filter(t => t._id !== topicId));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-600 text-lg">Loading topics…</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Topics in <span className="text-indigo-600">{category?.name}</span>
        </h1>
        <Link
          to="/admin/topics/new"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <FaPlus className="mr-2" /> New Topic
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {topics.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No topics found in this category.
                </td>
              </tr>
            ) : (
              topics.map((t, idx) => (
                <tr key={t._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-700 dark:text-indigo-400">
                    {t.name}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/topics/${t._id}/edit`)}
                      className="inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
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

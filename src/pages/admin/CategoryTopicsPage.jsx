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
      const cat = await categoryService.getCategoryById(id);
      setCategory(cat);
      const all = await topicService.getAllTopics({ category: id });
      setTopics(all);
      setLoading(false);
    })();
  }, [id]);

  const handleDelete = async (topicId) => {
    if (!window.confirm("Delete this topic?")) return;
    await topicService.deleteTopic(topicId);
    setTopics(prev => prev.filter(t => t._id !== topicId));
  };

  if (loading) return <p className="p-6">Loading topics…</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Topics in <span className="text-indigo-600">{category.name}</span>
        </h1>
        <Link
          to="/admin/topics/new"
          className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FaPlus className="mr-2" /> New Topic
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topics.map((t, idx) => (
              <tr key={t._id}>
                <td className="px-6 py-4 text-sm text-gray-600">{idx + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-indigo-700">{t.name}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/admin/topics/${t._id}/edit`)}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {topics.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No topics found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

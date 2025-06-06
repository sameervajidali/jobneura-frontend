// src/pages/admin/SubTopicForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import subTopicService from "../../services/subTopicService";

const DEFAULT_FORM = {
  name: "",
  description: "",
  order: 0,
  isVisible: true,
};

export default function SubTopicForm() {
  const { topicId, subtopicId } = useParams();
  const isEdit = Boolean(subtopicId);
  const navigate = useNavigate();

  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    subTopicService.getSubTopicById(subtopicId)
      .then((sub) => {
        setForm({
          name: sub.name,
          description: sub.description || "",
          order: sub.order || 0,
          isVisible: sub.isVisible,
        });
      })
      .catch(() => setMsg("Failed to load sub-topic."))
      .finally(() => setLoading(false));
  }, [subtopicId, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (isEdit) {
        await subTopicService.updateSubTopic(subtopicId, form);
      } else {
        await subTopicService.createSubTopic({ ...form, topic: topicId });
      }
      navigate(`/admin/topics/${topicId}/subtopics`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        {isEdit ? "Edit SubTopic" : "New SubTopic"}
      </h2>

      {msg && <p className="text-red-500 text-sm mb-2">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Order</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isVisible"
            checked={form.isVisible}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600"
          />
          <label className="text-sm text-gray-600 dark:text-gray-300">Visible</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update SubTopic" : "Create SubTopic"}
        </button>
      </form>
    </div>
  );
}

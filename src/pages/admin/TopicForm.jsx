// src/pages/admin/TopicForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import topicService from "../../services/topicService";
import categoryService from "../../services/categoryService";

export default function TopicForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    type: "quiz",
    icon: "",
    isVisible: true,
    order: 0,
  });

  useEffect(() => {
    categoryService.getAllCategories().then(setCats);
    if (isEdit) {
      setLoading(true);
      topicService
        .getTopicById(id)
        .then((t) =>
          setForm({
            name: t.name,
            category: t.category._id,
            description: t.description || "",
            type: t.type || "quiz",
            icon: t.icon || "",
            isVisible: t.isVisible ?? true,
            order: t.order || 0,
          })
        )
        .catch(() => setMsg("Error loading topic"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (isEdit) {
        await topicService.updateTopic(id, form);
      } else {
        await topicService.createTopic(form);
      }
      setMsg("Saved successfully!");
      setTimeout(() => navigate("/admin/topics"), 500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {isEdit ? "Edit Topic" : "New Topic"}
      </h2>

      {msg && (
        <p className="mb-4 text-center text-sm text-red-600 dark:text-red-400">
          {msg}
        </p>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            required
            disabled={loading}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handle}
            required
            disabled={loading}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select a category</option>
            {cats.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handle}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="quiz">Quiz</option>
            <option value="blog">Blog</option>
            <option value="tutorial">Tutorial</option>
            <option value="all">All</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Icon (optional)</label>
          <input
            name="icon"
            value={form.icon}
            onChange={handle}
            placeholder="e.g., /icons/react.svg"
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handle}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVisible"
              checked={form.isVisible}
              onChange={handle}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-200">Visible</span>
          </label>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Order</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handle}
              className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Topic"}
        </button>
      </form>
    </div>
  );
}

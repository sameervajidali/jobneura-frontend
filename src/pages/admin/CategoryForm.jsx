import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/categoryService";
import API from "../../services/axios"; // ✅ Use central axios instance

const DEFAULT_FORM = { name: "", description: "", type: "all" };

export default function CategoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    categoryService
      .getCategoryById(id)
      .then((cat) =>
        setForm({
          name: cat.name,
          description: cat.description || "",
          type: cat.type || "all",
        })
      )
      .catch(() => setMsg("Failed to load category"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      if (isEdit) await categoryService.updateCategory(id, form);
      else await categoryService.createCategory(form);
      setMsg("Saved successfully");
      setTimeout(() => navigate("/admin/categories"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMsg("");
    try {
      const res = await API.post("/admin/categories/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg(`Bulk upload success: ${res.data.count} categories added`);
      setTimeout(() => navigate("/admin/categories"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Bulk upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {isEdit ? "Edit Category" : "New Category"}
      </h2>

      {msg && (
        <p className="text-sm text-center text-red-600 dark:text-red-400">
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Link
            to={`/admin/categories/${cat._id}/topics`}
            className="text-indigo-600 hover:underline"
          >
            {cat.name}
          </Link>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="quiz">Quiz</option>
            <option value="blog">Blog</option>
            <option value="tutorial">Tutorial</option>
            <option value="resume">Resume</option>
            <option value="faq">FAQ</option>
            <option value="all">All</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Category"
            : "Create Category"}
        </button>
      </form>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Or Bulk Upload CSV/XLSX
        </label>
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileUpload}
          disabled={uploading}
          className="w-full bg-white dark:bg-gray-800 border rounded px-3 py-2 text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        />
        {uploading && (
          <p className="text-xs text-gray-400 mt-2">Uploading...</p>
        )}
      </div>
    </div>
  );
}

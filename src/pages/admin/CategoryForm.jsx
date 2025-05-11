// src/pages/admin/CategoryForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/categoryService";

export default function CategoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    categoryService.getCategoryById(id)
      .then(cat => setForm({ name: cat.name, description: cat.description }))
      .catch(() => setMsg("Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    setLoading(true); setMsg("");
    try {
      if (isEdit) await categoryService.updateCategory(id, form);
      else await categoryService.createCategory(form);
      setMsg("Saved successfully"); setTimeout(() => nav("/admin/categories"),500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit? "Edit Category":"New Category"}
      </h2>
      {msg && <p className="mb-4 text-center text-sm text-red-600">{msg}</p>}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            required
            disabled={loading}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handle}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading? "Saving…" : "Save Category"}
        </button>
      </form>
    </div>
  );
}

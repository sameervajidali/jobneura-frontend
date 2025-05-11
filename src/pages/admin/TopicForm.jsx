// src/pages/admin/TopicForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import topicService from "../../services/topicService";
import categoryService from "../../services/categoryService";

export default function TopicForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({ name: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    categoryService.getAllCategories().then(setCats);
    if (isEdit) {
      setLoading(true);
      topicService.getTopicById(id)
        .then(t => setForm({ name: t.name, category: t.category._id }))
        .catch(()=> setMsg("Load error"))
        .finally(()=> setLoading(false));
    }
  },[id]);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    setLoading(true); setMsg("");
    try {
      if (isEdit) await topicService.updateTopic(id, form);
      else await topicService.createTopic(form);
      setMsg("Saved"); setTimeout(()=> nav("/admin/topics"),500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit? "Edit Topic":"New Topic"}
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
          <label className="block text-sm">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handle}
            required
            disabled={loading}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a category</option>
            {cats.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading? "Saving…" : "Save Topic"}
        </button>
      </form>
    </div>
  );
}

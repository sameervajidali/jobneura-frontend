// File: frontend/src/pages/admin/CreateQuizForm.jsx

import React, { useState } from "react";
import API from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuizForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    topic: "",
    level: "Beginner",
    duration: 10,
    totalMarks: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data } = await API.post("/admin/quizzes", form);
      setMessage({ type: "success", text: "Quiz created successfully." });
      setTimeout(() => navigate(`/admin/quizzes/${data._id}/edit`), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to create." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">➕ Create Quiz</h2>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Quiz Title"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="category"
          required
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g. Programming)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="topic"
          required
          value={form.topic}
          onChange={handleChange}
          placeholder="Topic (e.g. JavaScript)"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
        <input
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (in minutes)"
          min="1"
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
}

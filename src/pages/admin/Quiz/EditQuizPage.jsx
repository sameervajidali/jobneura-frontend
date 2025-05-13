import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import quizService from "../../../services/quizService";
import categoryService from "../../../services/categoryService";
import topicService from "../../../services/topicService";

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // lists
  const [cats, setCats] = useState([]);
  const [topics, setTopics] = useState([]);

  // form holds just primitive values (IDs for category/topic)
  const [form, setForm] = useState({
    title: "",
    category: "",
    topic: "",
    level: "Beginner",
    duration: 0,
    totalMarks: 0,
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // load quiz, cats & topics
  useEffect(() => {
    (async () => {
      try {
        const [{ quiz }, cats, topics] = await Promise.all([
          quizService.getQuizById(quizId),
          categoryService.getAllCategories(),
          topicService.getAllTopics(),
        ]);
        // set lists
        setCats(cats);
        setTopics(topics);
        // seed form using _id values
        setForm({
          title: quiz.title,
          category: quiz.category._id,
          topic: quiz.topic._id,
          level: quiz.level,
          duration: quiz.duration,
          totalMarks: quiz.totalMarks,
          isActive: quiz.isActive,
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox" ? checked : type === "number" ? +value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await quizService.updateQuiz(quizId, form);
      setMessage("Quiz updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading quiz data…</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Quiz</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <p className="w-full border rounded px-3 py-2 bg-gray-100">
            {/* assuming you fetched `cats` and seeded form.category as the ID */}
            {cats.find((c) => c._id === form.category)?.name || "—"}
          </p>
        </div>

        {/* Topic */}
        <div>
          <label className="block mb-1 font-medium">Topic</label>
          <p className="w-full border rounded px-3 py-2 bg-gray-100">
            {topics.find((t) => t._id === form.topic)?.name || "—"}
          </p>
        </div>

        {/* Level, Duration, etc. */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label>Duration (min)</label>
            <input
              name="duration"
              type="number"
              min="1"
              value={form.duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Total Marks */}
        <div>
          <label>Total Marks</label>
          <input
            name="totalMarks"
            type="number"
            min="0"
            value={form.totalMarks}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Active</label>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <Link
            to={`/admin/quizzes/${quizId}/bulk-upload`}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Bulk Upload Questions
          </Link>
        </div>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Back to Quizzes
      </button>
    </div>
  );
}

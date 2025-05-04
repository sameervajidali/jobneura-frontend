// File: frontend/src/pages/admin/EditQuizPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/axios";

export default function EditQuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", category: "", topic: "", level: "Beginner", duration: 10 });
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "" });

  useEffect(() => {
    API.get(`/admin/quizzes/${quizId}`)
      .then((res) => {
        setQuiz(res.data);
        setForm(res.data);
        setQuestions(res.data.questions || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateQuiz = async () => {
    try {
      await API.put(`/admin/quizzes/${quizId}`, form);
      alert("Quiz details updated.");
    } catch (err) {
      alert("Failed to update.");
    }
  };

  const handleNewQChange = (e) => {
    const { name, value } = e.target;
    setNewQ((prev) => ({ ...prev, [name]: value }));
  };

  const updateOption = (idx, val) => {
    const newOptions = [...newQ.options];
    newOptions[idx] = val;
    setNewQ({ ...newQ, options: newOptions });
  };

  const addQuestion = async () => {
    try {
      const { data } = await API.post(`/admin/quizzes/${quizId}/questions`, newQ);
      setQuestions([...questions, data]);
      setNewQ({ question: "", options: ["", "", "", ""], correctAnswer: "" });
    } catch (err) {
      alert("Failed to add question");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!quiz) return <div className="p-6 text-red-500">Quiz not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">✏️ Edit Quiz</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="title" value={form.title} onChange={handleFormChange} className="border px-3 py-2 rounded" />
        <input name="category" value={form.category} onChange={handleFormChange} className="border px-3 py-2 rounded" />
        <input name="topic" value={form.topic} onChange={handleFormChange} className="border px-3 py-2 rounded" />
        <select name="level" value={form.level} onChange={handleFormChange} className="border px-3 py-2 rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>
        <input name="duration" type="number" value={form.duration} onChange={handleFormChange} className="border px-3 py-2 rounded" />
      </div>

      <button onClick={updateQuiz} className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded">💾 Save Changes</button>

      <h3 className="text-md font-semibold mt-6 mb-2">➕ Add Question</h3>
      <input
        type="text"
        name="question"
        placeholder="Question text"
        value={newQ.question}
        onChange={handleNewQChange}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        {newQ.options.map((opt, idx) => (
          <input
            key={idx}
            value={opt}
            onChange={(e) => updateOption(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
            className="border px-3 py-2 rounded"
          />
        ))}
      </div>
      <input
        name="correctAnswer"
        value={newQ.correctAnswer}
        onChange={handleNewQChange}
        placeholder="Correct answer"
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <button onClick={addQuestion} className="bg-green-600 text-white px-4 py-2 rounded">➕ Add Question</button>

      <h3 className="text-md font-semibold mt-6 mb-2">🧾 Existing Questions</h3>
      <ul className="space-y-2 text-sm">
        {questions.map((q, idx) => (
          <li key={q._id} className="border p-2 rounded bg-gray-50">
            <strong>Q{idx + 1}:</strong> {q.question}
          </li>
        ))}
      </ul>
    </div>
  );
}

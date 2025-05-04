// File: frontend/src/pages/admin/AdminQuizPanel.jsx

import React, { useState, useEffect } from "react";
import API from "../../services/axios";
import { Link } from "react-router-dom";

export default function AdminQuizPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/quizzes")
      .then((res) => setQuizzes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">📋 Manage Quizzes</h1>
      <Link
        to="/admin/quizzes/create"
        className="mb-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        ➕ Create New Quiz
      </Link>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Questions</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz._id} className="border-t">
                  <td className="px-4 py-2">{quiz.title}</td>
                  <td className="px-4 py-2 text-center">{quiz.category}</td>
                  <td className="px-4 py-2 text-center">{quiz.level}</td>
                  <td className="px-4 py-2 text-center">{quiz.questions?.length}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <Link
                      to={`/admin/quizzes/${quiz._id}/edit`}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/quizzes/${quiz._id}/bulk-upload`}
                      className="text-blue-600 hover:underline"
                    >
                      Bulk Upload
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// src/pages/admin/AdminQuizPanel.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaUpload,
  FaUserPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import API from "../../services/axios";
import {
  getAllQuizzes,
  updateQuiz as updateQuizService,
} from "../../services/quizService";

export default function AdminQuizPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState(new Set());

  const navigate = useNavigate();

  // Load quizzes on mount
  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    setLoading(true);
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  // Toggle active/inactive
  const toggleActive = async (quizId, current) => {
    try {
      await updateQuizService(quizId, { isActive: !current });
      setQuizzes((qs) =>
        qs.map((q) => (q._id === quizId ? { ...q, isActive: !current } : q))
      );
    } catch (err) {
      alert(
        "Failed to update status: " + (err.response?.data?.message || err.message)
      );
    }
  };

  // Select for bulk operations
  const handleSelect = (quizId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(quizId) ? next.delete(quizId) : next.add(quizId);
      return next;
    });
  };

  // Delete single quiz
  const handleDelete = async (quizId) => {
    if (!window.confirm("Delete this quiz?")) return;
    try {
      await API.delete(`/quizzes/admin/quizzes/${quizId}`);
      setQuizzes((qs) => qs.filter((q) => q._id !== quizId));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(quizId);
        return next;
      });
    } catch (err) {
      alert(
        "Delete failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  // Bulk delete selected quizzes
  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} quizzes?`)) return;
    const toDelete = Array.from(selected);
    for (const id of toDelete) {
      try {
        await API.delete(`/quizzes/admin/quizzes/${id}`);
      } catch (err) {
        console.error(`Failed to delete ${id}:`, err);
      }
    }
    setQuizzes((qs) => qs.filter((q) => !selected.has(q._id)));
    setSelected(new Set());
  };

  // Filter & paginate
  const filtered = quizzes.filter((q) => {
    const term = searchTerm.toLowerCase();
    const topicName =
      q.topic && typeof q.topic === 'object' ? q.topic.name : q.topic || '';
    const categoryName =
      q.category && typeof q.category === 'object'
        ? q.category.name
        : q.category || '';
    const title = q.title || '';
    return (
      topicName.toLowerCase().includes(term) ||
      categoryName.toLowerCase().includes(term) ||
      title.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Quizzes</h1>

        <div className="flex flex-1 md:flex-none items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search quizzes..."
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/quizzes/create")}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + New Quiz
          </button>

          {selected.size > 0 && (
            <button
              type="button"
              onClick={handleBulkDelete}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <FaTrash className="mr-2" /> Delete {selected.size}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase text-center">Topic</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase text-center">Category</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Level</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Questions</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Active</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Edit</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Delete</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Bulk</th>
              <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Assign</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={13} className="py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={13} className="py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={13} className="py-8 text-center text-gray-500">
                  No quizzes found.
                </td>
              </tr>
            ) : (
              paginated.map((q, idx) => (
                <tr
                  key={q._id}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.has(q._id)}
                      onChange={() => handleSelect(q._id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="px-6 py-2 text-sm text-indigo-600 text-center">
                    <Link
                      to={`/admin/quizzes/${q._id}/questions`}
                      className="hover:underline"
                    >
                      {typeof q.topic === 'object' ? q.topic.name : q.topic}
                    </Link>
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700 text-center">
                    {typeof q.category === 'object' ? q.category.name : q.category}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">{q.title}</td>
                  <td className="px-6 py-2 text-sm text-gray-700">{q.level}</td>
                  <td className="px-6 py-2 text-sm text-gray-700">{q.questions?.length ?? 0}</td>
                  <td className="px-6 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={q.isActive}
                      onChange={() => toggleActive(q._id, q.isActive)}
                      className="h-5 w-5 text-indigo-600"
                    />
                  </td>
                  <td className="px-6 py-2 text-center">
                    <Link
                      to={`/admin/quizzes/${q._id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-6 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(q._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td className="px-6 py-2 text-center">
                    <Link
                      to={`/admin/quizzes/${q._id}/bulk-upload`}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaUpload />
                    </Link>
                  </td>
                  <td className="px-6 py-2 text-center">
                    <Link
                      to={`/admin/quizzes/${q._id}/assign`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FaUserPlus />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

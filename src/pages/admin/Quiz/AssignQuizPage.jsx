// src/pages/admin/AssignQuizPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllUsers } from "../../services/userService.js";
import {
  getQuizAssignments,
  assignQuiz,
  unassignQuiz,
} from "../../services/quizService.js";

export default function AssignQuizPage() {
  const { quizId } = useParams();

  // State
  const [users, setUsers]             = useState([]);
  const [assignedIds, setAssignedIds] = useState(new Set());
  const [initialAssigned, setInitial] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState("");

  // 1️⃣ Load users + assignments on mount
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllUsers(),
      getQuizAssignments(quizId)
    ])
      .then(([allUsers, assignments]) => {
        setUsers(allUsers);

        // Ensure assignments is array
        const list = Array.isArray(assignments) ? assignments : [];
        const ids  = list.map(a => a.user._id);

        setAssignedIds(new Set(ids));
        setInitial(ids);
      })
      .catch(err => {
        console.error("Assign load error:", err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  // 2️⃣ Toggle checkbox
  const toggleAssign = userId => {
    setAssignedIds(prev => {
      const next = new Set(prev);
      next.has(userId) ? next.delete(userId) : next.add(userId);
      return next;
    });
  };

  // 3️⃣ Save assignments
  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const currentArr = Array.from(assignedIds);
      const toAdd      = currentArr.filter(id => !initialAssigned.includes(id));
      const toRemove   = initialAssigned.filter(id => !assignedIds.has(id));

      // Call backend
      if (toAdd.length)   await assignQuiz(quizId, toAdd);
      if (toRemove.length) await Promise.all(toRemove.map(uid => unassignQuiz(quizId, uid)));

      // Re-fetch assignments to sync state
      const refreshed = await getQuizAssignments(quizId);
      const refreshedIds = Array.isArray(refreshed)
        ? refreshed.map(a => a.user._id)
        : initialAssigned;  // fallback

      setAssignedIds(new Set(refreshedIds));
      setInitial(refreshedIds);
    } catch (err) {
      console.error("Save assignments error:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  // 4️⃣ Render states
  if (loading) return <p className="p-6 text-center">Loading users…</p>;
  if (error)   return <p className="p-6 text-center text-red-500">{error}</p>;

  // 5️⃣ Main JSX
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Assign Quiz to Users
        </h2>
        <Link
          to="/admin/quizzes"
          className="text-sm text-gray-600 hover:underline"
        >
          &larr; Back to Quizzes
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Select-all checkbox */}
              <th className="w-12 px-6 py-3 text-center">
                <input
                  type="checkbox"
                  checked={assignedIds.size === users.length}
                  onChange={e => {
                    if (e.target.checked) {
                      setAssignedIds(new Set(users.map(u => u._id)));
                    } else {
                      setAssignedIds(new Set());
                    }
                  }}
                />
              </th>
              {/* Columns */}
              {["Name","Email","Role"].map(col => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u, idx) => (
              <tr key={u._id} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                {/* Individual checkbox */}
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={assignedIds.has(u._id)}
                    onChange={() => toggleAssign(u._id)}
                    className="h-4 w-4 text-indigo-600"
                  />
                </td>
                {/* User info */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {u.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                  {u.role.toLowerCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Assignments"}
        </button>
      </div>
    </div>
  );
}

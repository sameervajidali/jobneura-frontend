// src/pages/admin/AssignQuizPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllUsers } from "../../../services/userService.js";
import {
  getQuizAssignments,
  assignQuiz,
  unassignQuiz,
} from "../../../services/quizService.js";

export default function AssignQuizPage() {
  const { quizId } = useParams();

  // State
  const [users, setUsers] = useState([]);
  const [assignedIds, setAssignedIds] = useState(new Set());
  const [initialAssigned, setInitial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1️⃣ Load users + assignments on mount
  useEffect(() => {
    setLoading(true);
    Promise.all([getAllUsers(), getQuizAssignments(quizId)])

      .then(([allUsers, assignments]) => {
        setUsers(allUsers);

        // Ensure assignments is array
        const list = Array.isArray(assignments) ? assignments : [];
        const ids = list.map((a) => a.user._id);

        setAssignedIds(new Set(ids));
        setInitial(ids);
      })
      .catch((err) => {
        console.error("Assign load error:", err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  // 2️⃣ Toggle checkbox
  const toggleAssign = (userId) => {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      next.has(userId) ? next.delete(userId) : next.add(userId);
      return next;
    });
  };

  // 3️⃣ Save assignments
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const currentArr = Array.from(assignedIds);
      const toAdd = currentArr.filter((id) => !initialAssigned.includes(id));
      const toRemove = initialAssigned.filter((id) => !assignedIds.has(id));

      // Call backend
      if (toAdd.length) await assignQuiz(quizId, toAdd);
      if (toRemove.length)
        await Promise.all(toRemove.map((uid) => unassignQuiz(quizId, uid)));

      // Re-fetch assignments to sync state
      const refreshed = await getQuizAssignments(quizId);
      const refreshedIds = Array.isArray(refreshed)
        ? refreshed.map((a) => a.user._id)
        : initialAssigned; // fallback

      setAssignedIds(new Set(refreshedIds));
      setInitial(refreshedIds);
      // only now show success
      setSuccess("✅ Assignments saved!");
    } catch (err) {
      console.error("Save assignments error:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  // 4️⃣ Render states
  if (loading) return <p className="p-6 text-center">Loading users…</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  // 5️⃣ Main JSX
  return (
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl">
      {/* Success toast */}
      {success && (
        <div
          className="mb-6 px-5 py-3 bg-green-50 border border-green-200 text-green-800 rounded-lg shadow-sm animate-fadeOut"
          onAnimationEnd={() => setSuccess("")}
          style={{ animation: "fadeOut 3s forwards" }}
        >
          {success}
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Assign Quiz to Users
        </h2>
        <Link
          to="/admin/quizzes"
          className="inline-block px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg"
        >
          &larr; Back to Quizzes
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-inner">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Select-all checkbox */}
              <th className="w-12 px-6 py-3 text-center">
                <input
                  type="checkbox"
                  checked={assignedIds.size === users.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAssignedIds(new Set(users.map((u) => u._id)));
                    } else {
                      setAssignedIds(new Set());
                    }
                  }}
                />
              </th>
              {/* Columns */}
              {["Name", "Email", "Role"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
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
                    className="h-5 w-5 text-indigo-600"
                  />
                </td>
                {/* User info */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {u.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {(() => {
                    // 1) Array of roles?
                    if (Array.isArray(u.role)) {
                      return u.role
                        .map((r) => String(r).toLowerCase())
                        .join(", ");
                    }

                    // 2) Plain string?
                    if (typeof u.role === "string") {
                      return u.role.toLowerCase();
                    }

                    // 3) Object with a `name` (or `role`) property?
                    if (u.role && typeof u.role === "object") {
                      // adjust the property name if it's different in your API
                      const key = u.role.name
                        ? "name"
                        : u.role.role
                        ? "role"
                        : null;
                      if (key) {
                        return String(u.role[key]).toLowerCase();
                      }
                    }

                    // 4) Fallback
                    return "";
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {saving ? "Saving…" : "Save Assignments"}
        </button>
      </div>
    </div>
  );
}

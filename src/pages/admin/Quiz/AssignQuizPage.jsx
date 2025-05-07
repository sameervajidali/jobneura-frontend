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
  const [users, setUsers] = useState([]);
  const [assignedIds, setAssignedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load all users and current assignments
  useEffect(() => {
    setLoading(true);
    Promise.all([getAllUsers(), getQuizAssignments(quizId)])
      .then(([allUsers, assignments]) => {
        setUsers(allUsers);
        const list = Array.isArray(assignments) ? assignments : [];
        setAssignedIds(new Set(list.map((a) => a.user._id)));
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [quizId]);

  // Toggle a user's assignment
  const toggleAssign = (userId) => {
    setAssignedIds((prev) => {
      const copy = new Set(prev);
      copy.has(userId) ? copy.delete(userId) : copy.add(userId);
      return copy;
    });
  };

  // Save assignments: add new, remove unchecked
  const handleSave = async () => {
    setSaving(true);
    setError("");
    const current = new Set(assignedIds);
    try {
      // Determine additions and removals based on initial state
      const initial = (await getQuizAssignments(quizId)).map((a) => a.user._id);
      const toAdd = allIds([...assignedIds]).filter(
        (id) => !initial.includes(id)
      );
      const toRemove = initial.filter((id) => !assignedIds.has(id));

      // Assign new users
      if (toAdd.length) {
        await assignQuiz(quizId, toAdd);
      }
      // Unassign removed users
      await Promise.all(toRemove.map((uid) => unassignQuiz(quizId, uid)));

      // Refresh assignments
      const refreshed = await getQuizAssignments(quizId);
      setAssignedIds(new Set(refreshed.map((a) => a.user._id)));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading users…</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

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
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={assignedIds.size === users.length}
                  onChange={(e) => {
                    if (e.target.checked)
                      setAssignedIds(new Set(users.map((u) => u._id)));
                    else setAssignedIds(new Set());
                  }}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u, idx) => (
              <tr key={u._id} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={assignedIds.has(u._id)}
                    onChange={() => toggleAssign(u._id)}
                    className="text-blue-600"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {u.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                  {u.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

// Helper to spread Set into array for filtering
function allIds(arr) {
  return arr;
}

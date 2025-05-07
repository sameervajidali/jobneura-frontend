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
  const [users, setUsers]               = useState([]);
  const [assignedIds, setAssignedIds]   = useState(new Set());
  const [initialAssigned, setInitial]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllUsers(), getQuizAssignments(quizId)])
      .then(([allUsers, assignments]) => {
        setUsers(allUsers);
        const list = Array.isArray(assignments) ? assignments : [];
        const ids  = list.map(a => a.user._id);
        setAssignedIds(new Set(ids));
        setInitial(ids);
      })
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [quizId]);

  const toggleAssign = id => {
    setAssignedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const currentArr = Array.from(assignedIds);
      const toAdd      = currentArr.filter(id => !initialAssigned.includes(id));
      const toRemove   = initialAssigned.filter(id => !assignedIds.has(id));

      if (toAdd.length)   await assignQuiz(quizId, toAdd);
      if (toRemove.length) await Promise.all(toRemove.map(uid => unassignQuiz(quizId, uid)));

      // refresh initialAssigned so next change diff works
      setInitial(currentArr);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading users…</p>;
  if (error)   return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-md">
      {/* …rest of your render code stays the same… */}
    </div>
  );
}

// src/pages/admin/Users/UserForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams }     from "react-router-dom";
import API                             from "../../../services/axios";
import { VALID_ROLES }                 from "../../../constants/roles";

export default function UserForm() {
  const { id }       = useParams();       // defined on /admin/users/:id/edit
  const navigate     = useNavigate();
  const isEdit       = Boolean(id);

  const [form, setForm] = useState({
    name:     "",
    email:    "",
    role:     VALID_ROLES[0].toUpperCase(),
    password: "",
    status:   true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");  // success or error

  // Fetch user on edit, or reset on create
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      API.get(`/admin/users/${id}`)
        .then(res => {
          const data = res.data.user ?? res.data;
          setForm({
            name:     data.name,
            email:    data.email,
            role:     data.role.toUpperCase(),
            password: "",
            status:   data.status,
          });
          setMessage("");
        })
        .catch(() => {
          setMessage("Failed to load user data.");
        })
        .finally(() => setLoading(false));
    } else {
      // reset form for “create” mode
      setForm({
        name:     "",
        email:    "",
        role:     VALID_ROLES[0].toUpperCase(),
        password: "",
        status:   true,
      });
      setMessage("");
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      role: form.role.toUpperCase(),
    };

    try {
      if (isEdit) {
        await API.put(`/admin/users/${id}`, payload);
        setMessage("User updated successfully.");
      } else {
        await API.post("/admin/users", payload);
        setMessage("User created successfully.");
      }

      // redirect back to user list after a short pause
      setTimeout(() => navigate("/admin/users"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit User" : "Create New User"}
      </h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading || isEdit}  // prevent changing email on edit
            className={`w-full px-3 py-2 border rounded ${
              isEdit ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Password (only on create) */}
        {!isEdit && (
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          >
            {VALID_ROLES.map(r => {
              const val = r.toUpperCase();
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>

        {/* Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            disabled={loading}
            className="h-4 w-4 text-indigo-600"
          />
          <label className="ml-2 text-sm">Active</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-50"
        >
          {loading
            ? isEdit
              ? "Updating…"
              : "Creating…"
            : isEdit
            ? "Update User"
            : "Create User"}
        </button>
      </form>
    </div>
  );
}

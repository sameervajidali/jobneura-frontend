// src/pages/admin/Users/UserForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRoles, createUser, updateUser } from "../../../services/userService";

export default function UserForm() {
  const { id } = useParams();           // defined on /admin/users/:id/edit
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // all available roles from backend
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");  // success or error
  const [form, setForm] = useState({
    name:     "",
    email:    "",
    role:     "",      // will hold role._id
    password: "",
    isVerified: true,
  });

  // Load roles on mount
  useEffect(() => {
    async function fetchRoles() {
      try {
        const data = await getAllRoles();
        setRoles(data);
        // set default role for creation
       // after fetching roles
if (!isEdit && data.length) {
  setForm(f => ({ ...f, role: data[0].name }));
}
      } catch (err) {
        console.error("Failed to load roles:", err);
      }
    }
    fetchRoles();
  }, [isEdit]);

  // Fetch user on edit
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    async function fetchUser() {
      try {
        const data = await getAllRoles();
      } catch {
        // ignore
      }
      try {
        const payload = await fetch(`/admin/users/${id}`); // adjust endpoint if needed
        // or use service: const userData = await getUserById(id)
        const res = await fetch(`/api/admin/users/${id}`);
        const { user } = await res.json();
        setForm({
          name:       user.name,
          email:      user.email,
          role:       user.role._id,
          password:   "",
          isVerified: user.isVerified,
        });
        setMessage("");
      } catch (err) {
        console.error(err);
        setMessage("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
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
      name:       form.name,
      email:      form.email,
      role:       form.role,
      isVerified: form.isVerified,
    };
    // include password only on create
    if (!isEdit) payload.password = form.password;

    try {
      if (isEdit) {
        await updateUser(id, payload);
        setMessage("User updated successfully.");
      } else {
        await createUser(payload);
        setMessage("User created successfully.");
      }
      setTimeout(() => navigate("/admin/users"), 1000);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Failed to submit user.");
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
            message.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
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
            disabled={loading || isEdit}
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
    {roles.map(r => (
      // r.name is already one of: USER, MODERATOR, etc.
      <option key={r._id} value={r.name}>
        {r.name.charAt(0).toUpperCase() + r.name.slice(1).toLowerCase()}
      </option>
    ))}
  </select>
</div>


        {/* Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isVerified"
            checked={form.isVerified}
            onChange={handleChange}
            disabled={loading}
            className="h-4 w-4 text-indigo-600"
          />
          <label className="ml-2 text-sm">Verified</label>
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

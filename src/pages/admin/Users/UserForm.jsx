import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../services/axios";
import { VALID_ROLES } from "../../../constants/roles";

export default function UserForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "USER", // backend expects uppercase
    password: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchUser = async () => {
        try {
          const { data } = await API.get(`/admin/users/${id}`);
          setForm({
            name: data.name,
            email: data.email,
            role: data.role.toUpperCase(), // normalize to uppercase
            password: "",
            status: data.status,
          });
        } catch (err) {
          setMessage("Failed to load user");
        }
      };
      fetchUser();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        ...form,
        role: form.role.toUpperCase(), // always send uppercase
      };

      if (isEdit) {
        await API.put(`/admin/users/${id}`, payload);
        setMessage("User updated successfully.");
      } else {
        await API.post(`/admin/users`, payload);
        setMessage("User created successfully.");
      }

      setTimeout(() => navigate("/admin/users"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Edit User" : "Create New User"}
      </h2>

      {message && (
        <div className="mb-4 text-sm p-2 rounded bg-red-100 text-red-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {!isEdit && (
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          >
            {VALID_ROLES.map((role) => {
              const value = role.toUpperCase();
              const label = role.charAt(0).toLowerCase().slice(1);
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />
          <label className="text-sm">Active</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Saving..." : isEdit ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}

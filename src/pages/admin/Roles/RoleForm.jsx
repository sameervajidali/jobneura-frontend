// src/pages/admin/Roles/RoleForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams }    from 'react-router-dom';
import { createRole, getRoleById, updateRole } from '../../../services/userService';
import { FaSave } from 'react-icons/fa';

export default function RoleForm() {
  const { id } = useParams();            // undefined for “new”
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:        '',
    description: '',
    permissions: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [error,   setError]   = useState('');

  // If editing, load existing role
  useEffect(() => {
    if (!isEdit) return;
    getRoleById(id)
      .then(r => {
        setForm({
          name:        r.name,
          description: r.description || '',
          permissions: (r.permissions || []).join(', ')
        });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const payload = {
      name:        form.name.trim(),
      description: form.description.trim(),
      permissions: form.permissions
                        .split(',')
                        .map(p => p.trim())
                        .filter(p => p),
    };

    try {
      if (isEdit) {
        await updateRole(id, payload);
      } else {
        await createRole(payload);
      }
      navigate('/admin/roles');
    } catch (e) {
      setError(e.message || 'Save failed');
    }
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Role' : 'New Role'}
      </h1>

      {error && (
        <div className="mb-4 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">
            Permissions (comma-separated)
          </label>
          <input
            name="permissions"
            value={form.permissions}
            onChange={handleChange}
            placeholder="quiz:read, user:update, …"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaSave className="mr-2" /> Save
        </button>
      </form>
    </div>
  );
}

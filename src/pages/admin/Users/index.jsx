// src/pages/admin/Users/AdminUsersPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import API from "../../../services/axios";
import { useAuth } from "../../../contexts/AuthContext";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();
  const { pathname } = useLocation();

useEffect(() => {
  async function loadUsers() {
    setLoading(true);
    try {
      const { data } = await API.get("/admin/users");
      const list = Array.isArray(data) ? data : data.users || [];

      // Exclude SUPERADMIN
      setUsers(list.filter((u) => u.role?.name !== "SUPERADMIN"));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }
  loadUsers();
}, [pathname]);


  // Filter & paginate
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = async id => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="flex items-center w-full sm:w-auto space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search users..."
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-2 py-2"
          >
            {[5, 10, 20, 50].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => navigate("/admin/users/new")}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> New User
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading…</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'View', 'Edit', 'Delete'].map(col => (
                  <th
                    key={col}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center whitespace-nowrap text-indigo-600">
                    <Link to={`/admin/users/${user._id}/history`} className="hover:underline">
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                    {user.role.name.toLowerCase()}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
                    {user.isVerified ? '✅ Verified' : '⏳ Pending'}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <Link to={`/admin/users/${user._id}`} className="text-indigo-600 hover:text-indigo-800">
                      <FaEye />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <Link to={`/admin/users/${user._id}/edit`} className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >Prev</button>
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
}

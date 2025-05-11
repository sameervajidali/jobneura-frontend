// // src/pages/admin/Users/AdminUsersPage.jsx
// import React, { useEffect, useState, useMemo } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import API from '../../../services/axios';
// import { useAuth } from '../../../contexts/AuthContext';

// export default function AdminUsersPage() {
//   const { user: currentUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);

//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const usersPerPage = 10;

//   useEffect(() => {
//     setLoading(true);
//     API.get('/admin/users')
//       .then(({ data }) => {
//         const list = Array.isArray(data) ? data : data.users || [];
//         // Filter to only end-users
//         const onlyUsers = list.filter(u => u.role === 'USER');
//         setUsers(onlyUsers);
//       })
//       .catch(err => {
//         console.error('Failed to load users:', err);
//         setError('Could not load users.');
//       })
//       .finally(() => setLoading(false));
//   }, [pathname]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return users;
//     return users.filter(u =>
//       u.name.toLowerCase().includes(q) ||
//       u.email.toLowerCase().includes(q)
//     );
//   }, [users, query]);

//   const totalPages = Math.ceil(filtered.length / usersPerPage);
//   const pageItems = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);

//   const handleSearch = e => {
//     setQuery(e.target.value);
//     setPage(1);
//   };

//   const handleDelete = async id => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;
//     try {
//       await API.delete(`/admin/users/${id}`);
//       setUsers(prev => prev.filter(u => u._id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//       alert('Delete failed');
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
//         <div className="flex flex-col sm:flex-row sm:items-center w-full max-w-lg gap-2">
//           <div className="relative w-full">
//             <input
//               type="text"
//               value={query}
//               onChange={handleSearch}
//               placeholder="Search users..."
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//           <button
//             onClick={() => navigate('/admin/users/new')}
//             className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             <FaPlus /> New User
//           </button>
//         </div>
//       </div>

//       {/* Body */}
//       {loading ? (
//         <p className="text-gray-600">Loading users…</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <>
//           {filtered.length === 0 ? (
//             <p className="text-gray-600">No users found.</p>
//           ) : (
//             <div className="overflow-x-auto bg-white rounded-lg shadow">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-4 py-2 hidden sm:table-cell text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-4 py-2 hidden md:table-cell text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {pageItems.map(user => (
//                     <tr key={user._id} className="hover:bg-gray-50 transition">
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-600">
//                         <button
//                           onClick={() => navigate(`/admin/users/${user._id}/history`)}
//                           className="hover:underline"
//                         >
//                           {user.name}
//                         </button>
//                       </td>
//                       <td className="px-4 py-3 hidden sm:table-cell whitespace-nowrap text-sm text-gray-600">
//                         {user.email}
//                       </td>
//                       <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap text-sm">
//                         {user.isVerified ? (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
//                             ✅ Verified
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
//                             ⏳ Pending
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-right flex gap-2 justify-end">
//                         <button
//                           onClick={() => navigate(`/admin/users/${user._id}`)}
//                           className="p-1 hover:bg-indigo-50 rounded-full transition"
//                           title="View"
//                         >
//                           <FaEye className="text-indigo-600" />
//                         </button>
//                         <button
//                           onClick={() => navigate(`/admin/users/${user._id}/edit`)}
//                           className="p-1 hover:bg-yellow-50 rounded-full transition"
//                           title="Edit"
//                         >
//                           <FaEdit className="text-yellow-600" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           className="p-1 hover:bg-red-50 rounded-full transition"
//                           title="Delete"
//                         >
//                           <FaTrash className="text-red-600" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//           {/* Pagination */}
//           <div className="flex flex-col sm:flex-row sm:justify-between items-center text-sm text-gray-600 gap-2">
//             <div>
//               Showing <strong>{(page - 1) * usersPerPage + 1}</strong> to {' '}<strong>{Math.min(page * usersPerPage, filtered.length)}</strong> of {' '}<strong>{filtered.length}</strong> users
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage(p => Math.max(p - 1, 1))}
//                 disabled={page === 1}
//                 className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <button
//                 onClick={() => setPage(p => Math.min(p + 1, totalPages))}
//                 disabled={page === totalPages}
//                 className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


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
        // Only end-users
        setUsers(list.filter(u => u.role === "USER"));
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
                    {user.role.toLowerCase()}
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

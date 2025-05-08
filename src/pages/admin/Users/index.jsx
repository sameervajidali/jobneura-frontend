
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import API from '../../../services/axios';

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     fetchUsers();
//   }, [location]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get('/admin/users');
//       const allUsers = Array.isArray(data) ? data : data.users || [];
//       setUsers(allUsers);
//       setFilteredUsers(allUsers);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch users.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;
//     try {
//       await API.delete(`/admin/users/${id}`);
//       const updated = users.filter((u) => u._id !== id);
//       setUsers(updated);
//       setFilteredUsers(updated);
//     } catch (err) {
//       alert('Failed to delete user.');
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(query) ||
//       user.email.toLowerCase().includes(query) ||
//       user.role.toLowerCase().includes(query)
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * usersPerPage,
//     currentPage * usersPerPage
//   );

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//         <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//         <div className="flex flex-col md:flex-row gap-2 items-center">
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             onClick={() => navigate('/admin/users/new')}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             + New User
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto rounded shadow">
//             <table className="min-w-full bg-white">
//               <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
//                 <tr>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Email</th>
//                   <th className="p-3 text-left">Role</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedUsers.map((user) => (
//                   <tr key={user._id} className="border-t hover:bg-gray-50 text-sm">
//                     <td className="p-3">{user.name}</td>
//                     <td className="p-3">{user.email}</td>
//                     <td className="p-3 capitalize">{user.role}</td>
//                     <td className="p-3">
//                       {user.isVerified ? (
//                         <span className="text-green-600 font-medium">✅ Verified</span>
//                       ) : (
//                         <span className="text-yellow-600 font-medium">⏳ Pending</span>
//                       )}
//                     </td>
//                     <td className="p-3 text-right space-x-2">
//                       <button
//                         onClick={() => navigate(`/admin/users/${user._id}`)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => navigate(`/admin/users/${user._id}/edit`)}
//                         className="text-yellow-600 hover:underline"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="mt-4 flex justify-between items-center text-sm">
//             <span>
//               Showing {Math.min((currentPage - 1) * usersPerPage + 1, filteredUsers.length)} to{' '}
//               {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
//             </span>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
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



// src/pages/AdminUsersPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import API from '../../../services/axios';

export default function AdminUsersPage() {
  const [users, setUsers]               = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [query, setQuery]               = useState('');
  const [page, setPage]                 = useState(1);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const navigate                        = useNavigate();
  const { pathname }                    = useLocation();
  const usersPerPage                    = 10;
  const totalPages                      = Math.ceil(filtered.length / usersPerPage);
  const pageItems                       = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);

  useEffect(fetchUsers, [pathname]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/users');
      const list      = Array.isArray(data) ? data : data.users || [];
      setUsers(list);
      setFiltered(list);
    } catch (err) {
      console.error(err);
      setError('Could not load users.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    setPage(1);
    setFiltered(
      users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      )
    );
  }

  async function handleDelete(id) {
    if (!confirm('Delete this user?')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      const updated = users.filter(u => u._id !== id);
      setUsers(updated);
      setFiltered(updated);
    } catch {
      alert('Delete failed');
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <div className="flex flex-1 max-w-md items-center gap-2">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => navigate('/admin/users/new')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FaPlus /> New User
          </button>
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <p className="text-gray-600">Loading users…</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Name','Email','Role','Status','Actions'].map((h, i) => (
                    <th
                      key={i}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        h === 'Actions' ? 'text-right' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageItems.map(user => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-600">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.isVerified ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                          ✅ Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                          ⏳ Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right flex justify-end items-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        className="p-1 hover:text-indigo-600 transition"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                        className="p-1 hover:text-yellow-600 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-1 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing{' '}
              <strong>
                {(page - 1) * usersPerPage + 1}
              </strong>{' '}
              to{' '}
              <strong>
                {Math.min(page * usersPerPage, filtered.length)}
              </strong>{' '}
              of <strong>{filtered.length}</strong> users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import API from "../../../services/axios";
// import { Link } from "react-router-dom";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await API.get("/admin/users");
//         setUsers(data);
//       } catch (err) {
//         setError("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await API.delete(`/admin/users/${id}`);
//       setUsers(users.filter((u) => u._id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLast = currentPage * usersPerPage;
//   const indexOfFirst = indexOfLast - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   if (loading) return <p className="p-4">Loading users...</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
//         <h2 className="text-xl font-semibold">User Management</h2>
//         <div className="flex flex-col md:flex-row gap-2 items-center">
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="px-3 py-2 border rounded-md"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Link
//             to="/admin/users/create"
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             + New User
//           </Link>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm border border-gray-200 rounded-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map((user) => (
//               <tr key={user._id} className="hover:bg-gray-50 border-t">
//                 <td className="px-4 py-2">{user.name}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2 capitalize">{user.role}</td>
//                 <td className="px-4 py-2">
//                   {user.isVerified ? (
//                     <span className="text-green-600">✅ Verified</span>
//                   ) : (
//                     <span className="text-yellow-600">⏳ Pending</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-right space-x-2">
//                   <Link
//                     to={`/admin/users/${user._id}`}
//                     className="text-indigo-600 hover:underline"
//                   >
//                     View
//                   </Link>
//                   <Link
//                     to={`/admin/users/${user._id}/edit`}
//                     className="text-yellow-600 hover:underline"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(user._id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 flex justify-between items-center text-sm">
//         <div>
//           Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filteredUsers.length)} of {filteredUsers.length}
//         </div>
//         <div className="space-x-2">
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               className={`px-3 py-1 rounded border ${
//                 currentPage === i + 1
//                   ? "bg-indigo-600 text-white"
//                   : "hover:bg-gray-200"
//               }`}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/admin/Users/UserList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../services/axios";
import { FaSearch, FaSort, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setUsers(data);
      } catch (err) {
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const filtered = users
    .filter((u) =>
      [u.name, u.email, u.role].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <Link
          to="/admin/users/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + New User
        </Link>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full border px-3 py-2 rounded pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-auto rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Role", key: "role" },
                  { label: "Status", key: "status" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 cursor-pointer"
                    onClick={() => {
                      if (sortKey === key) setSortAsc(!sortAsc);
                      else {
                        setSortKey(key);
                        setSortAsc(true);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      <FaSort className="text-gray-400" />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    {user.isVerified ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <Link to={`/admin/users/${user._id}`} className="text-blue-600 hover:underline">
                      <FaEye />
                    </Link>
                    <Link to={`/admin/users/${user._id}/edit`} className="text-yellow-600 hover:underline">
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:underline">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

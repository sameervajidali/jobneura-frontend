// // src/pages/admin/Users/UserList.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../services/axios";
// import { FaSearch, FaSort, FaEye, FaEdit, FaTrash } from "react-icons/fa";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sortKey, setSortKey] = useState("name");
//   const [sortAsc, setSortAsc] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await API.get("/admin/users");
//         setUsers(data);
//       } catch (err) {
//         alert("Failed to fetch users");
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
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

//   const filtered = users
//     .filter((u) =>
//       [u.name, u.email, u.role].some((field) =>
//         field.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     )
//     .sort((a, b) => {
//       const valA = a[sortKey].toLowerCase();
//       const valB = b[sortKey].toLowerCase();
//       if (valA < valB) return sortAsc ? -1 : 1;
//       if (valA > valB) return sortAsc ? 1 : -1;
//       return 0;
//     });

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
//         <Link
//           to="/admin/users/new"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           + New User
//         </Link>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="w-full border px-3 py-2 rounded pl-10"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaSearch className="absolute top-3 left-3 text-gray-400" />
//         </div>
//       </div>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : (
//         <div className="overflow-auto rounded shadow">
//           <table className="min-w-full divide-y divide-gray-200 bg-white">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   { label: "Name", key: "name" },
//                   { label: "Email", key: "email" },
//                   { label: "Role", key: "role" },
//                   { label: "Status", key: "status" },
//                 ].map(({ label, key }) => (
//                   <th
//                     key={key}
//                     className="px-4 py-3 text-left text-xs font-semibold text-gray-600 cursor-pointer"
//                     onClick={() => {
//                       if (sortKey === key) setSortAsc(!sortAsc);
//                       else {
//                         setSortKey(key);
//                         setSortAsc(true);
//                       }
//                     }}
//                   >
//                     <div className="flex items-center gap-1">
//                       {label}
//                       <FaSort className="text-gray-400" />
//                     </div>
//                   </th>
//                 ))}
//                 <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50 text-sm">
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2 capitalize">{user.role}</td>
//                   <td className="px-4 py-2">
//                     {user.isVerified ? (
//                       <span className="text-green-600">Verified</span>
//                     ) : (
//                       <span className="text-yellow-600">Pending</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 text-right space-x-2">
//                     <Link to={`/admin/users/${user._id}`} className="text-blue-600 hover:underline">
//                       <FaEye />
//                     </Link>
//                     <Link to={`/admin/users/${user._id}/edit`} className="text-yellow-600 hover:underline">
//                       <FaEdit />
//                     </Link>
//                     <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:underline">
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="text-center py-4 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




// src/pages/admin/Users/UserList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../services/axios";
import {
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const PAGE_SIZES = [10, 25, 50, 100];

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setUsers(data);
      } catch {
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
    } catch {
      alert("Failed to delete user");
    }
  };

  const filtered = users
    .filter((u) =>
      [u.name, u.email, u.role].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() || "";
      const valB = b[sortKey]?.toLowerCase?.() || "";
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
        <Link
          to="/admin/users/new"
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
        >
          + New User
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name, email or role..."
            className="w-full border border-gray-300 px-4 py-2 rounded pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        <div>
          <label className="text-sm mr-2">Show</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-1 text-sm"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-auto rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50 text-sm font-semibold">
              <tr>
                {[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Role", key: "role" },
                  { label: "Status", key: "isVerified" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left cursor-pointer"
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
                      {sortKey === key ? (
                        sortAsc ? (
                          <FaSortAlphaUp className="text-gray-400" />
                        ) : (
                          <FaSortAlphaDown className="text-gray-400" />
                        )
                      ) : (
                        <FaSortAlphaUp className="text-gray-200" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paginated.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
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
                  <td className="px-4 py-2 text-right space-x-3">
                    <Link to={`/admin/users/${user._id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </Link>
                    <Link to={`/admin/users/${user._id}/edit`} className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} users
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">{currentPage}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

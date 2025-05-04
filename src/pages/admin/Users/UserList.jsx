// // src/pages/admin/Users/UserList.jsx
// import React, { useEffect, useState } from "react";
// import API from "../../../services/axios";
// import { Link } from "react-router-dom";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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

//   if (loading) return <p className="p-4">Loading users...</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Users</h2>
//         <Link
//           to="/admin/users/create"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           + Create User
//         </Link>
//       </div>
//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2 text-left">Name</th>
//             <th className="border px-4 py-2 text-left">Email</th>
//             <th className="border px-4 py-2 text-left">Role</th>
//             <th className="border px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-50">
//               <td className="border px-4 py-2">{user.name}</td>
//               <td className="border px-4 py-2">{user.email}</td>
//               <td className="border px-4 py-2">{user.role}</td>
//               <td className="border px-4 py-2">
//                 <Link
//                   to={`/admin/users/${user._id}`}
//                   className="text-indigo-600 hover:underline mr-3"
//                 >
//                   View
//                 </Link>
//                 <Link
//                   to={`/admin/users/${user._id}/edit`}
//                   className="text-yellow-600 hover:underline mr-3"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(user._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   async function handleDelete(id) {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await API.delete(`/admin/users/${id}`);
//       setUsers(users.filter((u) => u._id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   }
// }


import React, { useEffect, useState } from "react";
import API from "../../../services/axios";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
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
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="px-3 py-2 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to="/admin/users/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            + New User
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.isVerified ? (
                    <span className="text-green-600">✅ Verified</span>
                  ) : (
                    <span className="text-yellow-600">⏳ Pending</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <Link
                    to={`/admin/users/${user._id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/users/${user._id}/edit`}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm">
        <div>
          Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filteredUsers.length)} of {filteredUsers.length}
        </div>
        <div className="space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

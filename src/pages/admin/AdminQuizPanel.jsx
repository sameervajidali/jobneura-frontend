// // src/pages/admin/AdminQuizPanel.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEdit, FaUpload, FaUserPlus, FaChevronLeft, FaSearch } from "react-icons/fa";
// import {
//   getAllQuizzes,
//   updateQuiz as updateQuizService
// } from "../../services/quizService";

// export default function AdminQuizPanel() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   async function loadQuizzes() {
//     setLoading(true);
//     try {
//       const data = await getAllQuizzes();
//       setQuizzes(data);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const toggleActive = async (quizId, current) => {
//     try {
//       await updateQuizService(quizId, { isActive: !current });
//       setQuizzes(qs => qs.map(q => q._id === quizId ? { ...q, isActive: !current } : q));
//     } catch (err) {
//       alert("Failed to update status: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Filter & paginate
//   const filtered = quizzes.filter(q =>
//     q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     q.topic.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / pageSize) || 1;
//   const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-md">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Quizzes</h1>
//         <div className="flex items-center w-full sm:w-auto space-x-2">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               placeholder="Search quizzes..."
//               className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//           <select
//             value={pageSize}
//             onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
//             className="border border-gray-300 rounded px-2 py-2"
//           >
//             {[5,10,20,50].map(size => (
//               <option key={size} value={size}>{size} per page</option>
//             ))}
//           </select>
//         </div>
//         <button
//           onClick={() => navigate("/admin/quizzes/create")}
//           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           + New Quiz
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading…</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 table-auto">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   "Title",
//                   "Category",
//                   "Topic",
//                   "Level",
//                   "Questions",
//                   "Active",
//                   "Actions"
//                 ].map(col => (
//                   <th
//                     key={col}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     {col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {paginated.map((q, idx) => (
//                 <tr key={q._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                   <td className="px-6 py-4 whitespace-normal">
//                     <Link to={`/admin/quizzes/${q._id}/questions`} className="text-indigo-600 hover:underline">
//                       {q.title}
//                     </Link>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{q.category}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{q.topic}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{q.level}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{q.questions?.length || q.totalMarks || 0}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <input
//                       type="checkbox"
//                       checked={q.isActive}
//                       onChange={() => toggleActive(q._id, q.isActive)}
//                       className="h-5 w-5 text-indigo-600"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
//                     <Link to={`/admin/quizzes/${q._id}/edit`} className="text-blue-600 hover:text-blue-800">
//                       <FaEdit />
//                     </Link>
//                     <Link to={`/admin/quizzes/${q._id}/bulk-upload`} className="text-green-600 hover:text-green-800">
//                       <FaUpload />
//                     </Link>
//                     <Link to={`/admin/quizzes/${q._id}/assign`} className="text-indigo-600 hover:text-indigo-800">
//                       <FaUserPlus />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-4 flex justify-center items-center space-x-4">
//           <button
//             onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//           >Prev</button>
//           <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
//           <button
//             onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//           >Next</button>
//         </div>
//       )}
//     </div>
//   );
// }



// src/pages/admin/AdminQuizPanel.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaUpload, FaUserPlus, FaSearch } from "react-icons/fa";
import { getAllQuizzes, updateQuiz as updateQuizService } from "../../services/quizService";

export default function AdminQuizPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => { loadQuizzes(); }, []);

  async function loadQuizzes() {
    setLoading(true);
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleActive = async (quizId, current) => {
    try {
      await updateQuizService(quizId, { isActive: !current });
      setQuizzes(qs => qs.map(q => q._id === quizId ? { ...q, isActive: !current } : q));
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    }
  };

  // Filter & paginate
  const filtered = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Quizzes</h1>
        <div className="flex items-center w-full sm:w-auto space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search quizzes..."
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-2 py-2"
          >
            {[5,10,20,50].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => navigate("/admin/quizzes/create")}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >+ New Quiz</button>
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
                {[
                  "Title",
                  "Category",
                  "Topic",
                  "Level",
                  "Questions",
                  "Active",
                  "Edit",
                  "Bulk",
                  "Assign"
                ].map(col => (
                  <th
                    key={col}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map((q, idx) => (
                <tr key={q._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 text-center whitespace-normal">
                    <Link to={`/admin/quizzes/${q._id}/questions`} className="text-indigo-600 hover:underline">
                      {q.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">{q.category}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">{q.topic}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">{q.level}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                    {q.questions?.length ?? 0}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={q.isActive}
                      onChange={() => toggleActive(q._id, q.isActive)}
                      className="h-5 w-5 text-indigo-600"
                    />
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <Link to={`/admin/quizzes/${q._id}/edit`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <Link to={`/admin/quizzes/${q._id}/bulk-upload`} className="text-green-600 hover:text-green-800">
                      <FaUpload />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <Link to={`/admin/quizzes/${q._id}/assign`} className="text-indigo-600 hover:text-indigo-800">
                      <FaUserPlus />
                    </Link>
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

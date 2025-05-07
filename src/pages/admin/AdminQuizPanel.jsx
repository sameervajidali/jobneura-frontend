// // src/pages/admin/AdminQuizPanel.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllQuizzes } from "../../services/quizService";

// export default function AdminQuizPanel() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
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

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Manage Quizzes</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={() => navigate("/admin/quizzes/create")}
//         >
//           + New Quiz
//         </button>
//       </div>

//       {loading && <p>Loading…</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               {["Title", "Category", "Topic", "Level", "Active", "Actions"].map(
//                 (h) => (
//                   <th key={h} className="p-2 text-left">
//                     {h}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {quizzes.map((q) => (
//               <tr key={q._id} className="border-t">
//                 <td className="p-2">
//                   <Link
//                     to={`/admin/quizzes/${q._id}/questions`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     {q.title}
//                   </Link>
//                 </td>
//                 <td className="p-2">{q.category}</td>
//                 <td className="p-2">{q.topic}</td>
//                 <td className="p-2">{q.level}</td>
//                 <td className="p-2">{q.isActive ? "✅" : "❌"}</td>
//                 <td className="p-2 space-x-2">
//                   <Link
//                     to={`/admin/quizzes/${q._id}/edit`}
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </Link>
//                   <Link
//                     to={`/admin/quizzes/${q._id}/bulk-upload`}
//                     className="text-sm text-green-600 hover:underline"
//                   >
//                     Bulk Questions
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// src/pages/admin/AdminQuizPanel.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../services/quizService";

export default function AdminQuizPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

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

  if (loading) return <p className="p-6 text-center text-gray-500">Loading…</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Quizzes</h1>
        <button
          onClick={() => navigate("/admin/quizzes/create")}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          + New Quiz
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              {["Title", "Category", "Topic", "Level", "Active", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((q, idx) => (
              <tr
                key={q._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                  <Link
                    to={`/admin/quizzes/${q._id}/questions`}
                    className="text-blue-600 hover:underline"
                  >
                    {q.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {q.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {q.topic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {q.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  {q.isActive ? "✅" : "❌"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                  <Link
                    to={`/admin/quizzes/${q._id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin/quizzes/${q._id}/bulk-upload`}
                    className="text-green-600 hover:text-green-800"
                  >
                    Bulk
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((q, idx) => (
              <tr
                key={q._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {/* …other cells… */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                  <Link
                    to={`/admin/quizzes/${q._id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin/quizzes/${q._id}/bulk-upload`}
                    className="text-green-600 hover:text-green-800"
                  >
                    Bulk
                  </Link>
                  +{" "}
                  <Link
                    to={`/admin/quizzes/${q._id}/assign`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Assign
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

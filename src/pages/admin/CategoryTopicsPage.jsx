// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import topicService from "../../services/topicService";
// import categoryService from "../../services/categoryService";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// export default function CategoryTopicsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [category, setCategory] = useState(null);
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const cat = await categoryService.getCategoryById(id);
//         setCategory(cat);
//         const all = await topicService.getAllTopics({ category: id });
//         setTopics(all);
//       } catch (error) {
//         console.error("Failed to load category topics:", error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   const handleDelete = async (topicId) => {
//     if (!window.confirm("Are you sure you want to delete this topic?")) return;
//     try {
//       await topicService.deleteTopic(topicId);
//       setTopics(prev => prev.filter(t => t._id !== topicId));
//     } catch (err) {
//       alert("Delete failed.");
//     }
//   };

//   if (loading) {
//     return <div className="p-10 text-center text-gray-600 text-lg">Loading topics…</div>;
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-8">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Topics in <span className="text-indigo-600">{category?.name}</span>
//         </h1>
//         <Link
//           to="/admin/topics/new"
//           className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           <FaPlus className="mr-2" /> New Topic
//         </Link>
//       </div>

//       <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-100 dark:bg-gray-700">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//             {topics.length === 0 ? (
//               <tr>
//                 <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
//                   No topics found in this category.
//                 </td>
//               </tr>
//             ) : (
//               topics.map((t, idx) => (
//                 <tr key={t._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{idx + 1}</td>
//                   <td className="px-6 py-4 text-sm font-medium text-indigo-700 dark:text-indigo-400">
//                     {t.name}
//                   </td>
//                   <td className="px-6 py-4 text-center space-x-3">
//                     <button
//                       onClick={() => navigate(`/admin/topics/${t._id}/edit`)}
//                       className="inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100"
//                     >
//                       <FaEdit className="mr-1" /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(t._id)}
//                       className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
//                     >
//                       <FaTrash className="mr-1" /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import topicService from "../../services/topicService";
import categoryService from "../../services/categoryService";
import { FaPlus, FaEdit, FaTrash, FaUpload } from "react-icons/fa";

export default function CategoryTopicsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bulk upload modal state
  const [bulkModal, setBulkModal] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const cat = await categoryService.getCategoryById(id);
        setCategory(cat);
        const all = await topicService.getAllTopics({ category: id });
        setTopics(all);
      } catch (error) {
        console.error("Failed to load category topics:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async (topicId) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await topicService.deleteTopic(topicId);
      setTopics(prev => prev.filter(t => t._id !== topicId));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // BULK UPLOAD HANDLER
  async function handleBulkUpload() {
    setUploading(true);
    setUploadResult(null);
    try {
      let res;
      if (jsonText) {
        // Upload via JSON
        // Ensure each topic has the correct category id
        const data = JSON.parse(jsonText).map(item => ({ ...item, category: id }));
        res = await topicService.bulkUploadTopicsJSON({ topics: data });
      } else if (file) {
        // Upload via CSV/XLSX
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", id);
        res = await topicService.bulkUploadTopicsCSV(formData);
      }
      // Refresh topics if upload successful
      if (res && res.createdTopics) {
        setTopics(prev => [...prev, ...res.createdTopics]);
      } else {
        // Or reload from backend for accuracy
        const all = await topicService.getAllTopics({ category: id });
        setTopics(all);
      }
      setUploadResult(res);
    } catch (err) {
      setUploadResult({ error: err?.response?.data?.message || err.message });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* BULK UPLOAD MODAL */}
      {bulkModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Bulk Upload Topics</h2>
            <div className="space-y-3">
              <textarea
                value={jsonText}
                onChange={e => setJsonText(e.target.value)}
                placeholder='Paste JSON array of topics here (e.g. [{"name":...}])'
                rows={5}
                className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
              />
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={e => setFile(e.target.files[0])}
                  className="block"
                />
                <span className="text-xs text-gray-500">or upload CSV/XLSX</span>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setBulkModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUpload}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                  disabled={uploading || (!jsonText && !file)}
                >
                  {uploading ? "Uploading…" : "Upload"}
                </button>
              </div>
              {uploadResult && (
                <div className="mt-4">
                  <pre className="p-2 bg-gray-100 rounded text-sm overflow-x-auto">{JSON.stringify(uploadResult, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Topics in <span className="text-indigo-600">{category?.name}</span>
        </h1>
        <div className="flex gap-2">
          <Link
            to="/admin/topics/new"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> New Topic
          </Link>
          <button
            onClick={() => setBulkModal(true)}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <FaUpload className="mr-2" /> Bulk Upload
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {topics.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No topics found in this category.
                </td>
              </tr>
            ) : (
              topics.map((t, idx) => (
                <tr key={t._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-700 dark:text-indigo-400">
                    {t.name}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/topics/${t._id}/edit`)}
                      className="inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

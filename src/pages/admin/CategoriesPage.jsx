// // src/pages/admin/CategoriesPage.jsx
// import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaSearch,
//   FaSort,
//   FaSortUp,
//   FaSortDown,
// } from "react-icons/fa";
// import categoryService from "../../services/categoryService";

// export default function CategoriesPage() {
//   const [cats, setCats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   // Multi-select state
//   const [selectedIds, setSelectedIds] = useState(new Set());

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // Sorting state
//   const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const data = await categoryService.getAllCategories();
//         setCats(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Filter + Sort + Paginate
//   const processed = useMemo(() => {
//     // Filter
//     let filtered = cats.filter((c) => {
//       const term = search.toLowerCase();
//       return (
//         c.name.toLowerCase().includes(term) ||
//         (c.description || "").toLowerCase().includes(term)
//       );
//     });

//     // Sort
//     const { key, direction } = sortConfig;
//     filtered.sort((a, b) => {
//       const aVal = (a[key] || "").toLowerCase();
//       const bVal = (b[key] || "").toLowerCase();
//       if (aVal < bVal) return direction === "asc" ? -1 : 1;
//       if (aVal > bVal) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     // Paginate
//     const start = (currentPage - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [cats, search, sortConfig, currentPage, pageSize]);

//   const totalCount = useMemo(
//     () =>
//       cats.filter((c) =>
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         (c.description || "").toLowerCase().includes(search.toLowerCase())
//       ).length,
//     [cats, search]
//   );

//   const totalPages = Math.ceil(totalCount / pageSize) || 1;

//   // Sorting handler
//   function handleSort(key) {
//     setSortConfig((cfg) => {
//       if (cfg.key === key) {
//         return { key, direction: cfg.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   }

//   // Select handlers
//   const toggleSelect = (id) => {
//     setSelectedIds((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };
//   const toggleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(new Set(processed.map((c) => c._id)));
//     } else {
//       setSelectedIds(new Set());
//     }
//   };

//   // Delete handlers
//   async function handleDelete(id) {
//     if (!window.confirm("Delete this category?")) return;
//     try {
//       await categoryService.deleteCategory(id);
//       setCats((cs) => cs.filter((c) => c._id !== id));
//       setSelectedIds((s) => {
//         const next = new Set(s);
//         next.delete(id);
//         return next;
//       });
//     } catch (err) {
//       alert("Delete failed: " + (err.response?.data?.message || err.message));
//     }
//   }

//   async function handleDeleteSelected() {
//     if (selectedIds.size === 0) return;
//     if (!window.confirm(`Delete ${selectedIds.size} categories?`)) return;
//     try {
//       await Promise.all(
//         Array.from(selectedIds).map((id) => categoryService.deleteCategory(id))
//       );
//       setCats((cs) => cs.filter((c) => !selectedIds.has(c._id)));
//       setSelectedIds(new Set());
//     } catch (err) {
//       alert("Bulk delete failed: " + err.message);
//     }
//   }

//   return (
//     <div className="p-6 space-y-6 max-w-7xl mx-auto">
//       {/* Header & Actions */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <h1 className="text-2xl font-semibold">Categories</h1>
//         <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
//           <div className="relative flex-1 md:flex-none">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               placeholder="Search categories..."
//               className="w-full md:w-64 border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//           <Link
//             to="new"
//             className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             <FaPlus className="mr-1" /> New Category
//           </Link>
//           {selectedIds.size > 0 && (
//             <button
//               type="button"
//               onClick={handleDeleteSelected}
//               className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               <FaTrash className="mr-1" /> Delete ({selectedIds.size})
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2">
//                 <input
//                   type="checkbox"
//                   onChange={toggleSelectAll}
//                   checked={
//                     processed.length > 0 &&
//                     processed.every((c) => selectedIds.has(c._id))
//                   }
//                 />
//               </th>
//               <th
//                 className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
//                 onClick={() => handleSort("sr")}
//               >
//                 <SortIcon label="#" sortKey="sr" sortConfig={sortConfig} />
//               </th>
//               <th
//                 className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
//                 onClick={() => handleSort("name")}
//               >
//                 <SortIcon label="Name" sortKey="name" sortConfig={sortConfig} />
//               </th>
//               <th
//                 className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
//                 onClick={() => handleSort("description")}
//               >
//                 <SortIcon
//                   label="Description"
//                   sortKey="description"
//                   sortConfig={sortConfig}
//                 />
//               </th>
//               <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="py-8 text-center text-gray-500">
//                   Loading…
//                 </td>
//               </tr>
//             ) : processed.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="py-8 text-center text-gray-500">
//                   No categories found.
//                 </td>
//               </tr>
//             ) : (
//               processed.map((cat, idx) => (
//                 <tr
//                   key={cat._id}
//                   className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                 >
//                   <td className="px-4 py-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.has(cat._id)}
//                       onChange={() => toggleSelect(cat._id)}
//                       className="h-4 w-4"
//                     />
//                   </td>
//                   <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
//                     {(currentPage - 1) * pageSize + idx + 1}
//                   </td>
//                   <td className="px-6 py-2 text-sm text-gray-900">{cat.name}</td>
//                   <td className="px-6 py-2 text-sm text-gray-700">{cat.description || '—'}</td>
//                   <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
//                     <Link
//                       to={`/${cat._id}/edit`}
//                       className="text-yellow-600 hover:text-yellow-800 mr-4"
//                     >
//                       <FaEdit />
//                     </Link>
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(cat._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
//           <div className="flex items-center gap-2">
//             <label className="text-sm">Rows per page:</label>
//             <select
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(+e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="border px-2 py-1 rounded"
//             >
//               {[5, 10, 20, 50].map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               type="button"
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               type="button"
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Sort icon helper
// function SortIcon({ label, sortKey, sortConfig }) {
//   const isActive = sortConfig.key === sortKey;
//   return (
//     <span className="inline-flex items-center gap-1">
//       {label}
//       {isActive ? (
//         sortConfig.direction === "asc" ? (
//           <FaSortUp />
//         ) : (
//           <FaSortDown />
//         )
//       ) : (
//         <FaSort className="text-gray-300" />
//       )}
//     </span>
//   );
// }



import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import categoryService from "../../services/categoryService";

export default function CategoriesPage() {
  const [cats, setCats]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await categoryService.getAllCategories();
        setCats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filter + sort pipeline
  const processed = useMemo(() => {
    const term = search.toLowerCase();
    return cats
      .filter(c =>
        c.name.toLowerCase().includes(term) ||
        (c.description || "").toLowerCase().includes(term)
      )
      .sort((a, b) => {
        const aVal = (a[sortConfig.key] || "").toLowerCase();
        const bVal = (b[sortConfig.key] || "").toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [cats, search, sortConfig]);

  const handleSort = key => {
    setSortConfig(cfg => ({
      key,
      direction: cfg.key === key && cfg.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await categoryService.deleteCategory(id);
      setCats(cs => cs.filter(c => c._id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <input
              type="text"
              className="w-full lg:w-64 border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link
            to="new"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> New Category
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" disabled /></th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("sr")}
              >
                <SortIcon label="#" sortKey="sr" sortConfig={sortConfig} />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <SortIcon label="Name" sortKey="name" sortConfig={sortConfig} />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("description")}
              >
                <SortIcon label="Description" sortKey="description" sortConfig={sortConfig} />
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : processed.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              processed.map((cat, idx) => (
                <tr
                  key={cat._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600" disabled />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">{cat.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {cat.description || "—"}
                  </td>
                  <td className="px-6 py-3 text-center text-sm space-x-3">
                    <Link
                      to={`/admin/categories/${cat._id}/edit`}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
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

// Sort icon helper
function SortIcon({ label, sortKey, sortConfig }) {
  const isActive = sortConfig.key === sortKey;
  return (
    <span className="inline-flex items-center gap-1 text-gray-700">
      {label}
      {isActive
        ? sortConfig.direction === "asc"
          ? <FaSortUp />
          : <FaSortDown />
        : <FaSort className="text-gray-300" />
      }
    </span>
  );
}


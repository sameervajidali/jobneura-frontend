// src/pages/admin/CategoriesPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
} from "react-icons/fa";
import categoryService from "../../services/categoryService";

export default function CategoriesPage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

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

  const processed = useMemo(() => {
    const term = search.toLowerCase();
    return cats
      .filter(
        (c) =>
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

  const handleSort = (key) => {
    setSortConfig((cfg) => ({
      key,
      direction: cfg.key === key && cfg.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await categoryService.deleteCategory(id);
      setCats((list) => list.filter((c) => c._id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-64 border border-gray-300 rounded pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Link
            to="new"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> New Category
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Visible
              </th>
              <th className="w-40 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : processed.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              processed.map((cat, idx) => (
                <tr
                  key={cat._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-3 text-sm text-indigo-600">
                    <Link
                      to={`/admin/categories/${cat._id}/topics`}
                      className="hover:underline"
                    >
                      {cat.name}
                    </Link>
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-700">
                    {cat.description || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700 capitalize">
                    {cat.type || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-green-600 text-center">
                    <FaEye title="Visible" />
                  </td>
                  <td className="px-6 py-3 text-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(cat._id)}
                      className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/admin/categories/${cat._id}/edit`}
                      className="inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100"
                    >
                      <FaEdit />
                    </Link>
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

function SortIcon({ label, sortKey, sortConfig }) {
  const isActive = sortConfig.key === sortKey;
  return (
    <span className="inline-flex items-center gap-1 text-gray-700">
      {label}
      {isActive ? (
        sortConfig.direction === "asc" ? (
          <FaSortUp />
        ) : (
          <FaSortDown />
        )
      ) : (
        <FaSort className="text-gray-300" />
      )}
    </span>
  );
}

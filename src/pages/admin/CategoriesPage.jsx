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
} from "react-icons/fa";
import categoryService from "../../services/categoryService";

export default function CategoriesPage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Multi-select state
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((data) => setCats(data))
      .finally(() => setLoading(false));
  }, []);

  // Filtered → Sorted → Paginated
  const processed = useMemo(() => {
    let filtered = cats.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.description || "").toLowerCase().includes(search.toLowerCase())
    );

    // sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // pagination
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [cats, search, sortConfig, currentPage, pageSize]);

  const totalCount = useMemo(
    () =>
      cats.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          (c.description || "").toLowerCase().includes(search.toLowerCase())
      ).length,
    [cats, search]
  );

  function handleSort(key) {
    setSortConfig((cfg) => {
      if (cfg.key === key) {
        // toggle direction
        return {
          key,
          direction: cfg.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return { key, direction: "asc" };
      }
    });
  }

  function toggleSelect(id) {
    setSelectedIds((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectAll(e) {
    if (e.target.checked) {
      setSelectedIds(new Set(processed.map((c) => c._id)));
    } else {
      setSelectedIds(new Set());
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this category?")) return;
    await categoryService.deleteCategory(id);
    setCats((cs) => cs.filter((c) => c._id !== id));
    setSelectedIds((s) => {
      s.delete(id);
      return new Set(s);
    });
  }

  async function handleDeleteSelected() {
    if (!window.confirm(`Delete ${selectedIds.size} categories?`)) return;
    await Promise.all(
      Array.from(selectedIds).map((id) => categoryService.deleteCategory(id))
    );
    setCats((cs) => cs.filter((c) => !selectedIds.has(c._id)));
    setSelectedIds(new Set());
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6 space-y-6">
      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search…"
              className="pl-10 pr-4 py-2 border rounded w-full sm:w-64"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link
            to="new"
            className="bg-indigo-600 text-white px-3 py-2 rounded flex items-center gap-2 whitespace-nowrap"
          >
            <FaPlus /> New Category
          </Link>
          {selectedIds.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-2 whitespace-nowrap"
            >
              <FaTrash /> Delete Selected ({selectedIds.size})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      processed.length > 0 &&
                      processed.every((c) => selectedIds.has(c._id))
                    }
                  />
                </th>
                <th
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  onClick={() => handleSort("sr")}
                >
                  <SortIcon label="SR" sortKey="sr" sortConfig={sortConfig} />
                </th>
                {["name", "description"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort(col)}
                  >
                    <SortIcon
                      label={col.charAt(0).toUpperCase() + col.slice(1)}
                      sortKey={col}
                      sortConfig={sortConfig}
                    />
                  </th>
                ))}
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {processed.map((cat, idx) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(cat._id)}
                      onChange={() => toggleSelect(cat._id)}
                    />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {cat.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {cat.description || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`${cat._id}/edit`}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {processed.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
          <div className="flex items-center gap-2">
            <label>Rows per page:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(+e.target.value);
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Sort icon helper
function SortIcon({ label, sortKey, sortConfig }) {
  const isActive = sortConfig.key === sortKey;
  return (
    <span className="inline-flex items-center gap-1">
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

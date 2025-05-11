// src/pages/admin/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import categoryService from "../../services/categoryService";

export default function CategoriesPage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    categoryService.getAllCategories().then(setCats).finally(() => setLoading(false));
  }, []);

  const filtered = cats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await categoryService.deleteCategory(id);
    setCats(cs => cs.filter(c => c._id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="pl-10 pr-4 py-2 border rounded"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link to="new" className="bg-indigo-600 text-white px-3 py-2 rounded flex items-center gap-2">
            <FaPlus /> New Category
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name","Description","Actions"].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {filtered.map(cat => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4">{cat.description || "—"}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link to={`${cat._id}/edit`} className="text-yellow-600 hover:text-yellow-800"><FaEdit/></Link>
                    <button onClick={()=>handleDelete(cat._id)} className="text-red-600 hover:text-red-800"><FaTrash/></button>
                  </td>
                </tr>
              ))}
              {filtered.length===0 && (
                <tr><td colSpan={3} className="px-6 py-4 text-center">No categories found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

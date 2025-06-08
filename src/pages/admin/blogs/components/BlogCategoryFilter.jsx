import React, { useEffect, useState } from "react";
import blogCategoryService from "../../../services/blogCategoryService";
import { FaTags } from "react-icons/fa";

export default function BlogCategoryFilter({ value, onChange, disabled }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogCategoryService
      .list()
      .then((cats) => setCategories(cats || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex items-center gap-2">
      <FaTags className="text-gray-400" />
      <select
        className="input px-2 py-1 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading}
        style={{ minWidth: 120 }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      {loading && <span className="ml-2 text-xs text-gray-400">Loading…</span>}
    </div>
  );
}

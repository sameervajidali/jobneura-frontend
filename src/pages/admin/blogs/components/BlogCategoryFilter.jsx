import React from 'react';

export default function BlogCategoryFilter({ categories = [], value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="category-filter" className="sr-only">
        Filter by Category
      </label>
      <select
        id="category-filter"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

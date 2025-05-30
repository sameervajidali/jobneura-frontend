import React from 'react';

export default function BlogStatusFilter({ value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="status-filter" className="sr-only">
        Filter by Status
      </label>
      <select
        id="status-filter"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>
    </div>
  );
}

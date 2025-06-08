import React from "react";
import { FaFilter } from "react-icons/fa";

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export default function BlogStatusFilter({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-2">
      <FaFilter className="text-gray-400" />
      <select
        className="input px-2 py-1 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{ minWidth: 120 }}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

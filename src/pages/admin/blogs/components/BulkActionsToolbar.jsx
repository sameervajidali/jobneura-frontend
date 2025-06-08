// src/pages/admin/blogs/components/BulkActionsToolbar.jsx

import React from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

export default function BulkActionsToolbar({
  count,
  onDelete,
  onClear,
  onPublish, // (optional: pass if you want bulk publish)
  disabled,
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center p-3 mb-2 bg-blue-50 border border-blue-200 rounded shadow-sm animate-fade-in">
      <span className="font-semibold text-blue-700">
        {count} selected
      </span>
      {onPublish && (
        <button
          className="btn btn-success"
          onClick={onPublish}
          disabled={disabled}
        >
          Publish Selected
        </button>
      )}
      <button
        className="btn btn-danger"
        onClick={onDelete}
        disabled={disabled}
      >
        <FaTrash className="mr-1" />
        Delete Selected
      </button>
      <button className="btn btn-light" onClick={onClear} disabled={disabled}>
        <FaTimes className="mr-1" />
        Clear
      </button>
    </div>
  );
}

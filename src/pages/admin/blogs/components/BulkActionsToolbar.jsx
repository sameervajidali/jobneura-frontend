import React from 'react';

export default function BulkActionsToolbar({ selectedCount, onDelete, onPublish, onUnpublish }) {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 flex items-center space-x-4 bg-gray-100 p-3 rounded">
      <p className="text-gray-700 font-medium">{selectedCount} selected</p>

      <button
        onClick={onPublish}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Publish
      </button>

      <button
        onClick={onUnpublish}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Unpublish
      </button>

      <button
        onClick={onDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </div>
  );
}

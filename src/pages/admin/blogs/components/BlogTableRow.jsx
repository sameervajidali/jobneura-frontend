import React from 'react';

export default function BlogTableRow({ blog, isSelected, toggleSelect, onDeleted, onEdit }) {
  const { _id, title, authorName, categoryName, status, createdAt } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  // Confirm delete action before invoking callback
  const handleDelete = () => {
    if (window.confirm(`Delete blog "${title}"? This action cannot be undone.`)) {
      onDeleted(_id);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelect}
          aria-label={`Select blog titled ${title}`}
          className="cursor-pointer"
        />
      </td>

      <td className="border px-4 py-2 break-words max-w-xs">{title}</td>

      <td className="border px-4 py-2 truncate max-w-xs" title={authorName || 'Unknown author'}>
        {authorName || 'Unknown'}
      </td>

      <td className="border px-4 py-2 truncate max-w-xs" title={categoryName || 'Uncategorized'}>
        {categoryName || 'N/A'}
      </td>

      <td className="border px-4 py-2 capitalize">{status}</td>

      <td className="border px-4 py-2 whitespace-nowrap">{formattedDate}</td>

      <td className="border px-4 py-2 text-center space-x-3">
        {/* Edit Button */}
        <button
          type="button"
          title="Edit blog"
          onClick={onEdit}
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          aria-label={`Edit blog titled ${title}`}
        >
          ✏️
        </button>

        {/* Delete Button */}
        <button
          type="button"
          title="Delete blog"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
          aria-label={`Delete blog titled ${title}`}
        >
          🗑️
        </button>

        {/* Preview Button */}
        <button
          type="button"
          title="Preview blog"
          onClick={() => window.open(`/blogs/${_id}`, '_blank', 'noopener,noreferrer')}
          className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          aria-label={`Preview blog titled ${title}`}
        >
          👁️
        </button>
      </td>
    </tr>
  );
}

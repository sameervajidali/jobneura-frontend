import React from "react";
import { useNavigate } from 'react-router-dom';
export default function BlogTableRow({
  blog,
  isSelected,
  toggleSelect,
  onDeleted,
}) {
  const { _id, title, author, category, status, createdAt } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleDelete = () => {
    if (
      window.confirm(`Delete blog "${title}"? This action cannot be undone.`)
    ) {
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
          aria-label={`Select blog ${title}`}
          className="cursor-pointer"
        />
      </td>
      <td className="border px-4 py-2">{title}</td>
      <td className="border px-4 py-2">
        {author?.name || author?.email || "-"}
      </td>
      <td className="border px-4 py-2">{category?.name || "-"}</td>{" "}
      {/* Nested category */}
      <td className="border px-4 py-2 capitalize">{status}</td>
      <td className="border px-4 py-2">{formattedDate}</td>
      <td className="border px-4 py-2 text-center space-x-2">
        <button
          type="button"
          title="Edit blog"
          className="text-indigo-600 hover:underline cursor-pointer"
          onClick={() => (window.location.href = `/admin/blogs/edit/${_id}`)}
        >
          ✏️
        </button>
        <button
          type="button"
          title="Delete blog"
          className="text-red-600 hover:underline cursor-pointer"
          onClick={handleDelete}
        >
          🗑️
        </button>
        <button
          type="button"
          title="Preview blog"
          className="text-green-600 hover:underline cursor-pointer"
          onClick={() => navigate(`/admin/blogs/review/${_id}`)}
        >
          👁️
        </button>
      </td>
    </tr>
  );
}

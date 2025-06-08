import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { cn } from "@/lib/utils"; // Use your classnames utility if available

export default function BlogTableRow({
  post,
  selected,
  onSelect,
  onPreview,
  onEdit,
  onDelete,
}) {
  return (
    <tr
      className={cn(
        "border-t hover:bg-gray-50 transition",
        selected && "bg-blue-50"
      )}
    >
      {/* Select checkbox */}
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(post._id)}
          aria-label="Select row"
        />
      </td>
      {/* Title (clickable for preview) */}
      <td className="p-2">
        <span
          className="font-semibold cursor-pointer hover:underline"
          onClick={() => onPreview(post)}
        >
          {post.title}
        </span>
      </td>
      {/* Category */}
      <td className="p-2">{post.category?.name || "-"}</td>
      {/* Status (colored badge) */}
      <td className="p-2">
        <span
          className={cn(
            "inline-block px-2 py-1 rounded-full text-xs",
            {
              "bg-green-100 text-green-800": post.status === "published",
              "bg-yellow-100 text-yellow-700": post.status === "draft",
              "bg-blue-100 text-blue-700": post.status === "review",
              "bg-gray-200 text-gray-700": post.status === "archived",
            }
          )}
        >
          {post.status}
        </span>
      </td>
      {/* Author */}
      <td className="p-2">{post.author?.name || "-"}</td>
      {/* Published date */}
      <td className="p-2">
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString()
          : "-"}
      </td>
      {/* Actions */}
      <td className="p-2 flex gap-2 justify-center">
        <button
          className="icon-btn"
          title="Preview"
          onClick={() => onPreview(post)}
        >
          <FaEye />
        </button>
        <button
          className="icon-btn"
          title="Edit"
          onClick={() => onEdit(post)}
        >
          <FaEdit />
        </button>
        <button
          className="icon-btn text-red-500"
          title="Delete"
          onClick={() => onDelete(post)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

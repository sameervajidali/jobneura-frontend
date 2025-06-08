import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

// Close modal on Esc key or click outside
function useCloseOnOutside(ref, onClose) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onClose]);
}

export default function AdminBlogPreviewModal({ post, onClose }) {
  const modalRef = useRef();
  useCloseOnOutside(modalRef, onClose);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2 animate-fade-in">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-slide-up"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="Close preview"
        >
          <FaTimes size={20} />
        </button>
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt="cover"
            className="w-full h-52 object-cover rounded mb-4"
          />
        )}
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-500">
          <span>
            <b>Status:</b>{" "}
            <span
              className={
                post.status === "published"
                  ? "text-green-600"
                  : post.status === "draft"
                  ? "text-yellow-600"
                  : post.status === "review"
                  ? "text-blue-600"
                  : "text-gray-600"
              }
            >
              {post.status}
            </span>
          </span>
          <span>
            <b>Category:</b> {post.category?.name || "-"}
          </span>
          <span>
            <b>Author:</b> {post.author?.name || "-"}
          </span>
          <span>
            <b>Published:</b>{" "}
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : "-"}
          </span>
        </div>
        {post.summary && (
          <div className="mb-3 italic text-gray-700">{post.summary}</div>
        )}
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.tags && post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag._id || tag}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
              >
                {tag.name || tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

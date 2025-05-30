import React, { useEffect } from 'react';

export default function AdminBlogPreviewModal({ isOpen, onClose, blog }) {
  // Close on ESC key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
    } else {
      document.removeEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !blog) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <div className="bg-white rounded shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-6 relative">
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>

        <h2 id="preview-title" className="text-2xl font-bold mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          By {blog.authorName || 'Unknown'} |{' '}
          {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Unpublished'}
        </p>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}

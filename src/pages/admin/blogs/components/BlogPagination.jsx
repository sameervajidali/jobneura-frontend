import React from 'react';

export default function BlogPagination({ total, currentPage, pageSize, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null; // No pagination needed

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-6 flex justify-center items-center space-x-3 select-none"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>

      <span className="px-3 py-1 border rounded bg-indigo-600 text-white">
        {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>

      <span className="ml-4 text-gray-600 select-text">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  );
}

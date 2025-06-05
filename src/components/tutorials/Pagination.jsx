import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const DOTS = '...';

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };

  const pages = paginationRange();

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center space-x-2 mt-8 select-none"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? 'text-gray-400 border-gray-300 cursor-not-allowed'
            : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === DOTS ? (
          <span
            key={`dots-${index}`}
            className="px-3 py-1 text-gray-500 select-none"
          >
            &#8230;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-300 cursor-not-allowed'
            : 'text-indigo-600 border-indigo-600 hover:bg-indigo-100'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        Next
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
};

export default Pagination;

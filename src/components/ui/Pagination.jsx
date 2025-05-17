export default function Pagination({ page, setPage, totalPages }) {
  if (totalPages < 2) return null;
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        className="px-3 py-1 rounded bg-gray-100"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >Prev</button>
      <span className="px-4 py-1">{page} / {totalPages}</span>
      <button
        className="px-3 py-1 rounded bg-gray-100"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >Next</button>
    </div>
  );
}

export default function JobFilters({ filters, setFilters }) {
  return (
    <form className="flex flex-wrap gap-4 mb-6 bg-white/50 backdrop-blur rounded-xl p-4 shadow">
      <input
        type="text"
        placeholder="Keyword or Company"
        className="border rounded px-3 py-2 flex-1"
        value={filters.q || ""}
        onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Location"
        className="border rounded px-3 py-2 flex-1"
        value={filters.location || ""}
        onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
      />
      {/* Add more: job type, remote, etc. */}
      <button
        type="button"
        className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold"
        onClick={e => e.preventDefault()}
      >
        Search
      </button>
    </form>
  );
}

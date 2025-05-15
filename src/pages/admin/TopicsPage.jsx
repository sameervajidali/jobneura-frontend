import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import topicService from "../../services/topicService";

export default function TopicsPage() {
  const [topics, setTopics]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await topicService.getAllTopics();
        setTopics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return topics.filter(t => {
      const name = t.name || "";
      const catName = (t.category && t.category.name) || "";
      return (
        name.toLowerCase().includes(term) ||
        catName.toLowerCase().includes(term)
      );
    });
  }, [topics, search]);

  const handleDelete = async id => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      await topicService.deleteTopic(id);
      setTopics(ts => ts.filter(t => t._id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Topics</h1>
        <div className="flex flex-1 md:flex-none items-center gap-2">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              className="w-full md:w-64 border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Search topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link
            to="new"
            className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <FaPlus className="mr-1" /> New Topic
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No topics found.
                </td>
              </tr>
            ) : (
              filtered.map((t, idx) => (
                <tr key={t._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{t.name}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{t.category?.name || "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                    <Link
                      to={`${t._id}/edit`}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(t._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

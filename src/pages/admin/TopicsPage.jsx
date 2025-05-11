// src/pages/admin/TopicsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import topicService from "../../../services/topicService";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    topicService.getAllTopics().then(setTopics).finally(() => setLoading(false));
  }, []);

  const filtered = topics.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async id => {
    if (!window.confirm("Delete this topic?")) return;
    await topicService.deleteTopic(id);
    setTopics(ts => ts.filter(t => t._id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Topics</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="pl-10 pr-4 py-2 border rounded"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link to="new" className="bg-indigo-600 text-white px-3 py-2 rounded flex items-center gap-2">
            <FaPlus /> New Topic
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name","Category","Actions"].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {filtered.map(t => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{t.name}</td>
                  <td className="px-6 py-4">{t.category.name}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link to={`${t._id}/edit`} className="text-yellow-600 hover:text-yellow-800"><FaEdit/></Link>
                    <button onClick={()=>handleDelete(t._id)} className="text-red-600 hover:text-red-800"><FaTrash/></button>
                  </td>
                </tr>
              ))}
              {filtered.length===0 && (
                <tr><td colSpan={3} className="px-6 py-4 text-center">No topics found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

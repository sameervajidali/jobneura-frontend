import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
import { getAllTickets } from '../../services/ticketService';

export default function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);
      try {
        const { tickets: items, total: count } = await getAllTickets({ page, limit, search });
        setTickets(items);
        setTotal(count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [page, limit, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Support Tickets</h1>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tickets…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={limit}
            onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[5, 10, 20, 50].map(n => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">Loading…</td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">No tickets found.</td>
              </tr>
            ) : (
              tickets.map((t, i) => (
                <tr key={t._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{(page - 1) * limit + i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{t.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      t.status === 'open' ? 'bg-green-100 text-green-800' :
                      t.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>{t.status.replace('_', ' ').toUpperCase()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900 cursor-pointer">
                    <FaEye onClick={() => navigate(`/admin/tickets/${t._id}`)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >Prev</button>
          <span className="text-gray-700">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
}

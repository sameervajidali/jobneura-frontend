// src/pages/admin/TicketListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
import { getAllTickets } from '../../../services/ticketService';

export default function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]   = useState('');
  const [page, setPage]       = useState(1);
  const [limit, setLimit]     = useState(10);
  const [total, setTotal]     = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const { tickets: items, total: count } = await getAllTickets({
          page, limit, search
        });
        setTickets(items);
        setTotal(count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [page, limit, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tickets…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full border rounded pl-10 pr-3 py-2 focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={limit}
            onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
            className="border rounded px-2 py-2"
          >
            {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['#','Subject','User','Status','Created','Actions'].map(col => (
                <th key={col} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading
              ? <tr><td colSpan={6} className="py-10 text-center">Loading…</td></tr>
              : tickets.length === 0
              ? <tr><td colSpan={6} className="py-10 text-center">No tickets found.</td></tr>
              : tickets.map((t,i) => (
                  <tr key={t._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{(page-1)*limit + i + 1}</td>
                    <td className="px-4 py-2">{t.subject}</td>
                    <td className="px-4 py-2">{t.user.name}</td>
                    <td className="px-4 py-2">{t.status}</td>
                    <td className="px-4 py-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => navigate(`/admin/tickets/${t._id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View"
                      ><FaEye /></button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage(p => Math.max(p-1,1))}
            disabled={page===1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(p+1,totalPages))}
            disabled={page===totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
}

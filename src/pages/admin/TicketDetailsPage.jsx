// src/pages/admin/TicketDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicketStatus } from '../../../services/ticketService';

export default function TicketDetailsPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getTicketById(ticketId);
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [ticketId]);

  const handleStatusChange = async e => {
    const newStatus = e.target.value;
    setSaving(true);
    try {
      const updated = await updateTicketStatus(ticketId, newStatus);
      setTicket(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading ticket…</div>;
  }
  if (!ticket) {
    return <div className="p-6 text-center text-red-600">Ticket not found.</div>;
  }

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold">{ticket.subject}</h2>

      <div className="space-y-2">
        <p><strong>User:</strong> {ticket.user.name} ({ticket.user.email})</p>
        <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
        <p><strong>Description:</strong></p>
        <div className="bg-gray-100 p-4 rounded">{ticket.description}</div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="font-medium">Status:</label>
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          disabled={saving}
          className="border rounded px-3 py-2"
        >
          {['open','pending','resolved','closed'].map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >← Back to Tickets</button>
    </div>
  );
}

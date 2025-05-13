import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getTicketById,
  updateTicketStatus,
  addComment
} from '../../services/ticketService';

export default function TicketDetailsPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getTicketById(ticketId);
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [ticketId]);

  const handleStatusChange = async (e) => {
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

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setSaving(true);
    try {
      const updated = await addComment(ticketId, commentText);
      setTicket(updated);
      setCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading ticket…</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-600">Ticket not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {ticket.subject}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            By <strong>{ticket.user.name}</strong> ({ticket.user.email}) •{' '}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-1">Description</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-gray-700 whitespace-pre-line">
                {ticket.description || 'No description provided.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
            <label className="font-medium text-gray-700">Status:</label>
            <select
              value={ticket.status}
              onChange={handleStatusChange}
              disabled={saving}
              className="w-full sm:w-auto border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {['open', 'pending', 'resolved', 'closed'].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comments
            </h2>

            {ticket.comments && ticket.comments.length > 0 ? (
              <ul className="space-y-4 mb-6">
                {ticket.comments.map((c) => (
                  <li key={c._id} className="bg-gray-50 p-4 rounded border">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>{c.by.name}</strong> •{' '}
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                    <p className="text-gray-700 whitespace-pre-line">
                      {c.text}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mb-6">No comments yet.</p>
            )}

            {/* Add Comment */}
            <div className="space-y-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                placeholder="Add your comment..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? 'Submitting…' : 'Submit Comment'}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              &larr; Back to Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
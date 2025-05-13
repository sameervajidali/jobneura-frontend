import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getTicketById,
  updateTicketStatus,
  addComment,
  addReply
} from '../../services/ticketService';

export default function TicketDetailsPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await getTicketById(ticketId);
        const t = resp.ticket || resp;
        setTicket(t);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [ticketId]);

  const handleStatusChange = async (e) => {
    setSaving(true);
    try {
      const resp = await updateTicketStatus(ticketId, e.target.value);
      const updated = resp.ticket || resp;
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
      const resp = await addComment(ticketId, commentText);
      const updated = resp.ticket || resp;
      setTicket(updated);
      setCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyText.trim()) return;
    setSaving(true);
    try {
      const resp = await addReply(ticketId, parentId, replyText);
      const updated = resp.ticket || resp;
      setTicket(updated);
      setReplyingTo(null);
      setReplyText('');
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
            <h2 className="text-lg font-medium text-gray-700 mb-1">Message</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-gray-700 whitespace-pre-line">
                {ticket.message || 'No message provided.'}
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
              {['open', 'in_progress', 'closed'].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}
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
              <ul className="space-y-6 mb-6">
                {ticket.comments.map((c) => (
                  <li key={c._id} className="bg-gray-50 p-4 rounded border">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>{c.by.name}</strong> •{' '}
                      {c.at ? new Date(c.at).toLocaleString() : 'Unknown date'}
                    </p>
                    <p className="text-gray-700 whitespace-pre-line mb-3">
                      {c.text}
                    </p>

                    {/* Render replies */}
                    {c.replies && c.replies.length > 0 && (
                      <ul className="ml-6 space-y-4 mb-3">
                        {c.replies.map((r) => (
                          <li key={r._id} className="bg-gray-100 p-3 rounded border">
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>{r.by.name}</strong> •{' '}
                              {r.at ? new Date(r.at).toLocaleString() : 'Unknown date'}
                            </p>
                            <p className="text-gray-700 whitespace-pre-line">
                              {r.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Reply form trigger */}
                    <button
                      onClick={() => setReplyingTo(c._id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      Reply
                    </button>

                    {/* Reply textarea */}
                    {replyingTo === c._id && (
                      <div className="mt-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          placeholder="Write a reply..."
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        />
                        <button
                          onClick={() => handleReplySubmit(c._id)}
                          disabled={saving}
                          className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                        >
                          {saving ? 'Submitting…' : 'Submit Reply'}
                        </button>
                      </div>
                    )}
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

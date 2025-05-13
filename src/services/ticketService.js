// src/services/ticketService.js
import API from './axios'; // baseURL is '/api/ticket'

export function getAllTickets(params = {}) {
  // GET /api/ticket/admin/tickets
  return API.get('/ticket/admin/tickets', { params })
            .then(res => res.data);
}

export function getTicketById(ticketId) {
  // GET /api/ticket/admin/tickets/:id
  return API.get(`/ticket/admin/tickets/${ticketId}`)
            .then(res => res.data.ticket || res.data);
}

export function updateTicketStatus(ticketId, status) {
  // PATCH /api/ticket/admin/tickets/:id
  return API.put(`/ticket/admin/tickets/${ticketId}`, { status })
            .then(res => res.data.ticket || res.data);
}

export function addComment(ticketId, text) {
  // POST /api/ticket/admin/tickets/:id/comments
  return API.post(`/ticket/admin/tickets/${ticketId}/comments`, { text })
            .then(res => res.data.ticket || res.data);
}

export function createTicket(payload) {
  // POST /api/ticket/ticket
  return API.post('/ticket/ticket', payload).then(res => res.data.ticket || res.data);
}

// At the top, after your existing imports
export function addReply(ticketId, parentId, text) {
  // Calls your existing PUT /admin/tickets/:id route with both text and parentId
  return API.put(
    `/admin/tickets/${ticketId}`,
    { text, parentId }
  ).then(res => res.data.ticket || res.data);
}

export default {
  getAllTickets,
  addReply,
  getTicketById,
  updateTicketStatus,
  addComment,
  createTicket
};

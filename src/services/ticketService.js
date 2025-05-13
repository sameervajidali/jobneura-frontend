// src/services/ticketService.js
import API from './axios'; // baseURL is '/api/ticket'

export function getAllTickets(params = {}) {
  // GET /api/ticket/admin/tickets
  return API.get('/admin/tickets', { params })
            .then(res => res.data);
}

export function getTicketById(ticketId) {
  // GET /api/ticket/admin/tickets/:id
  return API.get(`/admin/tickets/${ticketId}`)
            .then(res => res.data.ticket || res.data);
}

export function updateTicketStatus(ticketId, status) {
  // PATCH /api/ticket/admin/tickets/:id
  return API.patch(`/admin/tickets/${ticketId}`, { status })
            .then(res => res.data.ticket || res.data);
}

export function addComment(ticketId, text) {
  // POST /api/ticket/admin/tickets/:id/comments
  return API.post(`/admin/tickets/${ticketId}/comments`, { text })
            .then(res => res.data.ticket || res.data);
}

export function createTicket(payload) {
  // POST /api/ticket/ticket
  return API.post('/ticket', payload).then(res => res.data.ticket || res.data);
}

export default {
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  addComment,
  createTicket
};

// // src/services/ticketService.js
// import API from './axios';

// export function getAllTickets(params = {}) {
//   // e.g. GET /admin/tickets?page=1&limit=10&search=foo
//   return API.get('/admin/tickets', { params }).then(res => res.data);
// }

// export function getTicketById(id) {
//   return API.get(`/admin/tickets/${id}`).then(res => res.data.ticket);
// }

// export function updateTicketStatus(id, status) {
//   return API.patch(`/admin/tickets/${id}`, { status }).then(res => res.data.ticket);
// }

// src/services/ticketService.js
import API from './axios';

/**
 * Fetch a paginated list of tickets (admin only)
 * GET /admin/tickets
 * Supports optional query params: page, limit, search, status
 */
export function getAllTickets(params = {}) {
  return API.get('/ticket/admin/tickets', { params }).then(res => res.data);
}

/**
 * Fetch details of a single ticket by ID (admin only)
 * GET /admin/tickets/:ticketId
 */
export function getTicketById(ticketId) {
  return API.get(`/admin/tickets/${ticketId}`).then(res => res.data.ticket || res.data);
}

/**
 * Create a new support ticket (public or authenticated)
 * POST /ticket or /admin/tickets
 * { name, email, subject, description }
 */
export function createTicket(payload) {
  // choose endpoint based on auth context if needed
  return API.post('/ticket', payload).then(res => res.data.ticket || res.data);
}

/**
 * Update the status of an existing ticket (admin only)
 * PATCH /admin/tickets/:ticketId
 * { status }
 */
export function updateTicketStatus(ticketId, status) {
  return API.patch(`/admin/tickets/${ticketId}`, { status }).then(res => res.data.ticket || res.data);
}

/**
 * Export all service functions as default
 */
const ticketService = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
};

export default ticketService;

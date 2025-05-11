// src/services/ticketService.js
import API from './axios';

export function getAllTickets(params = {}) {
  // e.g. GET /admin/tickets?page=1&limit=10&search=foo
  return API.get('/admin/tickets', { params }).then(res => res.data);
}

export function getTicketById(id) {
  return API.get(`/admin/tickets/${id}`).then(res => res.data.ticket);
}

export function updateTicketStatus(id, status) {
  return API.patch(`/admin/tickets/${id}`, { status }).then(res => res.data.ticket);
}

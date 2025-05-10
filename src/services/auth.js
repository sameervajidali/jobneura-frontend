// src/services/auth.js

export function getAccessToken() {
  return localStorage.getItem('accessToken'); // or cookie/sessionStorage
}

export function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

export function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

export function logoutUser() {
  removeAccessToken();
  window.location.href = '/login'; // force logout
}

export async function refreshAccessToken() {
  const res = await fetch('/api/auth/refresh-token', {
    method: 'POST',
    credentials: 'include' // must be enabled on backend
  });

  if (!res.ok) throw new Error('Unable to refresh token');

  const data = await res.json();
  setAccessToken(data.accessToken);
}

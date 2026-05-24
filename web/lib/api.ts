const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('venue_token') : null;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Request failed');
  }
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ access_token: string; user: { id: string; email: string; name: string; role: string } }>(
      '/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }
    ),

  // Bookings
  getBookings: (date?: string) =>
    request<any[]>(`/bookings${date ? `?date=${date}` : ''}`),
  createBooking: (data: object) =>
    request<any>('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateBookingStatus: (id: string, status: string) =>
    request<any>(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Events
  getEvents: () => request<any[]>('/events'),
  createEvent: (data: object) =>
    request<any>('/events', { method: 'POST', body: JSON.stringify(data) }),

  // Guests
  getGuests: () => request<any[]>('/guests'),
  createGuest: (data: object) =>
    request<any>('/guests', { method: 'POST', body: JSON.stringify(data) }),

  // Staff
  getStaff: () => request<any[]>('/staff'),

  // Tables
  getTables: () => request<any[]>('/tables'),
  updateTableStatus: (id: string, status: string) =>
    request<any>(`/tables/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Analytics
  getAnalyticsSummary: () => request<any>('/analytics/summary'),
};

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'seated' | 'completed';
export type EventStatus = 'upcoming' | 'live' | 'sold-out' | 'completed' | 'cancelled';
export type GuestTier = 'vip' | 'regular' | 'blacklist';
export type StaffRole = 'manager' | 'bartender' | 'host' | 'security' | 'dj' | 'promoter';

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  table: string;
  partySize: number;
  time: string;
  date: string;
  status: BookingStatus;
  notes?: string;
  totalSpend?: number;
  eventId?: string;
}

export interface VenueEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  dj: string;
  ticketsSold: number;
  ticketsTotal: number;
  revenue: number;
  status: EventStatus;
  coverCharge: number;
  description: string;
  flyer?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: GuestTier;
  visits: number;
  totalSpend: number;
  lastVisit: string;
  tags: string[];
  notes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  email: string;
  phone: string;
  shiftsThisMonth: number;
  rating: number;
  status: 'active' | 'off-duty' | 'on-leave';
  hiredDate: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  section: 'vip' | 'main' | 'bar' | 'terrace';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  x: number;
  y: number;
}

export const bookings: Booking[] = [
  { id: 'b1', guestName: 'James Whitmore', guestEmail: 'james@example.com', table: 'VIP-01', partySize: 6, time: '21:00', date: '2026-05-24', status: 'confirmed', totalSpend: 1240, notes: 'Birthday celebration, champagne on arrival' },
  { id: 'b2', guestName: 'Sophia Reyes', guestEmail: 'sophia@example.com', table: 'VIP-02', partySize: 4, time: '22:00', date: '2026-05-24', status: 'seated', totalSpend: 890 },
  { id: 'b3', guestName: 'Marcus Chen', guestEmail: 'marcus@example.com', table: 'M-05', partySize: 2, time: '21:30', date: '2026-05-24', status: 'confirmed', totalSpend: 0 },
  { id: 'b4', guestName: 'Ella Fontaine', guestEmail: 'ella@example.com', table: 'M-08', partySize: 8, time: '20:00', date: '2026-05-24', status: 'pending', totalSpend: 0, notes: 'Corporate event, invoice required' },
  { id: 'b5', guestName: 'Liam Torres', guestEmail: 'liam@example.com', table: 'BAR-02', partySize: 3, time: '23:00', date: '2026-05-24', status: 'confirmed', totalSpend: 0 },
  { id: 'b6', guestName: 'Natalia Voss', guestEmail: 'natalia@example.com', table: 'VIP-03', partySize: 10, time: '21:00', date: '2026-05-24', status: 'confirmed', totalSpend: 2100, notes: 'VIP package, bottle service x3' },
  { id: 'b7', guestName: 'Derek Hale', guestEmail: 'derek@example.com', table: 'T-01', partySize: 4, time: '20:30', date: '2026-05-24', status: 'cancelled' },
  { id: 'b8', guestName: 'Priya Nair', guestEmail: 'priya@example.com', table: 'M-03', partySize: 5, time: '22:30', date: '2026-05-24', status: 'completed', totalSpend: 560 },
];

export const events: VenueEvent[] = [
  { id: 'e1', name: 'Neon Nights', date: '2026-05-24', time: '22:00', dj: 'DJ Shadow', ticketsSold: 280, ticketsTotal: 300, revenue: 8400, status: 'live', coverCharge: 30, description: 'Electric night with Shadow spinning techno & house.' },
  { id: 'e2', name: 'Black Velvet Saturdays', date: '2026-05-30', time: '23:00', dj: 'DJ Maya', ticketsSold: 180, ticketsTotal: 300, revenue: 5400, status: 'upcoming', coverCharge: 35, description: 'Premium Saturday experience with themed cocktails.' },
  { id: 'e3', name: 'Bass & Bourbon', date: '2026-06-06', time: '21:00', dj: 'DJ Rex', ticketsSold: 300, ticketsTotal: 300, revenue: 9000, status: 'sold-out', coverCharge: 30, description: 'Sold out deep bass night with southern whiskey pairings.' },
  { id: 'e4', name: 'Sundown Sessions', date: '2026-05-17', time: '19:00', dj: 'DJ Lunar', ticketsSold: 210, ticketsTotal: 250, revenue: 6300, status: 'completed', coverCharge: 25, description: 'Rooftop sunset set with ambient & nu-disco sounds.' },
  { id: 'e5', name: 'Midnight Mirage', date: '2026-06-13', time: '22:30', dj: 'DJ Kira', ticketsSold: 90, ticketsTotal: 300, revenue: 2700, status: 'upcoming', coverCharge: 30, description: 'Desert-themed immersive night with live visuals.' },
];

export const guests: Guest[] = [
  { id: 'g1', name: 'James Whitmore', email: 'james@example.com', phone: '+1 555 0101', tier: 'vip', visits: 24, totalSpend: 18600, lastVisit: '2026-05-24', tags: ['Birthday Club', 'High Roller'], notes: 'Prefers VIP-01, always orders Dom Perignon' },
  { id: 'g2', name: 'Sophia Reyes', email: 'sophia@example.com', phone: '+1 555 0102', tier: 'vip', visits: 18, totalSpend: 12400, lastVisit: '2026-05-24', tags: ['Influencer', 'Media'] },
  { id: 'g3', name: 'Marcus Chen', email: 'marcus@example.com', phone: '+1 555 0103', tier: 'regular', visits: 7, totalSpend: 2100, lastVisit: '2026-05-10', tags: [] },
  { id: 'g4', name: 'Ella Fontaine', email: 'ella@example.com', phone: '+1 555 0104', tier: 'vip', visits: 31, totalSpend: 28900, lastVisit: '2026-05-20', tags: ['Corporate', 'High Roller', 'Birthday Club'] },
  { id: 'g5', name: 'Natalia Voss', email: 'natalia@example.com', phone: '+1 555 0105', tier: 'vip', visits: 12, totalSpend: 9800, lastVisit: '2026-05-24', tags: ['Promoter Network'] },
  { id: 'g6', name: 'Priya Nair', email: 'priya@example.com', phone: '+1 555 0106', tier: 'regular', visits: 4, totalSpend: 980, lastVisit: '2026-05-24', tags: [] },
  { id: 'g7', name: 'Liam Torres', email: 'liam@example.com', phone: '+1 555 0107', tier: 'regular', visits: 9, totalSpend: 3200, lastVisit: '2026-05-18', tags: [] },
  { id: 'g8', name: 'Derek Hale', email: 'derek@example.com', phone: '+1 555 0108', tier: 'blacklist', visits: 3, totalSpend: 400, lastVisit: '2026-04-12', tags: ['Incident'], notes: 'Altercation on 2026-04-12, banned until further notice' },
];

export const staff: StaffMember[] = [
  { id: 's1', name: 'Carlos Rivera', role: 'manager', email: 'carlos@venue.ee', phone: '+1 555 0201', shiftsThisMonth: 18, rating: 4.9, status: 'active', hiredDate: '2022-03-15' },
  { id: 's2', name: 'Aisha Morgan', role: 'host', email: 'aisha@venue.ee', phone: '+1 555 0202', shiftsThisMonth: 14, rating: 4.8, status: 'active', hiredDate: '2023-06-01' },
  { id: 's3', name: 'Tom Briggs', role: 'bartender', email: 'tom@venue.ee', phone: '+1 555 0203', shiftsThisMonth: 16, rating: 4.7, status: 'active', hiredDate: '2023-01-20' },
  { id: 's4', name: 'Yuki Tanaka', role: 'bartender', email: 'yuki@venue.ee', phone: '+1 555 0204', shiftsThisMonth: 12, rating: 4.6, status: 'off-duty', hiredDate: '2024-02-10' },
  { id: 's5', name: 'Rex Johnson', role: 'dj', email: 'rex@venue.ee', phone: '+1 555 0205', shiftsThisMonth: 8, rating: 4.9, status: 'active', hiredDate: '2023-09-05' },
  { id: 's6', name: 'Maya Patel', role: 'dj', email: 'maya@venue.ee', phone: '+1 555 0206', shiftsThisMonth: 6, rating: 4.8, status: 'active', hiredDate: '2024-01-15' },
  { id: 's7', name: 'Bruno Klass', role: 'security', email: 'bruno@venue.ee', phone: '+1 555 0207', shiftsThisMonth: 20, rating: 4.5, status: 'active', hiredDate: '2022-11-01' },
  { id: 's8', name: 'Elena Cruz', role: 'promoter', email: 'elena@venue.ee', phone: '+1 555 0208', shiftsThisMonth: 10, rating: 4.3, status: 'on-leave', hiredDate: '2024-04-20' },
];

export const tables: Table[] = [
  { id: 't1', number: 'VIP-01', capacity: 8, section: 'vip', status: 'occupied', x: 60, y: 60 },
  { id: 't2', number: 'VIP-02', capacity: 6, section: 'vip', status: 'occupied', x: 160, y: 60 },
  { id: 't3', number: 'VIP-03', capacity: 10, section: 'vip', status: 'reserved', x: 260, y: 60 },
  { id: 't4', number: 'VIP-04', capacity: 6, section: 'vip', status: 'available', x: 360, y: 60 },
  { id: 't5', number: 'M-01', capacity: 4, section: 'main', status: 'available', x: 60, y: 180 },
  { id: 't6', number: 'M-02', capacity: 4, section: 'main', status: 'available', x: 150, y: 180 },
  { id: 't7', number: 'M-03', capacity: 4, section: 'main', status: 'occupied', x: 240, y: 180 },
  { id: 't8', number: 'M-04', capacity: 4, section: 'main', status: 'available', x: 330, y: 180 },
  { id: 't9', number: 'M-05', capacity: 2, section: 'main', status: 'reserved', x: 60, y: 260 },
  { id: 't10', number: 'M-06', capacity: 4, section: 'main', status: 'available', x: 150, y: 260 },
  { id: 't11', number: 'M-07', capacity: 4, section: 'main', status: 'occupied', x: 240, y: 260 },
  { id: 't12', number: 'M-08', capacity: 8, section: 'main', status: 'reserved', x: 330, y: 260 },
  { id: 't13', number: 'BAR-01', capacity: 2, section: 'bar', status: 'occupied', x: 60, y: 360 },
  { id: 't14', number: 'BAR-02', capacity: 2, section: 'bar', status: 'reserved', x: 140, y: 360 },
  { id: 't15', number: 'BAR-03', capacity: 2, section: 'bar', status: 'available', x: 220, y: 360 },
  { id: 't16', number: 'T-01', capacity: 4, section: 'terrace', status: 'available', x: 60, y: 460 },
  { id: 't17', number: 'T-02', capacity: 4, section: 'terrace', status: 'available', x: 150, y: 460 },
  { id: 't18', number: 'T-03', capacity: 6, section: 'terrace', status: 'maintenance', x: 240, y: 460 },
];

export const revenueData = [
  { day: 'Mon', revenue: 4200, covers: 82 },
  { day: 'Tue', revenue: 3800, covers: 74 },
  { day: 'Wed', revenue: 5100, covers: 98 },
  { day: 'Thu', revenue: 6400, covers: 120 },
  { day: 'Fri', revenue: 9800, covers: 198 },
  { day: 'Sat', revenue: 12400, covers: 240 },
  { day: 'Sun', revenue: 7200, covers: 145 },
];

export const stats = {
  todayBookings: bookings.filter(b => b.date === '2026-05-24' && b.status !== 'cancelled').length,
  tonightCapacity: Math.round((tables.filter(t => t.status === 'occupied' || t.status === 'reserved').length / tables.length) * 100),
  todayRevenue: bookings.filter(b => b.date === '2026-05-24').reduce((sum, b) => sum + (b.totalSpend || 0), 0),
  activeEvent: events.find(e => e.status === 'live'),
  weekRevenue: revenueData.reduce((sum, d) => sum + d.revenue, 0),
};

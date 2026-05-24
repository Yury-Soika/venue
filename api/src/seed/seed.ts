import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User } from '../users/user.entity';
import { Booking } from '../bookings/booking.entity';
import { VenueEvent } from '../events/event.entity';
import { Guest } from '../guests/guest.entity';
import { StaffMember } from '../staff/staff.entity';
import { Table } from '../tables/table.entity';

dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL ?? 'postgres://postgres@localhost:5432/venue',
  entities: [User, Booking, VenueEvent, Guest, StaffMember, Table],
  synchronize: true,
});

async function seed() {
  await ds.initialize();
  console.log('🌱 Seeding database...');

  const userRepo = ds.getRepository(User);
  const bookingRepo = ds.getRepository(Booking);
  const eventRepo = ds.getRepository(VenueEvent);
  const guestRepo = ds.getRepository(Guest);
  const staffRepo = ds.getRepository(StaffMember);
  const tableRepo = ds.getRepository(Table);

  // Clear existing
  await bookingRepo.delete({});
  await eventRepo.delete({});
  await guestRepo.delete({});
  await staffRepo.delete({});
  await tableRepo.delete({});
  await userRepo.delete({});

  // Users
  const hash = await bcrypt.hash('demo1234', 10);
  await userRepo.save([
    { email: 'manager@venue.ee', password: hash, name: 'Carlos Rivera', role: 'manager' as const },
    { email: 'owner@venue.ee', password: hash, name: 'Alex Stone', role: 'owner' as const },
  ]);

  // Tables
  await tableRepo.save([
    { number: 'VIP-01', capacity: 8, section: 'vip' as const, status: 'occupied' as const },
    { number: 'VIP-02', capacity: 6, section: 'vip' as const, status: 'occupied' as const },
    { number: 'VIP-03', capacity: 10, section: 'vip' as const, status: 'reserved' as const },
    { number: 'VIP-04', capacity: 6, section: 'vip' as const, status: 'available' as const },
    { number: 'M-01', capacity: 4, section: 'main' as const, status: 'available' as const },
    { number: 'M-02', capacity: 4, section: 'main' as const, status: 'available' as const },
    { number: 'M-03', capacity: 4, section: 'main' as const, status: 'occupied' as const },
    { number: 'M-04', capacity: 4, section: 'main' as const, status: 'available' as const },
    { number: 'M-05', capacity: 2, section: 'main' as const, status: 'reserved' as const },
    { number: 'M-06', capacity: 4, section: 'main' as const, status: 'available' as const },
    { number: 'M-07', capacity: 4, section: 'main' as const, status: 'occupied' as const },
    { number: 'M-08', capacity: 8, section: 'main' as const, status: 'reserved' as const },
    { number: 'BAR-01', capacity: 2, section: 'bar' as const, status: 'occupied' as const },
    { number: 'BAR-02', capacity: 2, section: 'bar' as const, status: 'reserved' as const },
    { number: 'BAR-03', capacity: 2, section: 'bar' as const, status: 'available' as const },
    { number: 'T-01', capacity: 4, section: 'terrace' as const, status: 'available' as const },
    { number: 'T-02', capacity: 4, section: 'terrace' as const, status: 'available' as const },
    { number: 'T-03', capacity: 6, section: 'terrace' as const, status: 'maintenance' as const },
  ]);

  // Guests
  await guestRepo.save([
    { name: 'James Whitmore', email: 'james@example.com', phone: '+1 555 0101', tier: 'vip' as const, visits: 24, totalSpend: 18600, lastVisit: '2026-05-24', tags: ['Birthday Club', 'High Roller'], notes: 'Prefers VIP-01, orders Dom Perignon' },
    { name: 'Sophia Reyes', email: 'sophia@example.com', phone: '+1 555 0102', tier: 'vip' as const, visits: 18, totalSpend: 12400, lastVisit: '2026-05-24', tags: ['Influencer', 'Media'] },
    { name: 'Marcus Chen', email: 'marcus@example.com', phone: '+1 555 0103', tier: 'regular' as const, visits: 7, totalSpend: 2100, lastVisit: '2026-05-10', tags: [] },
    { name: 'Ella Fontaine', email: 'ella@example.com', phone: '+1 555 0104', tier: 'vip' as const, visits: 31, totalSpend: 28900, lastVisit: '2026-05-20', tags: ['Corporate', 'High Roller'] },
    { name: 'Natalia Voss', email: 'natalia@example.com', phone: '+1 555 0105', tier: 'vip' as const, visits: 12, totalSpend: 9800, lastVisit: '2026-05-24', tags: ['Promoter Network'] },
    { name: 'Priya Nair', email: 'priya@example.com', phone: '+1 555 0106', tier: 'regular' as const, visits: 4, totalSpend: 980, lastVisit: '2026-05-24', tags: [] },
    { name: 'Liam Torres', email: 'liam@example.com', phone: '+1 555 0107', tier: 'regular' as const, visits: 9, totalSpend: 3200, lastVisit: '2026-05-18', tags: [] },
    { name: 'Derek Hale', email: 'derek@example.com', phone: '+1 555 0108', tier: 'blacklist' as const, visits: 3, totalSpend: 400, lastVisit: '2026-04-12', tags: ['Incident'], notes: 'Altercation 2026-04-12, banned' },
  ]);

  // Events
  await eventRepo.save([
    { name: 'Neon Nights', date: '2026-05-24', time: '22:00', dj: 'DJ Shadow', ticketsSold: 280, ticketsTotal: 300, revenue: 8400, status: 'live' as const, coverCharge: 30, description: 'Electric night with Shadow spinning techno & house.' },
    { name: 'Black Velvet Saturdays', date: '2026-05-30', time: '23:00', dj: 'DJ Maya', ticketsSold: 180, ticketsTotal: 300, revenue: 5400, status: 'upcoming' as const, coverCharge: 35, description: 'Premium Saturday experience with themed cocktails.' },
    { name: 'Bass & Bourbon', date: '2026-06-06', time: '21:00', dj: 'DJ Rex', ticketsSold: 300, ticketsTotal: 300, revenue: 9000, status: 'sold-out' as const, coverCharge: 30, description: 'Sold out deep bass night.' },
    { name: 'Sundown Sessions', date: '2026-05-17', time: '19:00', dj: 'DJ Lunar', ticketsSold: 210, ticketsTotal: 250, revenue: 6300, status: 'completed' as const, coverCharge: 25, description: 'Rooftop sunset set with ambient sounds.' },
    { name: 'Midnight Mirage', date: '2026-06-13', time: '22:30', dj: 'DJ Kira', ticketsSold: 90, ticketsTotal: 300, revenue: 2700, status: 'upcoming' as const, coverCharge: 30, description: 'Desert-themed immersive night.' },
  ]);

  // Bookings
  await bookingRepo.save([
    { guestName: 'James Whitmore', guestEmail: 'james@example.com', table: 'VIP-01', partySize: 6, time: '21:00', date: '2026-05-24', status: 'confirmed' as const, totalSpend: 1240, notes: 'Birthday, champagne on arrival' },
    { guestName: 'Sophia Reyes', guestEmail: 'sophia@example.com', table: 'VIP-02', partySize: 4, time: '22:00', date: '2026-05-24', status: 'seated' as const, totalSpend: 890 },
    { guestName: 'Marcus Chen', guestEmail: 'marcus@example.com', table: 'M-05', partySize: 2, time: '21:30', date: '2026-05-24', status: 'confirmed' as const },
    { guestName: 'Ella Fontaine', guestEmail: 'ella@example.com', table: 'M-08', partySize: 8, time: '20:00', date: '2026-05-24', status: 'pending' as const, notes: 'Corporate, invoice required' },
    { guestName: 'Liam Torres', guestEmail: 'liam@example.com', table: 'BAR-02', partySize: 3, time: '23:00', date: '2026-05-24', status: 'confirmed' as const },
    { guestName: 'Natalia Voss', guestEmail: 'natalia@example.com', table: 'VIP-03', partySize: 10, time: '21:00', date: '2026-05-24', status: 'confirmed' as const, totalSpend: 2100, notes: 'Bottle service x3' },
    { guestName: 'Priya Nair', guestEmail: 'priya@example.com', table: 'M-03', partySize: 5, time: '22:30', date: '2026-05-24', status: 'completed' as const, totalSpend: 560 },
  ]);

  // Staff
  await staffRepo.save([
    { name: 'Carlos Rivera', role: 'manager' as const, email: 'carlos@venue.ee', phone: '+1 555 0201', shiftsThisMonth: 18, rating: 4.9, status: 'active' as const, hiredDate: '2022-03-15' },
    { name: 'Aisha Morgan', role: 'host' as const, email: 'aisha@venue.ee', phone: '+1 555 0202', shiftsThisMonth: 14, rating: 4.8, status: 'active' as const, hiredDate: '2023-06-01' },
    { name: 'Tom Briggs', role: 'bartender' as const, email: 'tom@venue.ee', phone: '+1 555 0203', shiftsThisMonth: 16, rating: 4.7, status: 'active' as const, hiredDate: '2023-01-20' },
    { name: 'Yuki Tanaka', role: 'bartender' as const, email: 'yuki@venue.ee', phone: '+1 555 0204', shiftsThisMonth: 12, rating: 4.6, status: 'off-duty' as const, hiredDate: '2024-02-10' },
    { name: 'Rex Johnson', role: 'dj' as const, email: 'rex@venue.ee', phone: '+1 555 0205', shiftsThisMonth: 8, rating: 4.9, status: 'active' as const, hiredDate: '2023-09-05' },
    { name: 'Bruno Klass', role: 'security' as const, email: 'bruno@venue.ee', phone: '+1 555 0207', shiftsThisMonth: 20, rating: 4.5, status: 'active' as const, hiredDate: '2022-11-01' },
    { name: 'Elena Cruz', role: 'promoter' as const, email: 'elena@venue.ee', phone: '+1 555 0208', shiftsThisMonth: 10, rating: 4.3, status: 'on-leave' as const, hiredDate: '2024-04-20' },
  ]);

  console.log('✅ Seed complete');
  await ds.destroy();
}

seed().catch(err => { console.error(err); process.exit(1); });

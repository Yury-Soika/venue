import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { VenueEvent } from '../events/event.entity';
import { Guest } from '../guests/guest.entity';
import { Table } from '../tables/table.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(VenueEvent) private eventRepo: Repository<VenueEvent>,
    @InjectRepository(Guest) private guestRepo: Repository<Guest>,
    @InjectRepository(Table) private tableRepo: Repository<Table>,
  ) {}

  async getSummary() {
    const [bookings, events, guests, tables] = await Promise.all([
      this.bookingRepo.find(),
      this.eventRepo.find(),
      this.guestRepo.find(),
      this.tableRepo.find(),
    ]);

    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.date === today && b.status !== 'cancelled');
    const todayRevenue = todayBookings.reduce((sum, b) => sum + Number(b.totalSpend), 0);
    const occupied = tables.filter(t => t.status === 'occupied' || t.status === 'reserved').length;
    const liveEvent = events.find(e => e.status === 'live');
    const topGuests = [...guests].sort((a, b) => Number(b.totalSpend) - Number(a.totalSpend)).slice(0, 5);

    return {
      todayBookings: todayBookings.length,
      todayRevenue,
      capacityPct: tables.length ? Math.round((occupied / tables.length) * 100) : 0,
      totalTables: tables.length,
      occupiedTables: occupied,
      liveEvent,
      totalGuests: guests.length,
      totalEvents: events.length,
      topGuests,
    };
  }
}

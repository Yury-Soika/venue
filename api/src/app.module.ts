import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { GuestsModule } from './guests/guests.module';
import { StaffModule } from './staff/staff.module';
import { TablesModule } from './tables/tables.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { User } from './users/user.entity';
import { Booking } from './bookings/booking.entity';
import { VenueEvent } from './events/event.entity';
import { Guest } from './guests/guest.entity';
import { StaffMember } from './staff/staff.entity';
import { Table } from './tables/table.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'venue_user',
      password: process.env.DB_PASS ?? 'venue_pass',
      database: process.env.DB_NAME ?? 'venue',
      entities: [User, Booking, VenueEvent, Guest, StaffMember, Table],
      synchronize: true,
    }),
    AuthModule,
    BookingsModule,
    EventsModule,
    GuestsModule,
    StaffModule,
    TablesModule,
    AnalyticsModule,
  ],
})
export class AppModule {}

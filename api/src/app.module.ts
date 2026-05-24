import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { GuestsModule } from './guests/guests.module';
import { StaffModule } from './staff/staff.module';
import { TablesModule } from './tables/tables.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    DbModule,
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

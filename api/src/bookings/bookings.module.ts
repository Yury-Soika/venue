import { Module } from '@nestjs/common';
import { CaslModule } from '../casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [CaslModule, TypeOrmModule.forFeature([Booking])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}

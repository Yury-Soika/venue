import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEvent } from './event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VenueEvent])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}

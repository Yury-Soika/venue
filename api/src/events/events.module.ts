import { Module } from '@nestjs/common';
import { CaslModule } from '../casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEvent } from './event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [CaslModule, TypeOrmModule.forFeature([VenueEvent])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}

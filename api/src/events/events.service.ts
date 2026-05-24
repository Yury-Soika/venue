import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenueEvent } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(VenueEvent) private repo: Repository<VenueEvent>) {}

  findAll() { return this.repo.find({ order: { date: 'ASC' } }); }

  async findOne(id: string) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Event not found');
    return e;
  }

  create(dto: CreateEventDto) { return this.repo.save(this.repo.create(dto)); }

  async updateStatus(id: string, status: VenueEvent['status']) {
    await this.findOne(id);
    await this.repo.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Event deleted' };
  }
}

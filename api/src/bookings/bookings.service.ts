import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectRepository(Booking) private repo: Repository<Booking>) {}

  findAll() { return this.repo.find({ order: { date: 'DESC', time: 'ASC' } }); }

  findByDate(date: string) { return this.repo.find({ where: { date }, order: { time: 'ASC' } }); }

  async findOne(id: string) {
    const b = await this.repo.findOne({ where: { id } });
    if (!b) throw new NotFoundException('Booking not found');
    return b;
  }

  create(dto: CreateBookingDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async updateStatus(id: string, status: Booking['status']) {
    await this.findOne(id);
    await this.repo.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Booking deleted' };
  }
}

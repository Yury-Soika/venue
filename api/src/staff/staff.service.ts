import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffMember } from './staff.entity';

@Injectable()
export class StaffService {
  constructor(@InjectRepository(StaffMember) private repo: Repository<StaffMember>) {}

  findAll() { return this.repo.find({ order: { name: 'ASC' } }); }

  async findOne(id: string) {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Staff member not found');
    return s;
  }

  async updateStatus(id: string, status: StaffMember['status']) {
    await this.findOne(id);
    await this.repo.update(id, { status });
    return this.findOne(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';

@Injectable()
export class TablesService {
  constructor(@InjectRepository(Table) private repo: Repository<Table>) {}

  findAll() { return this.repo.find({ order: { section: 'ASC', number: 'ASC' } }); }

  async findOne(id: string) {
    const t = await this.repo.findOne({ where: { id } });
    if (!t) throw new NotFoundException('Table not found');
    return t;
  }

  async updateStatus(id: string, status: Table['status']) {
    await this.findOne(id);
    await this.repo.update(id, { status });
    return this.findOne(id);
  }
}

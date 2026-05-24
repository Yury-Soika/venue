import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';

@Injectable()
export class GuestsService {
  constructor(@InjectRepository(Guest) private repo: Repository<Guest>) {}

  findAll() { return this.repo.find({ order: { totalSpend: 'DESC' } }); }

  async findOne(id: string) {
    const g = await this.repo.findOne({ where: { id } });
    if (!g) throw new NotFoundException('Guest not found');
    return g;
  }

  async create(dto: CreateGuestDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Guest with this email already exists');
    const tier = (dto.tier ?? 'regular') as Guest['tier'];
    return this.repo.save(this.repo.create({ ...dto, tier, tags: [] }));
  }

  async updateTier(id: string, tier: Guest['tier']) {
    await this.findOne(id);
    await this.repo.update(id, { tier });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Guest removed' };
  }
}

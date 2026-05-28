import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';

@ApiTags('guests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('guests')
export class GuestsController {
  constructor(private service: GuestsService) {}

  @Get()
  @CheckPolicies(a => a.can('read', 'Guest'))
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @CheckPolicies(a => a.can('read', 'Guest'))
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @CheckPolicies(a => a.can('create', 'Guest'))
  create(@Body() dto: CreateGuestDto) { return this.service.create(dto); }

  @Patch(':id/tier')
  @CheckPolicies(a => a.can('update', 'Guest'))
  updateTier(@Param('id') id: string, @Body('tier') tier: string) {
    return this.service.updateTier(id, tier as any);
  }

  @Delete(':id')
  @CheckPolicies(a => a.can('delete', 'Guest'))
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

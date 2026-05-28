import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';

@ApiTags('events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('events')
export class EventsController {
  constructor(private service: EventsService) {}

  @Get()
  @CheckPolicies(a => a.can('read', 'Event'))
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @CheckPolicies(a => a.can('read', 'Event'))
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @CheckPolicies(a => a.can('create', 'Event'))
  create(@Body() dto: CreateEventDto) { return this.service.create(dto); }

  @Patch(':id/status')
  @CheckPolicies(a => a.can('update', 'Event'))
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status as any);
  }

  @Delete(':id')
  @CheckPolicies(a => a.can('delete', 'Event'))
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

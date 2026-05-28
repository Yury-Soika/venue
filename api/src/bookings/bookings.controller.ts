import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private service: BookingsService) {}

  @Get()
  @ApiQuery({ name: 'date', required: false })
  @CheckPolicies(a => a.can('read', 'Booking'))
  findAll(@Query('date') date?: string) {
    return date ? this.service.findByDate(date) : this.service.findAll();
  }

  @Get(':id')
  @CheckPolicies(a => a.can('read', 'Booking'))
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @CheckPolicies(a => a.can('create', 'Booking'))
  create(@Body() dto: CreateBookingDto) { return this.service.create(dto); }

  @Patch(':id/status')
  @CheckPolicies(a => a.can('update', 'Booking'))
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status as any);
  }

  @Delete(':id')
  @CheckPolicies(a => a.can('delete', 'Booking'))
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

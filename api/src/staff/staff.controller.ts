import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';

@ApiTags('staff')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('staff')
export class StaffController {
  constructor(private service: StaffService) {}

  @Get()
  @CheckPolicies(a => a.can('read', 'Staff'))
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @CheckPolicies(a => a.can('read', 'Staff'))
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id/status')
  @CheckPolicies(a => a.can('update', 'Staff'))
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status as any);
  }
}
